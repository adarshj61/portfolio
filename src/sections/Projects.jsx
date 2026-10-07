import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { projects } from "../data/projects";

function ProjectVisual({ project }) {
  const [imgError, setImgError] = useState(false);

  // Gradient accents for projects when image fallback is active
  const accents = {
    1: "from-blue-600/20 via-indigo-600/10 to-transparent",
    2: "from-emerald-600/20 via-teal-600/10 to-transparent",
    3: "from-amber-600/20 via-orange-600/10 to-transparent",
    4: "from-sky-600/20 via-cyan-600/10 to-transparent",
  };

  const currentAccent = accents[project.id] || "from-neutral-600/20 to-transparent";

    const hasValidImage =
      Boolean(project.image) &&
      !project.image.startsWith("YOUR_") &&
      !imgError;

    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-[#E5E5E5] bg-neutral-100 dark:border-white/10 dark:bg-neutral-900">
        {hasValidImage ? (
          <img
            src={project.image}
            alt={`${project.title} Preview`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
        <div
          className={`relative flex h-full w-full flex-col justify-between p-6 bg-gradient-to-br ${currentAccent} transition-transform duration-500 group-hover:scale-[1.02]`}
        >
          {/* Subtle browser mockup header */}
          <div className="flex items-center justify-between border-b border-black/5 pb-3 dark:border-white/5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              {project.category}
            </span>
          </div>

          {/* Central graphic element */}
          <div className="my-auto py-4">
            <span className="text-3xl font-extrabold tracking-tight text-[#111111] dark:text-[#F5F5F5] sm:text-4xl">
              {project.title}
            </span>
            <p className="mt-1 text-xs text-[#6B6B6B] dark:text-[#A3A3A3] line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* Bottom tag preview */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded bg-black/5 px-2 py-0.5 text-[10px] font-medium text-neutral-600 dark:bg-white/10 dark:text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const regularProjects = projects.filter((p) => p.id !== featuredProject.id);

  return (
    <section
      id="projects"
      className="scroll-mt-20 border-t border-[#E5E5E5] py-16 md:py-20 dark:border-white/10"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          label="Projects"
          title="Selected work."
          description="A selection of projects where I've explored frontend engineering, full-stack development, APIs, AI integrations and product-focused interfaces."
        />

        {/* ================= FEATURED PROJECT (QuickAI) ================= */}
        {featuredProject && (
          <div className="group mb-8 sm:mb-10 rounded-2xl border border-[#E5E5E5] bg-white p-6 transition-all duration-300 hover:border-neutral-400 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/20 sm:p-9 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12 items-center">
              {/* Left Column: Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                      {featuredProject.number}
                    </span>
                    <span className="text-neutral-300 dark:text-neutral-700">·</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      {featuredProject.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-[#111111] dark:text-[#F5F5F5] sm:text-3xl">
                    {featuredProject.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-[#6B6B6B] dark:text-[#A3A3A3] sm:text-[15px]">
                    {featuredProject.description}
                  </p>

                  {/* Feature highlights */}
                  {featuredProject.features && (
                    <div className="mt-6">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-2.5">
                        Key Capabilities
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs text-[#6B6B6B] dark:text-[#A3A3A3]">
                        {featuredProject.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technology badges */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {featuredProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-[#E5E5E5] bg-neutral-50 px-2.5 py-1 text-xs font-medium text-[#111111] dark:border-white/10 dark:bg-white/[0.03] dark:text-[#F5F5F5]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="mt-8 flex items-center gap-5 border-t border-[#E5E5E5] pt-6 dark:border-white/10">
                  <a
                    href={featuredProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-xs font-bold text-[#111111] transition-colors hover:text-blue-600 dark:text-[#F5F5F5] dark:hover:text-blue-400"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    />
                  </a>
                  <a
                    href={featuredProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-xs font-bold text-[#111111] transition-colors hover:text-blue-600 dark:text-[#F5F5F5] dark:hover:text-blue-400"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    />
                  </a>
                </div>
              </div>

              {/* Right Column: Visual Preview */}
              <div>
                <ProjectVisual project={featuredProject} />
              </div>
            </div>
          </div>
        )}

        {/* ================= REGULAR PROJECTS GRID ================= */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regularProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-xl border border-[#E5E5E5] bg-white p-6 transition-all duration-300 hover:border-neutral-400 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/20"
            >
              <div>
                {/* Visual Preview */}
                <div className="mb-5">
                  <ProjectVisual project={project} />
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                    {project.number}
                  </span>
                  <span className="text-neutral-300 dark:text-neutral-700">·</span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    {project.category}
                  </span>
                </div>

                <h4 className="text-xl font-bold tracking-tight text-[#111111] dark:text-[#F5F5F5]">
                  {project.title}
                </h4>

                <p className="mt-2.5 text-xs leading-relaxed text-[#6B6B6B] dark:text-[#A3A3A3]">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-[#E5E5E5] bg-neutral-50 px-2 py-0.5 text-[11px] font-medium text-[#111111] dark:border-white/10 dark:bg-white/[0.03] dark:text-[#F5F5F5]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Links */}
              <div className="mt-6 flex items-center justify-between border-t border-[#E5E5E5] pt-4 dark:border-white/10">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1 text-xs font-bold text-[#111111] transition-colors hover:text-blue-600 dark:text-[#F5F5F5] dark:hover:text-blue-400"
                >
                  <span>GitHub</span>
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  />
                </a>

                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1 text-xs font-bold text-[#111111] transition-colors hover:text-blue-600 dark:text-[#F5F5F5] dark:hover:text-blue-400"
                >
                  <span>Live Demo</span>
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
