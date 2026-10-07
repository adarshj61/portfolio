import SectionHeading from "../components/SectionHeading";
import { skillCategories } from "../data/skills";

export default function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-20 border-t border-[#E5E5E5] py-16 md:py-20 dark:border-white/10"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          label="Skills"
          title="Tools I use to build."
          description="Technologies, frameworks, and developer tooling I rely on to construct reliable web applications."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="flex flex-col justify-between rounded-xl border border-[#E5E5E5] bg-white p-6 transition-all duration-200 dark:border-white/10 dark:bg-white/[0.02]"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  <h3 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5]">
                    {category.title}
                  </h3>
                </div>

                <p className="text-xs leading-relaxed text-[#6B6B6B] dark:text-[#A3A3A3] mb-5">
                  {category.description}
                </p>
              </div>

              {/* Skill Pills */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#E5E5E5] dark:border-white/10">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-lg border border-[#E5E5E5] bg-neutral-50 px-2.5 py-1 text-xs font-medium text-[#111111] transition-colors hover:border-neutral-300 dark:border-white/10 dark:bg-white/[0.03] dark:text-[#F5F5F5] dark:hover:border-white/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
