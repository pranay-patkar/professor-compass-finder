import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Compass, Building2 } from "lucide-react";
import { departments, professors } from "@/data/professors";

export function AppHeader() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const totalReviews = professors.reduce((sum, p) => sum + p.totalReviews, 0);

  return (
    <header className="h-12 border-b-3 border-foreground bg-card flex items-center px-4 sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 mr-6">
        <GraduationCap className="h-5 w-5 text-primary" />
        <span className="font-display text-foreground text-sm tracking-tight uppercase">ProfRate</span>
      </Link>

      <nav className="flex items-center gap-0.5 flex-1">
        <Link
          to="/"
          className={`px-2.5 py-1 text-xs uppercase tracking-wider border-2 transition-colors ${
            isActive("/")
              ? "border-foreground bg-foreground text-background font-bold"
              : "border-transparent text-muted-foreground hover:text-foreground hover:border-foreground"
          }`}
        >
          <Compass className="inline h-3.5 w-3.5 mr-1" />
          Explore
        </Link>
        <div className="relative group">
          <button className="px-2.5 py-1 text-xs uppercase tracking-wider border-2 border-transparent text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">
            <Building2 className="inline h-3.5 w-3.5 mr-1" />
            Depts
          </button>
          <div className="absolute left-0 top-full mt-0 w-52 bg-card border-2 border-foreground shadow-[4px_4px_0_hsl(var(--foreground))] py-0.5 hidden group-hover:block z-50">
            {departments.map(dept => (
              <Link
                key={dept}
                to={`/department/${encodeURIComponent(dept)}`}
                className="block px-3 py-1.5 text-xs text-foreground hover:bg-primary hover:text-primary-foreground transition-colors uppercase tracking-wide"
              >
                {dept}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="flex items-center gap-3 text-2xs text-muted-foreground uppercase tracking-wider">
        <span className="border border-border px-2 py-0.5">
          📊 {totalReviews} reviews logged
        </span>
        <span className="hidden md:inline">Built by students, for students.</span>
      </div>
    </header>
  );
}
