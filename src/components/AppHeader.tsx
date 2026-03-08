import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Compass, Building2 } from "lucide-react";
import { departments } from "@/data/professors";

export function AppHeader() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="h-14 border-b bg-card flex items-center px-6 sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 mr-8">
        <GraduationCap className="h-6 w-6 text-quality" />
        <span className="font-bold text-foreground text-lg tracking-tight">ProfRate</span>
      </Link>

      <nav className="flex items-center gap-1">
        <Link
          to="/"
          className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
            isActive("/") ? "bg-secondary font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Compass className="inline h-4 w-4 mr-1.5" />
          Explore
        </Link>
        <div className="relative group">
          <button className="px-3 py-1.5 text-sm rounded-md text-muted-foreground hover:text-foreground transition-colors">
            <Building2 className="inline h-4 w-4 mr-1.5" />
            Departments
          </button>
          <div className="absolute left-0 top-full mt-1 w-56 bg-popover border rounded-lg shadow-lg py-1 hidden group-hover:block z-50">
            {departments.map(dept => (
              <Link
                key={dept}
                to={`/department/${encodeURIComponent(dept)}`}
                className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent transition-colors"
              >
                {dept}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
