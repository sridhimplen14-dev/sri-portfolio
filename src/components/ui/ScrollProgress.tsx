import { motion, useScroll, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/useMedia';

export function ScrollProgress() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduced ? 500 : 120,
    damping: reduced ? 50 : 28,
    mass: 0.2,
  });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX, transformOrigin: '0% 50%' }}
      aria-hidden="true"
    />
  );
}
