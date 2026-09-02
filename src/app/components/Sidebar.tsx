import Link from "next/link";
import { FaUserFriends , FaBriefcase, FaCog } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

function SidebarItem({ href, icon, text }: { href: string, icon: React.ReactNode, text: string }) {
  return <li className="hover:bg-gray-100 rounded-md p-2">
        <Link className="flex justify-start items-center gap-2 text-gray-700" href={href}>{icon} {text}</Link>
    </li>;
}

export default function Sidebar({className}: {className?: string}) {
  return <ul className={"flex flex-col gap-2 " + className}>
    <SidebarItem href="/dashboard" icon={<MdDashboard/>} text="Dashboard" />
    <SidebarItem href="/jobs" icon={<FaBriefcase/>} text="Jobs" />
    <SidebarItem href="/candidates" icon={<FaUserFriends/>} text="Candidates" />
    <SidebarItem href="/settings" icon={<FaCog/>} text="Settings" />
  </ul>;
}