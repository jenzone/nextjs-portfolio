type ButtonProps = {
  variant?: 'outline' | 'solid'
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  children,
  className,
  type = 'button',
}) => {
  let buttonStyle, hoverAnimation

  switch (variant) {
    case 'outline':
      buttonStyle =
        'border border-[var(--primary-light)] bg-transparent text-[var(--primary-light)] hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--foreground)] transition-colors duration-300 ease-out'
      hoverAnimation = null
      break
    case 'solid':
    default:
      buttonStyle =
        'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] text-[var(--foreground)]'
      hoverAnimation = (
        <span className="absolute inset-0 transform rounded-sm border-2 border-[var(--accent)] transition-transform duration-300 will-change-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
      )
      break
  }

  return (
    <div>
      <button className={`${className} group relative z-20`} type={type}>
        {/* button content */}
        <span
          className={`relative z-10 flex items-center justify-center rounded-sm px-4 py-3 ${buttonStyle}`}
        >
          {children}
        </span>
        {/* animation hover */}
        {hoverAnimation}
      </button>
    </div>
  )
}
