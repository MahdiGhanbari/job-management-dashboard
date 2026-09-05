import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
  
        <div className="grid grid-cols-[16rem_1fr] grid-rows-[4rem_1fr] [grid-template-areas:'header_header''sidebar_content'] h-full" >
            <Header className="px-6 py-4 border-b border-gray-200 shadow-xs [grid-area:header]" />

            <Sidebar className="p-4 border-r border-gray-200 shadow-xs [grid-area:sidebar]" />
            <main className="flex-1 p-4 [grid-area:content]">{children}</main>
        </div>
 
    );
}