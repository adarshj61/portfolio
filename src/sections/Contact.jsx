import { useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { PROFILE } from "../data/profile";

function GithubIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameTrimmed = formData.name.trim();
    const emailTrimmed = formData.email.trim();
    const messageTrimmed = formData.message.trim();

    if (!nameTrimmed) {
      setStatus("error");
      setErrorMessage("Please enter your name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!messageTrimmed) {
      setStatus("error");
      setErrorMessage("Please enter a message.");
      return;
    }

    if (messageTrimmed.length > 5000) {
      setStatus("error");
      setErrorMessage("Message is too long (maximum 5000 characters).");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameTrimmed,
          email: emailTrimmed,
          subject: formData.subject.trim(),
          message: messageTrimmed,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success !== false) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(
          data.error || "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const socialLinks = [
    {
      label: "GitHub",
      href: PROFILE.github,
      external: true,
      icon: <GithubIcon className="h-4 w-4" />,
    },
    {
      label: "LinkedIn",
      href: PROFILE.linkedin,
      external: true,
      icon: <LinkedinIcon className="h-4 w-4" />,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/adarshj61/",
      external: true,
      icon: <InstagramIcon className="h-4 w-4" />,
    },
    {
      label: "Email",
      href: PROFILE.emailUrl,
      external: false,
      icon: <Mail size={16} />,
    },
  ];

  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-[#E5E5E5] py-14 sm:py-16 md:py-20 dark:border-white/10"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="rounded-2xl border border-[#E5E5E5] bg-white p-6 sm:p-8 lg:p-10 transition-all dark:border-white/10 dark:bg-white/[0.02]">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-start">
            {/* LEFT COLUMN: INTRO, EMAIL CTA & SOCIAL ICONS */}
            <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
              <div>
                <div className="mb-3 inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                    Contact
                  </span>
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-[#111111] dark:text-[#F5F5F5] sm:text-3xl lg:text-[34px] lg:leading-[1.15]">
                  Let's build something useful.
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-[#6B6B6B] dark:text-[#A3A3A3] sm:text-[15px]">
                  Have a project, internship opportunity, or just want to connect?
                  I'd be happy to hear from you.
                </p>

                {/* Email CTA button */}
                <div className="mt-5">
                  <a
                    href={PROFILE.emailUrl}
                    className="group inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#111111] px-4 py-2.5 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600 dark:bg-white dark:text-[#111111] dark:hover:bg-blue-600 dark:hover:text-white"
                  >
                    <span>Email me</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </div>

              {/* Social links row - icon only */}
              <div className="pt-2">
                <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Direct channels
                </p>
                <div className="flex items-center gap-2.5">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.external ? "_blank" : undefined}
                      rel={social.external ? "noreferrer" : undefined}
                      aria-label={social.label}
                      title={social.label}
                      className="inline-flex h-[38px] w-[38px] sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-[#E5E5E5] bg-transparent text-[#111111] transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:bg-neutral-100/70 hover:text-blue-600 dark:border-white/10 dark:text-[#F5F5F5] dark:hover:border-white/20 dark:hover:bg-white/5 dark:hover:text-blue-400"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: COMPACT CONTACT FORM */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                {status === "success" && (
                  <div
                    role="status"
                    className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-400"
                  >
                    Message sent successfully.
                  </div>
                )}

                {status === "error" && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-red-700 dark:text-red-400"
                  >
                    {errorMessage || "Something went wrong. Please try again."}
                  </div>
                )}

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="min-w-0">
                    <label
                      htmlFor="contact-name"
                      className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="h-10 sm:h-11 w-full min-w-0 rounded-lg border border-[#E5E5E5] bg-neutral-50/60 px-3.5 text-xs sm:text-sm text-[#111111] placeholder:text-neutral-400 transition-colors focus:border-blue-600 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-white/[0.02] dark:text-[#F5F5F5] dark:placeholder:text-neutral-500 dark:focus:border-blue-400 dark:focus:bg-transparent"
                    />
                  </div>

                  <div className="min-w-0">
                    <label
                      htmlFor="contact-email"
                      className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="h-10 sm:h-11 w-full min-w-0 rounded-lg border border-[#E5E5E5] bg-neutral-50/60 px-3.5 text-xs sm:text-sm text-[#111111] placeholder:text-neutral-400 transition-colors focus:border-blue-600 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-white/[0.02] dark:text-[#F5F5F5] dark:placeholder:text-neutral-500 dark:focus:border-blue-400 dark:focus:bg-transparent"
                    />
                  </div>
                </div>

                <div className="min-w-0">
                  <label
                    htmlFor="contact-subject"
                    className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
                  >
                    Subject{" "}
                    <span className="text-[10px] font-normal lowercase tracking-normal text-neutral-400 dark:text-neutral-500">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Internship opportunity, collaboration, or question"
                    className="h-10 sm:h-11 w-full min-w-0 rounded-lg border border-[#E5E5E5] bg-neutral-50/60 px-3.5 text-xs sm:text-sm text-[#111111] placeholder:text-neutral-400 transition-colors focus:border-blue-600 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-white/[0.02] dark:text-[#F5F5F5] dark:placeholder:text-neutral-500 dark:focus:border-blue-400 dark:focus:bg-transparent"
                  />
                </div>

                <div className="min-w-0">
                  <label
                    htmlFor="contact-message"
                    className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={3}
                    required
                    maxLength={5000}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hello Adarsh, I'd like to talk about..."
                    className="h-[100px] sm:h-[115px] min-h-[90px] w-full min-w-0 resize-y rounded-lg border border-[#E5E5E5] bg-neutral-50/60 p-3.5 text-xs sm:text-sm text-[#111111] placeholder:text-neutral-400 transition-colors focus:border-blue-600 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-white/[0.02] dark:text-[#F5F5F5] dark:placeholder:text-neutral-500 dark:focus:border-blue-400 dark:focus:bg-transparent"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group inline-flex h-10 sm:h-11 items-center justify-center gap-2 rounded-lg bg-[#111111] px-6 text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-[#111111] dark:bg-white dark:text-[#111111] dark:hover:bg-blue-600 dark:hover:text-white dark:disabled:hover:bg-white dark:disabled:hover:text-[#111111] cursor-pointer disabled:cursor-not-allowed"
                  >
                    <span>
                      {status === "submitting" ? "Sending..." : "Send Message"}
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
