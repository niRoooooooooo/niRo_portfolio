"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeUp, slideInRight, cn } from "@/lib/utils";
import type { ContactFormData } from "@/types";

type FormStatus = "idle" | "submitting" | "success" | "error";

const linkItemClass =
  "group flex items-center gap-4 p-4 border border-[var(--border)] rounded-lg hover:border-purple/40 transition-colors bg-elevated/40";
const iconBoxClass =
  "w-10 h-10 rounded-lg bg-elevated flex items-center justify-center group-hover:bg-purple/10 transition-colors flex-shrink-0";
const iconClass = "text-[var(--text-muted)] group-hover:text-purple transition-colors";

export function Contact() {
  const { ref: leftRef,  isInView: leftInView  } = useScrollReveal();
  const { ref: rightRef, isInView: rightInView } = useScrollReveal();

  const [form, setForm] = useState<ContactFormData>({
    name: "", email: "", subject: "", message: "", _honeypot: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
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
    "w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-lg px-4 py-3",
    "font-mono text-sm text-warm placeholder-[var(--text-dim)]",
    "focus:outline-none focus:border-purple/50 transition-colors"
  );

  return (
    <section id="contact" className="section-pad bg-base">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Full-width header ─────────────────────────────── */}
        <motion.div
          ref={leftRef}
          variants={staggerContainer}
          initial="hidden"
          animate={leftInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel index="07" label="Contact" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-5xl lg:text-7xl font-bold text-warm mb-6 leading-tight"
          >
            Start a{" "}
            <span className="text-purple">conversation</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-mono text-sm text-[var(--text-muted)] leading-relaxed max-w-lg"
          >
            Whether you have a project in mind, need a second opinion on an
            architecture, or just want to talk shop — I respond within 24 hours.
          </motion.p>
        </motion.div>

        {/* ── Two columns ───────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — reach me at */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={leftInView ? "visible" : "hidden"}
            className="flex flex-col gap-4"
          >
            <motion.p variants={fadeUp} className="font-mono text-xs text-purple tracking-widest uppercase mb-2">
              // reach me at
            </motion.p>

            <motion.a href="https://mail.google.com/mail/?view=cm&to=rniloy1234@gmail.com"
              target="_blank"
              rel="noopener noreferrer" variants={fadeUp} className={linkItemClass}>
              <div className={iconBoxClass}><Mail size={16} className={iconClass} /></div>
              <div>
                <p className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Email</p>
                <p className="font-mono text-sm text-warm group-hover:text-purple transition-colors">rniloy1234@gmail.com</p>
              </div>
            </motion.a>

            <motion.a href="https://github.com/niRoooooooooo" target="_blank" rel="noopener noreferrer" variants={fadeUp} className={linkItemClass}>
              <div className={iconBoxClass}><GithubIcon width={16} height={16} className={iconClass} /></div>
              <div>
                <p className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">GitHub</p>
                <p className="font-mono text-sm text-warm group-hover:text-purple transition-colors">github.com/niRoooooooooo</p>
              </div>
            </motion.a>

            <motion.a href="https://www.linkedin.com/in/niloy-roy-183a782a8" target="_blank" rel="noopener noreferrer" variants={fadeUp} className={linkItemClass}>
              <div className={iconBoxClass}><LinkedinIcon width={16} height={16} className={iconClass} /></div>
              <div>
                <p className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">LinkedIn</p>
                <p className="font-mono text-sm text-warm group-hover:text-purple transition-colors">linkedin.com/in/niloy-roy</p>
              </div>
            </motion.a>

            <motion.a href="https://www.instagram.com/____niro__/" target="_blank" rel="noopener noreferrer" variants={fadeUp} className={linkItemClass}>
              <div className={iconBoxClass}><InstagramIcon width={16} height={16} className={iconClass} /></div>
              <div>
                <p className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Instagram</p>
                <p className="font-mono text-sm text-warm group-hover:text-purple transition-colors">instagram.com/____niro__</p>
              </div>
            </motion.a>
          </motion.div>

          {/* Right — form card */}
          <motion.div
            ref={rightRef}
            variants={slideInRight}
            initial="hidden"
            animate={rightInView ? "visible" : "hidden"}
          >
            <div className="border border-[var(--border)] rounded-2xl bg-surface p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center gap-4 text-center py-16">
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
                <>
                  <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mb-6">
                    Send a message
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                      type="text" name="_honeypot" value={form._honeypot}
                      onChange={handleChange} tabIndex={-1} aria-hidden="true"
                      style={{ position: "absolute", left: "-9999px" }}
                    />

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Name</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange}
                          placeholder="Your name" required className={inputClass} />
                      </div>
                      <div>
                        <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Email</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange}
                          placeholder="you@company.com" required className={inputClass} />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Subject</label>
                      <input type="text" name="subject" value={form.subject} onChange={handleChange}
                        placeholder="Project inquiry, consulting, etc." required className={inputClass} />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Message</label>
                      <textarea name="message" value={form.message} onChange={handleChange}
                        placeholder="Tell me about your project or question..."
                        required rows={5} className={cn(inputClass, "resize-none")} />
                    </div>

                    {/* Submit */}
                    <Button type="submit" variant="primary" className="w-full justify-center"
                      disabled={status === "submitting"}>
                      {status === "submitting" ? "Sending..." : <><span>Send message</span> <Send size={14} /></>}
                    </Button>

                    {status === "error" && (
                      <p className="font-mono text-xs text-coral text-center">
                        Something went wrong. Try emailing me directly.
                      </p>
                    )}
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
