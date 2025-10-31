import { Home, Calendar, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";
import { useState } from "react";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const items = [
    { label: "Accueil", icon: <Home className="h-6 w-6" />, to: "/" },
    { label: "Calendriers", icon: <Calendar className="h-6 w-6" />, to: "/calendar_showcase" },
    { label: "Paramètres", icon: <Settings className="h-6 w-6" />, to: "/settings" },
  ];

  return (
    <aside
      className={cn(
        "h-screen bg-neutral-900 text-white border-r transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-neutral-800">
        {!isCollapsed && <div className="text-xl font-bold">AzureSync</div>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded hover:bg-neutral-800 transition"
          aria-label="Replier la barre latérale"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-panel-left"
          >
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M9 3v18"></path>
          </svg>
        </button>
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {items.map(({ label, icon, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded px-3 py-2 text-sm font-medium hover:bg-neutral-800 transition",
                isActive ? "bg-neutral-800 text-white" : "text-neutral-300",
                isCollapsed ? "justify-center" : ""
              )
            }
          >
            <div className="h-6 w-6">{icon}</div>
            {!isCollapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
