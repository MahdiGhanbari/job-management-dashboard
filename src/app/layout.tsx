import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body className="h-screen">
                <div className="grid grid-cols-[10rem_auto] grid-rows-[4rem_auto] [grid-template-areas:'header_header''sidebar_content'] h-full" >
                    <Header className="p-4 border-b border-gray-200 shadow-xs [grid-area:header]" />

                    <Sidebar className=" p-4 border-r border-gray-200 shadow-xs [grid-area:sidebar]" />
                    <main className="flex-1 p-4 [grid-area:content]">{children}</main>
                </div>
            </body>
        </html>
    );
}