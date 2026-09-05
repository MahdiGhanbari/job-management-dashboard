"use client";

import Link from "next/link";
import { FaUserFriends , FaBriefcase, FaCog } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { IconType } from "react-icons";

const ITEMS = [
  {href: '/dashboard', text: 'Dashboard', icon: MdDashboard},
  {href: '/jobs', text: 'Jobs', icon: FaBriefcase},
  {href: '/candidates', text: 'Candidates', icon: FaUserFriends},
  {href: '/settings', text: 'Settings', icon: FaCog}
]

function SidebarItem({ href, icon, text, pathname }: { href: string, icon: IconType, text: string, pathname: string }) {
  const Icon = icon
  const isActive = pathname === href;
  const activeClasses = "text-indigo-400 bg-indigo-50";
  const inactiveClasses = "hover:bg-gray-100 text-gray-500";

  return <li className={clsx("font-semibold rounded-md p-2", isActive ? activeClasses : inactiveClasses)}>
        <Link className="flex justify-start items-center gap-3 select-none" href={href}>
          <span className="text-lg">{<Icon/>}</span> {text}
        </Link>
    </li>;
}

export default function Sidebar({className}: {className?: string}) {
  const pathname = usePathname();
  return <ul className={"flex flex-col gap-2 " + className}>
    {
      ITEMS.map(item=> <SidebarItem key={item.href} pathname={pathname} href={item.href} icon={item.icon} text={item.text} />)
    }
  </ul>;
}