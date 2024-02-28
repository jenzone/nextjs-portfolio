import { motion } from 'framer-motion'

interface ToggleProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Toggle: React.FC<ToggleProps> = ({ setOpen }) => {
  return (
    <button onClick={() => setOpen((prev) => !prev)} className="relative z-50">
      <svg width="32" height="32" viewBox="0 0 23 23">
        <motion.path
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          transition={{ duration: 0.4 }}
          variants={{
            closed: { d: 'M 8 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <motion.path
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          transition={{ duration: 0.4 }}
          variants={{
            closed: { d: 'M 2 9.423 L 20 9.423', opacity: 1 },
            open: { d: 'M 3 9.423 L 17 9.423', opacity: 0 },
          }}
        />
        <motion.path
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          transition={{ duration: 0.4 }}
          variants={{
            closed: { d: 'M 12 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
      </svg>
    </button>
  )
}

export default Toggle
