import SectionHeading from "../components/SectionHeading";
import { PROFILE } from "../data/profile";

export default function About() {
  const pillars = [
    {
      title: "Curious by nature.",
      description:
        "Constantly diving into under-the-hood workings of modern web technologies, protocols, and developer ecosystems.",
    },
    {
      title: "Focused on growth.",
      description:
        "Iterating daily through coding challenges, clean system architecture, and practical engineering concepts.",
    },
    {
      title: "Always building.",
      description:
        "Translating conceptual designs into working prototypes and full-stack software products that solve actual needs.",
    },
  ];

  const focusAreas = [
    "Modern Web Development",
    "Full-Stack Applications",
    "RESTful APIs",
    "Database Management",
    "AI & LLM Integrations",
    "Data Structures & Problem Solving",
    "Cloud Deployments",
    "Continuous Learning",
  ];

  return (
    <section
      id="about"
      className="scroll-mt-20 border-t border-[#E5E5E5] py-16 md:py-20 dark:border-white/10"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          label="About"
          title="A developer who likes to build."
          description={PROFILE.aboutDescription}
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* LEFT COLUMN: PILLARS */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-xl border border-[#E5E5E5] bg-white p-6 transition-all duration-200 dark:border-white/10 dark:bg-white/[0.02]"
                >
                  <h3 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#6B6B6B] sm:text-sm dark:text-[#A3A3A3]">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Stat / Context Pill */}
            <div className="rounded-xl border border-[#E5E5E5] bg-white/50 p-6 dark:border-white/10 dark:bg-white/[0.01]">
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Current Academic Focus
              </p>
              <p className="mt-1 text-sm font-semibold text-[#111111] dark:text-[#F5F5F5]">
                {PROFILE.degree}
              </p>
              <p className="text-xs text-[#6B6B6B] dark:text-[#A3A3A3]">
                {PROFILE.university}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: EDITORIAL STORY & INTERESTS */}
          <div className="flex flex-col justify-between">
            <div className="space-y-5 text-[15px] leading-relaxed text-[#6B6B6B] dark:text-[#A3A3A3]">
              <p>
                I am a Computer Science Engineering student and passionate
                full-stack web developer based in {PROFILE.location}. My work
                centers on turning abstract requirements into robust,
                user-friendly web applications that feel fast and intuitive.
              </p>
              <p>
                From architecting responsive frontends with React and Tailwind
                CSS to engineering backend services with Node.js, Express, and
                MongoDB, I enjoy the complete lifecycle of product creation. I
                actively explore integrating AI models to provide intelligent,
                real-time features that meaningfully enhance user workflows.
              </p>
              <p>
                When not coding project features, I spend time strengthening my
                foundation in Data Structures & Algorithms, exploring new tools,
                and collaborating on open-ended problems.
              </p>
            </div>

            {/* Focus areas tags */}
            <div className="mt-8 pt-8 border-t border-[#E5E5E5] dark:border-white/10">
              <p className="text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-4">
                Key Interests & Disciplines
              </p>
              <div className="flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center rounded-lg border border-[#E5E5E5] bg-white px-3 py-1.5 text-xs font-medium text-[#111111] transition-colors dark:border-white/10 dark:bg-white/[0.03] dark:text-[#F5F5F5]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}