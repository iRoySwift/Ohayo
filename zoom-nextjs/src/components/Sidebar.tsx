"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {}
const Sidebar: React.FC<Props> = () => {
    const pathname = usePathname();
    return (
        <div className="flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
            <div className="flex flex-1 flex-col gap-6">
                {sidebarLinks.map(link => {
                    const isActive = pathname === link.route;
                    return (
                        <Link
                            key={link.route}
                            href={link.route}
                            className={cn(
                                "flex items-center justify-start gap-4 rounded-lg p-4",
                                {
                                    "bg-blue-1": isActive,
                                }
                            )}>
                            <Image
                                src={link.imageUrl}
                                width={24}
                                height={24}
                                alt={link.label}
                            />
                            <p className="text-lg font-semibold max-lg:hidden">
                                {link.label}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
export default Sidebar;
