export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className = "",
}) {
  const isCentered = align === "center";

  return (
    <div
      className={`mb-8 sm:mb-10 md:mb-12 ${
        isCentered ? "text-center mx-auto max-w-2xl" : "max-w-3xl"
      } ${className}`}
    >
      {label && (
        <div
          className={`inline-flex items-center gap-2 mb-3.5 ${
            isCentered ? "justify-center" : ""
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
            {label}
          </span>
        </div>
      )}

      <h2 className="text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F5F5] sm:text-4xl md:text-[44px] md:leading-[1.15]">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-[15px] leading-relaxed text-[#6B6B6B] dark:text-[#A3A3A3] sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}