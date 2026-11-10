import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("projects filter, paginate, and open accessible previews", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("VIDEO EDITOR");
  await page.getByRole("button", { name: "Next projects" }).click();
  await expect(page.getByRole("heading", { name: "A different perspective" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Next projects" })).toBeDisabled();
  await page.getByRole("button", { name: "Previous projects" }).click();
  await expect(page.getByRole("heading", { name: "The business of ambition" })).toBeVisible();
  await page.getByRole("button", { name: "Short-form", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await page.getByRole("button", { name: "Documentary", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await page.getByRole("button", { name: "All work" }).click();
  const preview = page.getByRole("button", { name: "Preview The business of ambition" });
  await preview.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByText("Sample concept. Not client work.")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(preview).toBeFocused();
  await page.getByRole("button", { name: /View showreel/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close preview" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("monthly package selection carries into a downloadable brief", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Pricing" })
    .click();
  await expect(page).toHaveURL(/\/pricing$/);
  for (const [index, amount] of ["150", "400", "850"].entries()) {
    await expect(page.locator(".price-amount").nth(index)).toContainText(`ETB ${amount}`);
  }
  await expect(page.locator(".page-intro")).toContainText("SAMPLE ETB RATES");
  await page.getByRole("button", { name: "Monthly", exact: true }).click();
  for (const [index, amount] of ["500", "1,400", "2,400"].entries()) {
    await expect(page.locator(".price-amount").nth(index)).toContainText(`ETB ${amount}`);
  }
  await expect(page.getByText("Four videos, up to 15 min")).toBeVisible();
  await page.getByRole("link", { name: "Choose The Story" }).click();
  await expect(page).toHaveURL(/\/contact\?package=The%20Story&billing=monthly/);
  await expect(page.locator(".selected-package")).toContainText("The Story");
  await expect(page.getByRole("combobox", { name: "Project type" })).toHaveValue(
    "Long-form / YouTube video",
  );
  await page.getByRole("textbox", { name: "Your name" }).fill("Test Creator");
  await page.getByRole("textbox", { name: "Email", exact: false }).fill("creator@example.com");
  await page.getByRole("textbox", { name: "Your idea" }).fill("A story about creative craft.");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "CREATE PROJECT BRIEF" }).click();
  const download = await downloadPromise;
  const body = await readFile((await download.path())!, "utf8");
  expect(download.suggestedFilename()).toBe("project-brief.txt");
  expect(body).toContain("Test Creator");
  expect(body).toContain("The Story (monthly)");
  expect(body).toContain("ETB 1400");
  expect(body).toContain("not a confirmed quote");
  expect(body).toContain("A story about creative craft.");
  await expect(page.getByRole("status")).toContainText("Downloaded. Not sent.");
  await page.getByRole("button", { name: "New brief", exact: true }).click();
  await expect(page.getByRole("textbox", { name: "Your name" })).toBeEmpty();
  await page.getByRole("button", { name: "Remove selected package" }).click();
  await expect(page.locator(".selected-package")).toHaveCount(0);
  await expect(page.getByRole("combobox")).toHaveValue("");
});

test("contact validates required fields without pretending to send", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "CREATE PROJECT BRIEF" }).click();
  await expect(page.getByRole("textbox", { name: "Your name" })).toBeFocused();
  await page.getByRole("textbox", { name: "Your name" }).fill("   ");
  expect(
    await page
      .getByRole("textbox", { name: "Your name" })
      .evaluate((input: HTMLInputElement) => input.checkValidity()),
  ).toBe(false);
  await page.getByRole("textbox", { name: "Your idea" }).fill("   ");
  expect(
    await page
      .getByRole("textbox", { name: "Your idea" })
      .evaluate((input: HTMLTextAreaElement) => input.checkValidity()),
  ).toBe(false);
  await expect(page.getByText("Preview mode. Nothing sent or stored.")).toBeVisible();
});

test("skill tabs update the panel and timeline", async ({ page }) => {
  await page.goto("/skills");
  await expect(page.getByRole("heading", { name: "Find the thread." })).toBeVisible();
  for (const [title, heading, track] of [
    ["Color", "Set the feeling.", "color"],
    ["Sound", "Make it immersive.", "sound"],
    ["Motion", "Guide the eye.", "motion"],
    ["Story", "Find the thread.", "story"],
  ]) {
    await page.getByRole("button", { name: new RegExp(title) }).click();
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    await expect(page.locator(`.track-${track}`)).toHaveClass(/is-active/);
    await expect(page.getByRole("button", { name: new RegExp(title) })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  }
});

test("FAQ accordion and sample testimonials work", async ({ page }) => {
  await page.goto("/faq");
  const question = page.getByRole("button", { name: /Are these the final rates/ });
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("region")).toContainText("sample ETB rates");
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "false");
  await page.goto("/#credibility");
  await expect(page.getByText("Alex Morgan", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Next testimonial" }).click();
  await expect(page.getByText("Jordan Ellis", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Previous testimonial" }).click();
  await expect(page.getByText("Alex Morgan", { exact: true })).toBeVisible();
  await expect(page.getByText("Fictional names & quotes · Template only.")).toBeVisible();
});

test("specialties flow left, pause, and resume", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".marquee-track")).toBeVisible();
  const x = () =>
    page
      .locator(".marquee-track")
      .evaluate((element) => new DOMMatrix(getComputedStyle(element).transform).m41);
  const first = await x();
  await expect.poll(x).toBeLessThan(first - 2);
  await page.getByRole("button", { name: "Pause specialties animation" }).click();
  await page.mouse.move(10, 10);
  await expect(page.locator(".marquee-track")).toHaveCSS("animation-play-state", "paused");
  const paused = await x();
  await page.waitForTimeout(180);
  expect(await x()).toBeCloseTo(paused, 1);
  await page.getByRole("button", { name: "Play specialties animation" }).click();
  await page.mouse.move(10, 10);
  await expect.poll(x).toBeLessThan(paused - 2);
});

test("anchor navigation, scroll progress, and card hover respond", async ({ page }) => {
  await page.goto("/pricing");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "About" })
    .click();
  await expect(page).toHaveURL(/\/#about$/);
  await expect
    .poll(() =>
      page.locator("#about").evaluate((element) => Math.round(element.getBoundingClientRect().top)),
    )
    .toBeLessThan(180);
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "About" }),
  ).toHaveAttribute("aria-current", "location");
  const card = page.locator(".service-card").first();
  await card.scrollIntoViewIfNeeded();
  await expect(card).toBeVisible();
  await card.hover();
  await expect
    .poll(() => card.evaluate((element) => new DOMMatrix(getComputedStyle(element).transform).m42))
    .toBeLessThan(-4);
  const progress = await page
    .locator(".scroll-progress")
    .evaluate((element) => new DOMMatrix(getComputedStyle(element).transform).m11);
  expect(progress).toBeGreaterThan(0);
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Home", exact: true })
    .click();
  await expect.poll(() => page.evaluate(() => Math.round(scrollY))).toBe(0);
});

test("mobile navigation and all page layouts remain usable", async ({ page }) => {
  test.setTimeout(120000);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  const mobile = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(mobile).toBeVisible();
  await mobile.getByRole("link", { name: "Pricing" }).click();
  await expect(page).toHaveURL(/\/pricing$/);
  await expect(mobile).toHaveCount(0);
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeFocused();
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/pricing", "/skills", "/contact", "/faq"]) {
      await page.goto(route);
      await expect(page.locator("main")).toBeVisible();
      await expect
        .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
        .toBe(true);
      if (route === "/")
        await expect(page.locator(".portrait-crop img")).toHaveAttribute("alt", "Amir Dedefo");
    }
  }
});

test("reduced motion is respected and unknown routes recover", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".marquee-track")).toHaveCSS("animation-name", "none");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Pricing" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("CLEAR PACKAGES.");
  await page.goto("/missing-frame");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("BACK ON TRACK.");
  await page.getByRole("link", { name: "BACK HOME" }).click();
  await expect(page).toHaveURL("/");
});
