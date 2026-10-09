import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from 'sonner';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" dir='ltr' className={cn("font-sans", geist.variable)}>
            <body className="h-screen">
               {children}
               <Toaster />
            </body>
        </html>
    );
}