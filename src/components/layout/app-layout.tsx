import { Sidebar } from "../ui/sidebar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-neutral-950 text-white">{children}</main>
    </div>
  );
}
