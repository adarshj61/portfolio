import { useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
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

  const contactMethods = [
    {
      label: "Direct Email",
      value: PROFILE.email,
      href: PROFILE.emailUrl,
      external: false,
      icon: (
        <Mail
          size={15}
          className="shrink-0 text-blue-600 dark:text-blue-400"
          aria-hidden="true"
        />
      ),
    },
    {
      label: "GitHub Profile",
      value: PROFILE.github,
      href: PROFILE.github,
      external: true,
      icon: (
        <GithubIcon className="h-3.5 w-3.5 shrink-0 text-[#111111] dark:text-[#F5F5F5]" />
      ),
    },
    {
      label: "LinkedIn Profile",
      value: PROFILE.linkedin,
      href: PROFILE.linkedin,
      external: true,
      icon: (
        <LinkedinIcon className="h-3.5 w-3.5 shrink-0 text-[#0A66C2] dark:text-[#0A66C2]" />
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-[#E5E5E5] py-16 md:py-20 dark:border-white/10"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          label="Contact"
          title="Let's build something useful."
          description="I'm always open to interesting projects, internship opportunities and conversations about technology."
        />

        {/* Big Editorial CTA Card */}
        <div className="rounded-2xl border border-[#E5E5E5] bg-white p-8 transition-all dark:border-white/10 dark:bg-white/[0.02] sm:p-12 lg:p-16">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Get In Touch
              </span>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#111111] dark:text-[#F5F5F5] sm:text-3xl md:text-4xl">
                Have an opportunity or project in mind?
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#6B6B6B] dark:text-[#A3A3A3] sm:text-base">
                Whether you're looking for an intern, want to collaborate on a
                web application, or just want to chat about tech, feel free to
                reach out.
              </p>
            </div>

            {/* Main Email CTA Button */}
            <a
              href={PROFILE.emailUrl}
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#111111] px-7 py-4 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600 dark:bg-white dark:text-[#111111] dark:hover:bg-blue-600 dark:hover:text-white"
            >
              <span>Get in touch</span>
              <ArrowUpRight
                size={18}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          {/* Contact Form */}
          <div className="mt-12 border-t border-[#E5E5E5] pt-10 dark:border-white/10">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {status === "success" && (
                <div
                  role="status"
                  className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-700 dark:text-emerald-400"
                >
                  Message sent successfully.
                </div>
              )}

              {status === "error" && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-700 dark:text-red-400"
                >
                  {errorMessage || "Something went wrong. Please try again."}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="min-w-0">
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
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
                    className="w-full min-w-0 rounded-xl border border-[#E5E5E5] bg-neutral-50/60 px-4 py-3 text-sm text-[#111111] placeholder:text-neutral-400 transition-colors focus:border-blue-600 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-white/[0.02] dark:text-[#F5F5F5] dark:placeholder:text-neutral-500 dark:focus:border-blue-400 dark:focus:bg-transparent"
                  />
                </div>

                <div className="min-w-0">
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
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
                    className="w-full min-w-0 rounded-xl border border-[#E5E5E5] bg-neutral-50/60 px-4 py-3 text-sm text-[#111111] placeholder:text-neutral-400 transition-colors focus:border-blue-600 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-white/[0.02] dark:text-[#F5F5F5] dark:placeholder:text-neutral-500 dark:focus:border-blue-400 dark:focus:bg-transparent"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="contact-subject"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
                >
                  Subject{" "}
                  <span className="text-xs font-normal lowercase tracking-normal text-neutral-400 dark:text-neutral-500">
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
                  className="w-full min-w-0 rounded-xl border border-[#E5E5E5] bg-neutral-50/60 px-4 py-3 text-sm text-[#111111] placeholder:text-neutral-400 transition-colors focus:border-blue-600 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-white/[0.02] dark:text-[#F5F5F5] dark:placeholder:text-neutral-500 dark:focus:border-blue-400 dark:focus:bg-transparent"
                />
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  maxLength={5000}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hello Adarsh, I came across your portfolio..."
                  className="w-full min-w-0 resize-y rounded-xl border border-[#E5E5E5] bg-neutral-50/60 px-4 py-3 text-sm text-[#111111] placeholder:text-neutral-400 transition-colors focus:border-blue-600 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-white/[0.02] dark:text-[#F5F5F5] dark:placeholder:text-neutral-500 dark:focus:border-blue-400 dark:focus:bg-transparent"
                />
              </div>

              <div className="flex items-center justify-start pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#111111] px-7 py-4 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-[#111111] dark:bg-white dark:text-[#111111] dark:hover:bg-blue-600 dark:hover:text-white dark:disabled:hover:bg-white dark:disabled:hover:text-[#111111] cursor-pointer disabled:cursor-not-allowed"
                >
                  <span>
                    {status === "submitting" ? "Sending..." : "Send Message"}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </button>
              </div>
            </form>
          </div>

          {/* Contact Details Grid */}
          <div className="mt-12 grid gap-4 border-t border-[#E5E5E5] pt-10 dark:border-white/10 sm:grid-cols-3">
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target={method.external ? "_blank" : undefined}
                rel={method.external ? "noopener noreferrer" : undefined}
                className="group flex flex-col justify-between min-w-0 rounded-lg border border-[#E5E5E5] bg-neutral-50/60 p-4 transition-all duration-200 hover:border-neutral-300 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/20"
              >
                <div className="min-w-0 w-full">
                  <div className="flex items-center gap-2">
                    {method.icon}
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                      {method.label}
                    </span>
                  </div>
                  <p
                    className="mt-1 font-mono text-xs font-medium text-[#111111] transition-colors group-hover:text-blue-600 dark:text-[#F5F5F5] dark:group-hover:text-blue-400 min-w-0 max-w-full break-words [overflow-wrap:anywhere]"
                    style={{ overflowWrap: "anywhere" }}
                  >
                    {method.value}
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#6B6B6B] transition-colors group-hover:text-[#111111] dark:text-[#A3A3A3] dark:group-hover:text-white shrink-0">
                  <span>Open link</span>
                  <ArrowUpRight
                    size={12}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
