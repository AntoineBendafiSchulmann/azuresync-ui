import { Home, Calendar, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";

export function Sidebar() {
  const items = [
    { label: "Accueil", icon: <Home className="h-5 w-5" />, to: "/" },
    { label: "Calendrier", icon: <Calendar className="h-5 w-5" />, to: "/calendar" },
    { label: "Paramètres", icon: <Settings className="h-5 w-5" />, to: "/settings" },
  ];

  return (
    <aside className="h-screen w-64 shrink-0 bg-neutral-900 text-white border-r">
      <div className="p-6 text-xl font-bold border-b border-neutral-800">AzureSync</div>
      <nav className="flex flex-col gap-1 p-4">
        {items.map(({ label, icon, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded px-3 py-2 text-sm font-medium hover:bg-neutral-800 transition",
                isActive ? "bg-neutral-800 text-white" : "text-neutral-300"
              )
            }
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
