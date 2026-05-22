"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeUp, slideInRight } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { ContactFormData } from "@/types";

type FormStatus = "idle" | "submitting" | "success" | "error";

const linkItemClass =
  "group flex items-center gap-4 p-4 border border-[var(--border)] rounded-sm hover:border-purple/40 transition-colors";
const iconBoxClass =
  "w-10 h-10 rounded-sm bg-elevated flex items-center justify-center group-hover:bg-purple/10 transition-colors flex-shrink-0";
const iconClass = "text-[var(--text-muted)] group-hover:text-purple transition-colors";

function ContactLinks() {
  return (
    <motion.div variants={staggerContainer} className="space-y-4">
      <motion.a href="mailto:hello@alex.dev" variants={fadeUp} className={linkItemClass}>
        <div className={iconBoxClass}><Mail size={16} className={iconClass} /></div>
        <div>
          <p className="font-mono text-[13px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Email</p>
          <p className="font-mono text-sm text-warm group-hover:text-purple transition-colors">hello@alex.dev</p>
        </div>
      </motion.a>

      <motion.a href="https://github.com" target="_blank" rel="noopener noreferrer" variants={fadeUp} className={linkItemClass}>
        <div className={iconBoxClass}><GithubIcon width={16} height={16} className={iconClass} /></div>
        <div>
          <p className="font-mono text-[13px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">GitHub</p>
          <p className="font-mono text-sm text-warm group-hover:text-purple transition-colors">github.com/alexchen</p>
        </div>
      </motion.a>

      <motion.a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" variants={fadeUp} className={linkItemClass}>
        <div className={iconBoxClass}><LinkedinIcon width={16} height={16} className={iconClass} /></div>
        <div>
          <p className="font-mono text-[13px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">LinkedIn</p>
          <p className="font-mono text-sm text-warm group-hover:text-purple transition-colors">linkedin.com/in/alexchen</p>
        </div>
      </motion.a>
    </motion.div>
  );
}

export function Contact() {
  const { ref: leftRef,  isInView: leftInView  } = useScrollReveal();
  const { ref: rightRef, isInView: rightInView } = useScrollReveal();

  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    _honeypot: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form._honeypot) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputClass = cn(
    "w-full bg-elevated border border-[var(--border)] rounded-sm px-4 py-3",
    "font-mono text-sm text-warm placeholder-[var(--text-dim)]",
    "focus:outline-none focus:border-purple/50 transition-colors"
  );

  return (
    <section id="contact" className="section-pad bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — info */}
          <motion.div
            ref={leftRef}
            variants={staggerContainer}
            initial="hidden"
            animate={leftInView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel index="07" label="Contact" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl lg:text-5xl font-bold text-warm mb-6"
            >
              Start a{" "}
              <span className="text-purple">conversation</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="font-mono text-sm text-[var(--text-muted)] leading-relaxed mb-10"
            >
              Whether you have a project in mind, need a second opinion on an
              architecture, or just want to talk shop — I respond within 24 hours.
            </motion.p>

            <ContactLinks />
          </motion.div>

          {/* Right — form */}
          <motion.div
            ref={rightRef}
            variants={slideInRight}
            initial="hidden"
            animate={rightInView ? "visible" : "hidden"}
          >
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 text-center p-12 border border-teal/20 rounded-sm bg-teal/5">
                <span className="text-4xl">✓</span>
                <h3 className="font-display text-2xl font-bold text-teal">Message sent</h3>
                <p className="font-mono text-sm text-[var(--text-muted)]">
                  I&apos;ll get back to you within 24 hours.
                </p>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setStatus("idle");
                    setForm({ name: "", email: "", subject: "", message: "", _honeypot: "" });
                  }}
                >
                  Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot — hidden from real users */}
                <input
                  type="text"
                  name="_honeypot"
                  value={form._honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px" }}
                />

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[13px] uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[13px] uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="font-mono text-[13px] uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry, consulting, etc."
                    required
                    className={inputClass}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="font-mono text-[13px] uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or question..."
                    required
                    rows={6}
                    className={cn(inputClass, "resize-none")}
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full justify-center"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    "Sending..."
                  ) : (
                    <>
                      Send message <Send size={14} />
                    </>
                  )}
                </Button>

                {status === "error" && (
                  <p className="font-mono text-xs text-coral text-center">
                    Something went wrong. Try emailing me directly.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
