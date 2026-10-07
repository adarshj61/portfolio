import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { PROFILE } from "../data/profile";

export default function Hero() {
  const socialLinks = [
    { label: "GitHub", href: PROFILE.github, external: true },
    { label: "LinkedIn", href: PROFILE.linkedin, external: true },
    { label: "Email", href: PROFILE.emailUrl, external: false },
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
          <div className="mt-8 flex flex-wrap items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.external ? "_blank" : undefined}
                rel={social.external ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-1 text-xs font-semibold text-[#6B6B6B] transition-colors hover:text-[#111111] dark:text-[#A3A3A3] dark:hover:text-[#F5F5F5]"
              >
                <span>{social.label}</span>
                <ArrowUpRight
                  size={12}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
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