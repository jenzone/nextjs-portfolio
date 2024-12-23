interface ITimeline {
  role: string
  from: string
  to: string
  company: string
  experiences: string[]
}

export const Timeline: React.FC<ITimeline> = ({
  role,
  from,
  to,
  company,
  experiences,
}) => {
  return (
    <div className="border-l-2 border-[var(--primary)] px-4 py-4">
      {/* date timeline */}
      <div className="relative flex items-center">
        <div className="absolute -left-[23px] top-0.5 h-3 w-3 rounded-full bg-[var(--primary)]" />
        <div className="flex w-full items-center justify-between">
          <div className="text-sm font-semibold text-[var(--primary)]">
            {from} - {to}
          </div>
        </div>
      </div>
      {/* content timeline */}
      <div className="text-lg font-semibold">{role}</div>
      <div className="italic">{company}</div>
      <ul className="ml-8 list-disc">
        {experiences.map((experience, index) => (
          <li key={index}>{experience}</li>
        ))}
      </ul>
    </div>
  )
}
