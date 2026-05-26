export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh">
      {children}
    </div>
  );
}
