import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;

  isActive: boolean;
  href: string;
};

export const SidebarItem = ({ href, isActive, children }: Props) => {
  return (
    <Link
      href={href}
      className={`text-lg px-4 py-3 hover:bg-stone-100 rounded-full ${
        isActive ? "font-bold" : ""
      }`}
    >
      {children}
    </Link>
  );
};
