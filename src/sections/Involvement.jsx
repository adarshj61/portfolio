import SectionHeading from "../components/SectionHeading";

export default function Involvement() {
  const activities = [
    {
      title: "NASA Space Apps Challenge Participant",
      category: "Collaborative Sprints & Hackathons",
      description:
        "Participated in time-constrained team sprints, collaborating with peers to design, architect, and deliver functional full-stack web prototypes.",
    },
    {
      title: "Technical Event Volunteer",
      category: "Enginner Day events",
      description:
        "Engaged in campus technical symposiums, coding competitions, and peer problem-solving sessions centered on software engineering.",
    },
    {
      title: "Hands-on Workshop Participant",
      category: "Workshops & Technical Upskilling",
      description:
        "Actively attended hands-on technical workshops exploring modern web development stacks, developer tooling, and API architectures.",
    },
    {
      title: "Traininig & Placement Cell",
      category: "Active Volunteer & Peer Mentorship",
      description:
       "Actively contributed to the Training & Placement Cell by supporting student activities, coordinating placement-related initiatives, and helping peers with relevant information and guidance.",
    },
  ];

  return (
    <section
      id="involvement"
      className="scroll-mt-20 border-t border-[#E5E5E5] py-16 md:py-20 dark:border-white/10"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          label="Involvement"
          title="Involvement beyond code."
          description="Participation across college technical events, hackathon sprints, workshops, and extracurricular technical initiatives."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {activities.map((act) => (
            <div
              key={act.title}
              className="flex flex-col justify-between rounded-xl border border-[#E5E5E5] bg-white p-6 transition-all duration-200 dark:border-white/10 dark:bg-white/[0.02] sm:p-7"
            >
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {act.category}
                </span>
                <h3 className="mt-1.5 text-lg font-bold tracking-tight text-[#111111] dark:text-[#F5F5F5]">
                  {act.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[#6B6B6B] sm:text-sm dark:text-[#A3A3A3]">
                  {act.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-[#E5E5E5] pt-4 dark:border-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  Active Participation
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
