import SectionHeading from "../components/SectionHeading";
import { PROFILE } from "../data/profile";

export default function Education() {
  const coursework = [
    "Data Structures & Algorithms",
    "Database Management Systems (DBMS)",
    "Object-Oriented Programming (Java)",
    "Operating Systems",
    "Computer Networks",
    "Computer Graphics",
    "Software Engineering",
    "Web Technologies",
  ];

  return (
    <section
      id="education"
      className="scroll-mt-20 border-t border-[#E5E5E5] py-16 md:py-20 dark:border-white/10"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          label="Education"
          title="Academic foundation."
          description="Formal computer science education grounding theoretical principles into software implementation."
        />

        <div className="rounded-xl border border-[#E5E5E5] bg-white p-7 sm:p-9 dark:border-white/10 dark:bg-white/[0.02]">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-baseline">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Undergraduate Degree
              </span>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-[#111111] dark:text-[#F5F5F5]">
                {PROFILE.degree}
              </h3>
              <p className="mt-1 text-sm font-medium text-[#6B6B6B] dark:text-[#A3A3A3]">
                {PROFILE.university}
              </p>
              <span className="text-xs font-semibold text-blue-600">
    CGPA: {PROFILE.cgpa}
  </span>
            </div>

            <div className="inline-flex self-start rounded-md border border-[#E5E5E5] bg-neutral-100/70 px-3 py-1 text-xs font-semibold text-[#111111] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#F5F5F5] sm:self-auto">
              Pursuing Degree
            </div>
          </div>

          <div className="mt-8 border-t border-[#E5E5E5] pt-6 dark:border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-3">
              Relevant Coursework
            </h4>
            <div className="flex flex-wrap gap-2">
              {coursework.map((course) => (
                <span
                  key={course}
                  className="rounded-lg border border-[#E5E5E5] bg-neutral-50 px-3 py-1.5 text-xs font-medium text-[#111111] dark:border-white/10 dark:bg-white/[0.02] dark:text-[#F5F5F5]"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
