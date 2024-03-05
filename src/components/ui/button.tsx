type ButtonProps = {
  variant?: 'outline' | 'solid'
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  children,
}) => {
  let buttonStyle, hoverAnimation

  switch (variant) {
    case 'outline':
      buttonStyle =
        'border border-[var(--primary-200)] bg-transparent text-[var(--primary-200)] hover:bg-[var(--primary-200)] hover:text-[var(--text-100)] transition-colors duration-500 ease-out'
      hoverAnimation = null
      break
    case 'solid':
    default:
      buttonStyle =
        'bg-gradient-to-r from-[var(--primary-100)] to-[var(--primary-200)] text-[var(--text-100)]'
      hoverAnimation = (
        <span className="absolute inset-0 transform rounded-sm border-2 border-[var(--accent-200)] transition-transform duration-300 will-change-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
      )
      break
  }

  return (
    <div>
      <button className="group relative z-20">
        {/* button content */}
        <span
          className={`relative z-10 flex items-center justify-center rounded-sm px-5 py-3 ${buttonStyle}`}
        >
          {children}
        </span>
        {/* animation hover */}
        {hoverAnimation}
      </button>
    </div>
  )
}
