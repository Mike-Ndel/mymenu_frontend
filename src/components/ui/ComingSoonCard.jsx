export default function ComingSoonCard({ icon: Icon, label }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-gray-200 bg-white px-6 py-20 text-center shadow-card">
      {Icon && (
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-ink">
          <Icon size={22} strokeWidth={2} />
        </span>
      )}
      <p className="text-sm font-medium text-ink">{label}</p>
      <p className="mt-1 text-sm text-gray-400">
        This page is built in the next step, once the layout is approved.
      </p>
    </div>
  );
}
