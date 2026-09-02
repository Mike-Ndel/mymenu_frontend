export default function Card({ title, description, actions, className = '', children }) {
  const hasHeader = title || actions;

  return (
    <div className={`rounded-card bg-white p-5 shadow-card ${className}`}>
      {hasHeader && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && <h2 className="text-base font-semibold text-ink">{title}</h2>}
            {description && <p className="mt-0.5 text-sm text-gray-400">{description}</p>}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
