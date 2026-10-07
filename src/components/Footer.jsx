import { ArrowUpRight } from "lucide-react";
import { PROFILE } from "../data/profile";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E5E5E5] bg-[#F8F8F6] py-10 transition-colors dark:border-white/10 dark:bg-[#111111]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 sm:flex-row sm:px-8">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <p className="text-xs font-medium text-[#6B6B6B] dark:text-[#A3A3A3]">
            © {currentYear} {PROFILE.name}. All rights reserved.
          </p>
          <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
            Built with React & Tailwind CSS
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-xs font-semibold text-[#6B6B6B] transition-colors hover:text-[#111111] dark:text-[#A3A3A3] dark:hover:text-[#F5F5F5]"
          >
            <span>GitHub</span>
            <ArrowUpRight
              size={12}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-xs font-semibold text-[#6B6B6B] transition-colors hover:text-[#111111] dark:text-[#A3A3A3] dark:hover:text-[#F5F5F5]"
          >
            <span>LinkedIn</span>
            <ArrowUpRight
              size={12}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
          <a
            href={PROFILE.emailUrl}
            className="group inline-flex items-center gap-1 text-xs font-semibold text-[#6B6B6B] transition-colors hover:text-[#111111] dark:text-[#A3A3A3] dark:hover:text-[#F5F5F5]"
          >
            <span>Email</span>
            <ArrowUpRight
              size={12}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
