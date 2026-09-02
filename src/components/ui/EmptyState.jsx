export default function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      {Icon && (
        <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-surface-muted text-gray-400">
          <Icon size={20} strokeWidth={2} />
        </span>
      )}
      <p className="text-sm font-medium text-ink">{title}</p>
      {description && <p className="mt-1 max-w-xs text-sm text-gray-400">{description}</p>}
    </div>
  );
}
