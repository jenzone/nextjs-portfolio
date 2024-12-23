interface ITimeline {
  role: string
  from: string
  to: string
  experiences: string[]
}

export const Timeline: React.FC<ITimeline> = ({
  role,
  from,
  to,
  experiences,
}) => {
  return (
    <div className="space-y-2 border-l-2 border-[var(--primary)] px-8 py-4">
      {/* role and date timeline */}
      <div className="relative flex items-center">
        <div className="absolute -left-[39px] h-3 w-3 rounded-full bg-[var(--primary)]" />
        <div className="flex w-full items-center justify-between">
          <div className="text-lg font-semibold">{role}</div>
          <div className="font-semibold">
            {from} - {to}
          </div>
        </div>
      </div>
      {/* experience timeline */}
      <ul className="list-disc">
        {experiences.map((experience, index) => (
          <li key={index}>{experience}</li>
        ))}
      </ul>
    </div>
  )
}
