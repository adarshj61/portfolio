import SectionHeading from "../components/SectionHeading";
import { experiences } from "../data/experience";

export default function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 border-t border-[#E5E5E5] py-16 md:py-20 dark:border-white/10"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          label="Experience"
          title="Practical experience."
          description="Internship and professional contributions in software engineering and web application development."
        />

        <div className="space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="rounded-xl border border-[#E5E5E5] bg-white p-7 transition-all duration-200 dark:border-white/10 dark:bg-white/[0.02] sm:p-8"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-baseline">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-[#111111] dark:text-[#F5F5F5]">
                    {exp.role}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    <span>{exp.company}</span>
                    <span className="text-neutral-300 dark:text-neutral-700">·</span>
                    <span className="text-xs font-medium text-[#6B6B6B] dark:text-[#A3A3A3]">
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="inline-flex self-start rounded-md border border-[#E5E5E5] bg-neutral-100/70 px-3 py-1 text-xs font-semibold text-[#111111] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#F5F5F5] sm:self-auto">
                  {exp.period}
                </div>
              </div>

              {/* Description & Responsibilities */}
              <div className="mt-6 border-t border-[#E5E5E5] pt-5 dark:border-white/10">
                <p className="text-xs font-mono font-medium tracking-wide text-neutral-400 dark:text-neutral-500 mb-3 uppercase">
                  {exp.description}
                </p>

                <ul className="space-y-2.5 text-sm text-[#6B6B6B] dark:text-[#A3A3A3]">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-[#E5E5E5] dark:border-white/10">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-[#E5E5E5] bg-neutral-50 px-2.5 py-1 text-xs font-medium text-[#111111] dark:border-white/10 dark:bg-white/[0.02] dark:text-[#F5F5F5]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
