import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Compass, Building2 } from "lucide-react";
import { departments, professors } from "@/data/professors";

export function AppHeader() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const totalReviews = professors.reduce((sum, p) => sum + p.totalReviews, 0);

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md flex items-center px-8 sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-3 mr-8">
        <div className="h-9 w-9 rounded-xl gradient-gold flex items-center justify-center">
          <GraduationCap className="h-5 w-5 text-accent-foreground" />
        </div>
        <span className="font-serif text-xl font-bold text-foreground tracking-tight">ProfRate</span>
      </Link>

      <nav className="flex items-center gap-1 flex-1">
        <Link
          to="/"
          className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
            isActive("/")
              ? "bg-primary text-primary-foreground font-medium shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Compass className="inline h-4 w-4 mr-1.5 -mt-0.5" />
          Explore
        </Link>
        <div className="relative group">
          <button className="px-4 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200">
            <Building2 className="inline h-4 w-4 mr-1.5 -mt-0.5" />
            Departments
          </button>
          <div className="absolute left-0 top-full mt-1 w-56 glass-strong rounded-xl py-2 hidden group-hover:block z-50">
            {departments.map(dept => (
              <Link
                key={dept}
                to={`/department/${encodeURIComponent(dept)}`}
                className="block px-4 py-2.5 text-sm text-foreground hover:bg-accent/10 hover:text-accent transition-colors"
              >
                {dept}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="bg-muted px-3 py-1.5 rounded-lg text-xs font-medium">
          {totalReviews} reviews
        </span>
        <span className="hidden md:inline text-xs italic">Built by students, for students.</span>
      </div>
    </header>
  );
}
