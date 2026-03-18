import { motion } from 'framer-motion';

export default function ImageCard({
  src,
  alt = '',
  className = '',
  overlayClass = 'gradient-overlay',
  children,
  onClick,
  style,
}) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onClick={onClick}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      style={style}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover img-moody"
        loading="lazy"
      />
      <div className={`absolute inset-0 ${overlayClass}`} />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
