export default function SkeletonCard() {
  return (
    <div className="bg-[#171410] rounded-2xl overflow-hidden border border-[#2c2820]">
      <div className="h-36 skeleton" />
      <div className="p-3 space-y-2">
        <div className="h-4 skeleton rounded-lg w-3/4" />
        <div className="h-3 skeleton rounded-lg w-full" />
        <div className="h-3 skeleton rounded-lg w-1/2" />
        <div className="flex justify-between items-center pt-1">
          <div className="h-5 skeleton rounded-lg w-14" />
          <div className="w-8 h-8 skeleton rounded-full" />
        </div>
      </div>
    </div>
  );
}
