'use client'

import NavBar from "@/app/(user-app)/home/nav-bar";
import {ReactNode} from "react";
import {usePathname} from "next/navigation";

/**
 * 主界面布局文件，提供底部导航栏
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="w-screen md:container flex flex-col min-h-max bg-neutral-50">
      <main className='min-h-max'>
        {children}
      </main>
      {
        pathname.startsWith("/home") ? (
            <NavBar pathPrefix='/home'/>
        ) : null
      }
    </div>
  );
}
