/**
 * VoteNavbar — Shared navbar for inner pages (Vote, Results, etc.)
 * Reuses the same design language as the landing page navbar.
 */

import { Link } from "react-router-dom";
import { Vote } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Vote", to: "/vote" },
  { label: "Results", to: "#results" },
  { label: "Admin", to: "#admin" },
] as const;

export function VoteNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Vote className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            Voting <span className="web3-gradient-text">System</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
          <Link to="/login">Sign In</Link>
        </Button>
      </div>
    </nav>
  );
}
