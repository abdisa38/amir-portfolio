import { useRef, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router";
import { ArrowUpRight, Check, Download, FileText, Send, X } from "lucide-react";
import { motion } from "motion/react";
import { portfolio } from "../content/portfolio";
import { currencyCode, pricing } from "../content/experience";

export default function ContactForm() {
  const [params, setParams] = useSearchParams();
  const [created, setCreated] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const billing = params.get("billing") === "monthly" ? "monthly" : "project";
  const selected = pricing[billing].find((plan) => plan.name === params.get("package"));
  const configured = Boolean(portfolio.email);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `PROJECT BRIEF\n\nName: ${String(data.get("name")).trim()}\nEmail: ${String(data.get("email")).trim()}\nProject type: ${data.get("service")}\n${selected ? `Package: ${selected.name} (${billing})\nSample starting rate: ${currencyCode} ${selected.price} ${selected.unit} — not a confirmed quote\n` : ""}\nBrief:\n${String(data.get("message")).trim()}\n`;
    if (configured) {
      window.location.href = `mailto:${portfolio.email}?subject=${encodeURIComponent(`Project inquiry${selected ? `: ${selected.name}` : ""}`)}&body=${encodeURIComponent(body)}`;
    } else {
      const url = URL.createObjectURL(new Blob([body], { type: "text/plain;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "project-brief.txt";
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    setCreated(true);
  }

  return (
    <form ref={form} className="contact-form" onSubmit={submit} onChange={() => setCreated(false)}>
      {selected && (
        <div className="selected-package">
          <FileText size={18} />
          <div>
            <span>
              {selected.name} · {billing === "monthly" ? "Monthly" : "Per project"}
            </span>
            <small>Sample package · Final quote by discussion</small>
          </div>
          <button
            type="button"
            className="icon-button"
            aria-label="Remove selected package"
            onClick={() => {
              setParams({});
              setCreated(false);
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}
      <div className="form-row">
        <label>
          Your name <span>*</span>
          <input
            name="name"
            placeholder="Your name"
            autoComplete="name"
            required
            maxLength={120}
            pattern={".*\\S.*"}
          />
        </label>
        <label>
          Email <span>*</span>
          <input
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label>
        Project type <span>*</span>
        <select
          name="service"
          key={selected?.name || "custom"}
          defaultValue={selected?.service || ""}
          required
        >
          <option value="" disabled>
            Select a format
          </option>
          {[
            "Long-form / YouTube video",
            "Short-form / Reels & Shorts",
            "Documentary / Interview",
            "Color, sound & motion",
            "Something else",
          ].map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label>
        Your idea <span>*</span>
        <textarea
          name="message"
          placeholder="The idea. The audience. The timeline."
          rows={4}
          required
          maxLength={5000}
          onChange={(event) =>
            event.currentTarget.setCustomValidity(
              event.currentTarget.value.trim() ? "" : "Add a short idea.",
            )
          }
        />
      </label>
      <div className="form-bottom">
        <p>{configured ? "Opens your email app." : "Preview mode. Nothing sent or stored."}</p>
        <motion.button whileTap={{ scale: 0.97 }} className="button button-primary" type="submit">
          {created ? <Check size={17} /> : configured ? <Send size={16} /> : <Download size={16} />}
          {created
            ? configured
              ? "DRAFT OPENED"
              : "BRIEF DOWNLOADED"
            : configured
              ? "OPEN EMAIL DRAFT"
              : "CREATE PROJECT BRIEF"}
          {!created && <ArrowUpRight size={17} />}
        </motion.button>
      </div>
      <div className="form-status" role="status">
        {created && (
          <>
            <Check size={14} />
            <span>{configured ? "Draft ready. Review and send." : "Downloaded. Not sent."}</span>
            <button
              type="button"
              onClick={() => {
                form.current?.reset();
                setCreated(false);
              }}
            >
              New brief
            </button>
          </>
        )}
      </div>
      {!selected && (
        <Link to="/pricing" className="form-package-link">
          Need a starting point? View packages <ArrowUpRight size={13} />
        </Link>
      )}
    </form>
  );
}
