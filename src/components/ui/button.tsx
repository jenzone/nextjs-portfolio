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
        'border border-(--primary-light) bg-transparent text-(--primary-light) hover:border-(--primary) hover:bg-(--primary) hover:text-(--foreground) transition-colors duration-300 ease-out'
      hoverAnimation = null
      break
    case 'solid':
    default:
      buttonStyle =
        'bg-linear-to-r from-(--primary) to-(--primary-light) text-(--foreground)'
      hoverAnimation = (
        <span className="absolute inset-0.5 transform rounded-xs border-2 border-(--accent) transition-transform duration-300 will-change-transform group-hover:translate-x-2 group-hover:translate-y-2" />
      )
      break
  }

  return (
    <div>
      <button className={`${className} group relative z-20`} type={type}>
        {/* button content */}
        <span
          className={`relative z-10 flex items-center justify-center rounded-xs px-4 py-3 ${buttonStyle}`}
        >
          {children}
        </span>
        {/* animation hover */}
        {hoverAnimation}
      </button>
    </div>
  )
}
