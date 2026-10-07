import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Mail } from "lucide-react";
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

export default function Hero() {
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
const fullName = "Adarsh Jaiswal.";

const [typedName, setTypedName] = useState("");

useEffect(() => {
  let index = 0;

  const typingInterval = setInterval(() => {
    setTypedName(fullName.slice(0, index + 1));
    index += 1;

    if (index === fullName.length) {
      clearInterval(typingInterval);
    }
  }, 150);

  return () => clearInterval(typingInterval);
}, []);

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-start"
        >
          {/* Availability Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white/70 px-3 py-1 text-xs font-semibold text-[#111111] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-[#F5F5F5]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>{PROFILE.availability}</span>
          </div>

          {/* Eyebrow */}
          <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#6B6B6B] dark:text-[#A3A3A3]">
            {PROFILE.eyebrow}
          </p>

         <h1 className="text-5xl font-extrabold leading-[0.95] tracking-[-0.055em] text-[#111111] sm:text-6xl md:text-7xl lg:text-[78px] xl:text-[86px] dark:text-[#F5F5F5]">
  Hi, I'm
  <br />
  <span className="text-[#2563EB]">
    {typedName}
    
  </span>
</h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#6B6B6B] sm:text-base sm:leading-relaxed dark:text-[#A3A3A3]">
            {PROFILE.bio}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#111111] px-5 py-3 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600 dark:bg-white dark:text-[#111111] dark:hover:bg-blue-600 dark:hover:text-white"
            >
              <span>View my work</span>
              <ArrowDownRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>

            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-lg border border-[#E5E5E5] bg-white px-5 py-3 text-xs font-bold text-[#111111] transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 dark:border-white/10 dark:bg-white/[0.04] dark:text-[#F5F5F5] dark:hover:border-white/20 dark:hover:bg-white/[0.08]"
            >
              <span>Let's connect</span>
              <ArrowUpRight
                size={15}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex items-center gap-2.5">
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
        </motion.div>

        {/* RIGHT PHOTO & METADATA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="relative mx-auto max-w-[380px]">
            {/* Image frame */}
            <div className="group relative overflow-hidden rounded-xl border border-[#E5E5E5] bg-neutral-200/50 shadow-sm transition-all duration-300 dark:border-white/10 dark:bg-neutral-800">
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img
                  src="/profile.png"
                  alt={`${PROFILE.name} - Full-Stack Developer`}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Subtle metadata card */}
            <div className="mt-3.5 flex items-center justify-between px-1 text-[11px] font-semibold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
              <span>Currently in {PROFILE.location}</span>
              <span>CSE · {new Date().getFullYear()}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}