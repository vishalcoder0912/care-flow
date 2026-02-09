import { Bell, Search, User, Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { user, role, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const [notifications] = useState([
    { id: 1, title: "New appointment", message: "Dr. Smith has a new appointment", time: "5m ago", unread: true },
    { id: 2, title: "Lab results ready", message: "Patient John Doe's lab results are ready", time: "1h ago", unread: true },
    { id: 3, title: "Emergency alert", message: "New emergency patient admitted", time: "2h ago", unread: false },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";
  const initials = displayName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const roleLabel = role ? role.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "User";

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-background/95 px-8 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden h-12 w-12" onClick={onMenuClick} aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </Button>
        <div className="search-input hidden w-96 md:flex">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input type="text" placeholder="Search patients, doctors, appointments..." className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground/60" aria-label="Search" />
          <kbd className="hidden rounded-lg bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground sm:inline">⌘K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-xl" aria-label="Notifications">
              <Bell className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[11px] font-bold text-destructive-foreground animate-pulse">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-96 bg-popover border border-border shadow-xl">
            <DropdownMenuLabel className="flex items-center justify-between px-4 py-3">
              <span className="text-base font-semibold">Notifications</span>
              <Badge variant="secondary" className="text-xs font-semibold">{unreadCount} new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1.5 p-4 cursor-pointer">
                <div className="flex w-full items-center justify-between">
                  <span className="font-semibold text-foreground">{notification.title}</span>
                  {notification.unread && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
                </div>
                <span className="text-sm text-muted-foreground">{notification.message}</span>
                <span className="text-xs text-muted-foreground/70">{notification.time}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary font-semibold py-3">View all notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 px-3 h-14 rounded-xl">
              <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">{initials}</AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="text-sm font-semibold text-foreground">{displayName}</p>
                <p className="text-xs text-muted-foreground">{roleLabel}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 bg-popover border border-border shadow-xl">
            <DropdownMenuLabel className="px-4 py-3">
              <p className="font-semibold">{displayName}</p>
              <p className="text-sm text-muted-foreground font-normal">{user?.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="px-4 py-3 cursor-pointer" onClick={() => navigate("/settings")}>
              <User className="mr-3 h-5 w-5" />
              <span className="font-medium">Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-3 cursor-pointer" onClick={() => navigate("/settings")}>
              <span className="font-medium">Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="px-4 py-3 text-destructive cursor-pointer font-medium" onClick={handleLogout}>
              <LogOut className="mr-3 h-5 w-5" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
