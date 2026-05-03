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

const navItems =[
  { href: '/', label: 'HOME', icon: Home },
  { href: '/map', label: 'EXPLORER', icon: Globe },
  { href: '/rankings', label: 'RANKINGS', icon: BarChart3 },
  { href: '/contact', label: 'CONTACT', icon: Mail },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="h-[80px] my-6 flex justify-between items-center card !py-0 !px-8">
      <Link href="/" className="flex-shrink-0 hover:scale-105 transition-transform duration-300">
        <Image 
          src="/media/logo.png" 
          alt="Geogeek logo" 
          width={150} 
          height={45}
          className="object-contain"
          priority
        />
      </Link>
      <nav className="h-full flex items-center">
        <ul className="flex gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            
            return (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className={cn(
                    "flex items-center gap-[6px] px-5 py-2.5 rounded-full font-oswald font-bold tracking-widest text-[13px] transition-all duration-300",
                    isActive 
                      ? "bg-primary text-white shadow-[0_4px_10px_rgba(0,168,181,0.3)]" 
                      : "text-gray-500 hover:text-primary hover:bg-primary/10"
                  )}
                >
                  <Icon size={16} className={isActive ? "text-white" : "text-gray-400"} />
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
