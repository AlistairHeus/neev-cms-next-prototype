'use client'

import React from 'react';
import { MenuItem, sidebarMenu } from '@/config/sidebar-utils';
import { BookIcon, ChevronRight, ChevronLeft } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback, useMemo } from 'react';

type Props = {};

const Sidebar = React.memo((props: Props) => {
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
    const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);
    const pathname = usePathname();

    const toggleSection = useCallback((sectionId: string) => {
        if (!isSidebarExpanded) return;
        setExpandedSections(prev => {
            const newExpandedSections = new Set(prev);
            if (newExpandedSections.has(sectionId)) {
                newExpandedSections.delete(sectionId);
            } else {
                newExpandedSections.add(sectionId);
            }
            return newExpandedSections;
        });
    }, [isSidebarExpanded]);

    const isExpanded = useCallback((sectionId: string) => expandedSections.has(sectionId), [expandedSections]);

    const isActive = useCallback((item: MenuItem) => item.href === pathname, [pathname]);

    const getParentSections = useCallback((items: MenuItem[], activePaths: Set<string>): Set<string> => {
        let parents = new Set<string>();
        const findParents = (items: MenuItem[]) => {
            items.forEach(item => {
                if (item.nested && item.nested.some(nestedItem => activePaths.has(nestedItem.href))) {
                    parents.add(item.id);
                    findParents(item.nested);
                }
            });
        };
        findParents(items);
        return parents;
    }, []);

    useEffect(() => {
        if (!isSidebarExpanded) return;
        const activePaths = new Set<string>([pathname]);
        const parentSections = getParentSections(sidebarMenu, activePaths);
        setExpandedSections(prev => new Set([...Array.from(prev), ...Array.from(parentSections)]));
    }, [pathname, isSidebarExpanded, getParentSections]);

    const renderMenuItems = useCallback((items: MenuItem[], level = 0) => {
        return items.map(item => (
            <li key={item.id} className={`relative ${level > 0 ? 'pl-4' : ''}`}>
                <div>
                    <Link
                        href={item.href}
                        className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${item.nested ? 'cursor-pointer' : ''
                            } ${isActive(item) ? 'text-black bg-gray-100' : 'text-gray-600 hover:bg-gray-200'
                            }`}
                        onClick={item.nested ? (e) => {
                            e.preventDefault();
                            toggleSection(item.id);
                        } : undefined}
                    >
                        {item.icon}
                        {isSidebarExpanded && <span>{item.title}</span>}
                        {item.nested && isSidebarExpanded && (
                            <span
                                className={`ml-auto ${isExpanded(item.id) ? 'rotate-90' : ''} transition-transform`}
                            >
                                <ChevronRight />
                            </span>
                        )}
                    </Link>
                    {item.nested && isExpanded(item.id) && isSidebarExpanded && (
                        <ul className={`ml-${level + 1} grid gap-2 text-sm font-medium`}>
                            {renderMenuItems(item.nested, level + 1)}
                        </ul>
                    )}
                </div>
            </li>
        ));
    }, [isActive, isExpanded, isSidebarExpanded, toggleSection]);

    return (
        <aside className={`h-svh border-l-0 border bg-background sticky top-0 transition-all duration-300 ${isSidebarExpanded ? 'lg:w-80 w-80' : 'lg:w-20 w-20'
            }`}>
            <div className="flex flex-col items-center gap-4 px-4 py-6 relative">
                <Link
                    href="#"
                    prefetch={false}
                    className='flex justify-center gap-2 items-center w-full'
                >
                    <div className='p-2 rounded-full bg-foreground'>
                        <BookIcon className="h-5 w-5 text-background" />
                    </div>
                    {isSidebarExpanded && <div className="text-lg">Neev</div>}
                </Link>
                <button
                    onClick={() => {
                        setIsSidebarExpanded(prev => !prev);
                        setExpandedSections(new Set());
                    }}
                    className="absolute z-50 flex justify-center items-center top-96 w-8 h-8 -right-0 bg-white border p-1 rounded-full hover:bg-gray-400 transition-all"
                    style={{ transform: 'translateX(50%)' }}
                >
                    {isSidebarExpanded ? <ChevronLeft /> : <ChevronRight />}
                </button>
                <nav className="flex-1 w-full pt-10">
                    <ul className="grid gap-2 text-sm font-medium">
                        {renderMenuItems(sidebarMenu)}
                    </ul>
                </nav>
            </div>
        </aside>
    );
});

export default Sidebar;
