export default function Loading() {
  return (
    <div className="container-custom py-12 animate-pulse">
      <div className="h-10 w-64 bg-gray-200 rounded-lg mb-8" />
      <div className="w-full bg-white/40 rounded-xl border border-white/50 overflow-hidden">
        <div className="h-16 bg-gray-100 border-b border-gray-200" />
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-12 border-b border-gray-200 last:border-0" />
        ))}
      </div>
    </div>
  );
}
