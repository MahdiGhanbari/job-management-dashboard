import { FaPhoenixFramework, FaSearch } from "react-icons/fa";
import { LuCircleUserRound } from "react-icons/lu";
import { MdAdd, MdOutlineNotificationsNone } from "react-icons/md";

export default function Header({className}: {className?: string}) {

  return <div className={"bg-white flex flex-row justify-between items-center gap-4 " + className}>
    <div className="flex gap-3 items-center">
      <div className="bg-indigo-50 text-indigo-400 p-1 rounded-lg">
        <FaPhoenixFramework size="28" />
      </div>
      <span className="font-bold text-xl">TalentFlow</span>
      </div>

    <div className="flex-1">
      <div className="flex items-center gap-2 w-lg h-[2.2rem] border rounded-lg px-4  border-gray-200 bg-gray-50">
        <FaSearch className="font-light text-gray-400"/>
        <input className="w-full focus:outline-none focus:border-none" placeholder="Search condidates, jobs, or tags ..."/>
      </div>
    </div>

    <button className="p-2 rounded-lg border border-gray-200">
      <MdOutlineNotificationsNone  size="20" className="text-indigo-400"/>
    </button>

    <button className="p-2 rounded-lg border border-gray-200">
      <LuCircleUserRound  size="20" className="text-indigo-400"/>
    </button>

  </div>;
}