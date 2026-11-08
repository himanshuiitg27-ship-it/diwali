import { motion } from 'framer-motion'

/** Cinematic chapter transition: soft fade with a gentle blur and scale. */
export default function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      className={`stage ${className}`}
      initial={{ opacity: 0, scale: 1.04, filter: 'blur(14px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.97, filter: 'blur(14px)' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
