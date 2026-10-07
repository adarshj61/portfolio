import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { PROFILE } from "../data/profile";

export default function Contact() {
  const contactMethods = [
    {
      label: "Direct Email",
      value: PROFILE.email,
      href: PROFILE.emailUrl,
      external: false,
    },
    {
      label: "GitHub Profile",
      value: PROFILE.github,
      href: PROFILE.github,
      external: true,
    },
    {
      label: "LinkedIn Profile",
      value: PROFILE.linkedin,
      href: PROFILE.linkedin,
      external: true,
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
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                    {method.label}
                  </span>
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
