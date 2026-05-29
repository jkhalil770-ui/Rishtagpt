export default function GlassCard({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`backdrop-blur-xl bg-white/[0.06] border border-gold/20 rounded-3xl transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${className}`}
    >
      {children}
    </div>
  );
}
