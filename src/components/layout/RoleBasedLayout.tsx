import { ReactNode } from "react";
import { RoleBasedSidebar } from "./RoleBasedSidebar";
import { Header } from "./Header";

interface RoleBasedLayoutProps {
  children: ReactNode;
}

export const RoleBasedLayout = ({ children }: RoleBasedLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <RoleBasedSidebar />
      <div className="flex flex-1 flex-col pl-20 lg:pl-72">
        <Header />
        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  );
};
