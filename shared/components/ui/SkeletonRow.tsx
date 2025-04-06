export function SkeletonRow() {
  return (
    <div className="animate-pulse flex flex-col gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className="h-4 w-1/6 rounded bg-muted" />
          <div className="h-4 w-1/4 rounded bg-muted" />
          <div className="h-4 w-1/5 rounded bg-muted" />
          <div className="h-4 w-1/6 rounded bg-muted" />
          <div className="h-4 w-1/6 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}