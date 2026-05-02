'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Globe, BarChart3, Mail } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { href: '/', label: 'HOME', icon: Home },
  { href: '/map', label: 'MAP EXPLORER', icon: Globe },
  { href: '/rankings', label: 'RANKINGS', icon: BarChart3 },
  { href: '/contact', label: 'CONTACT', icon: Mail },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="h-[60px] my-[10px] mb-[20px] flex justify-between items-start">
      <div className="relative w-[200px] h-[60px]">
        <Link href="/">
          <Image 
            src="/media/logo.png" 
            alt="Geogeek logo" 
            width={200} 
            height={60}
            priority
          />
        </Link>
      </div>
      <nav className="mt-[10px] bg-white rounded-[3px] shadow-sm">
        <ul className="flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            
            return (
              <li key={item.href} className="font-droid font-bold uppercase whitespace-nowrap px-[10px] py-[10px] leading-[18px]">
                <Link 
                  href={item.href}
                  className={cn(
                    "flex items-center gap-[5px] transition-all duration-500",
                    isActive ? "text-geogeek-green" : "text-black hover:text-geogeek-blue"
                  )}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
