'use client'

import { MenuItem, sidebarMenu } from '@/config/sidebar-utils'; // Import your config
import { BookIcon, ChevronRight, ChevronLeft } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

type Props = {};

const Sidebar = (props: Props) => {
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
    const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true); // State for toggling sidebar
    const pathname = usePathname();

    const toggleSection = (sectionId: string) => {
        if (!isSidebarExpanded) return; // Don't allow expanding when sidebar is collapsed

        setExpandedSections(prev => {
            const newExpandedSections = new Set(prev);
            if (newExpandedSections.has(sectionId)) {
                newExpandedSections.delete(sectionId);
            } else {
                newExpandedSections.add(sectionId);
            }
            return newExpandedSections;
        });
    };

    const isExpanded = (sectionId: string) => {
        return expandedSections.has(sectionId);
    };

    const isActive = (item: MenuItem) => {
        return item.href === pathname; // Check if the item's href matches the current path
    };

    // Recursively find all parent sections of an active item
    const getParentSections = (items: MenuItem[], activePaths: Set<string>): Set<string> => {
        let parents = new Set<string>();

        const findParents = (items: MenuItem[]) => {
            items.forEach(item => {
                if (item.nested) {
                    if (item.nested.some(nestedItem => activePaths.has(nestedItem.href))) {
                        parents.add(item.id);
                        findParents(item.nested);
                    }
                }
            });
        };

        findParents(items);
        return parents;
    };

    // Initialize the expandedSections state
    useEffect(() => {
        if (!isSidebarExpanded) return; // Don't expand any sections if sidebar is collapsed
        const activePaths = new Set<string>([pathname]);
        const parentSections = getParentSections(sidebarMenu, activePaths);
        setExpandedSections(prev => {
            const prevArray = Array.from(prev);
            const parentsArray = Array.from(parentSections);
            return new Set([...prevArray, ...parentsArray]);
        });
    }, [pathname, isSidebarExpanded]);

    const renderMenuItems = (items: MenuItem[], level = 0) => {
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
                        {/* Conditionally hide the text and chevron in collapsed mode */}
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
    };

    return (
        <aside className={`h-svh border-r bg-background sticky top-0 transition-all duration-300 ${isSidebarExpanded ? 'lg:w-80 w-80' : 'lg:w-20 w-20'
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
                    {isSidebarExpanded &&

                        <div className="text-lg">Neev</div>

                    } </Link>
                {/* Toggle Button */}
                <button
                    onClick={() => {
                        setIsSidebarExpanded(prev => !prev);
                        setExpandedSections(new Set()); // Collapse all sections when toggling off
                    }}
                    className="absolute z-50 flex justify-center items-center top-96 z-50 w-8 h-8 -right-0 bg-white border p-1 rounded-full hover:bg-gray-400 transition-all"
                    style={{
                        transform: 'translateX(50%)', // Half inside, half outside the sidebar
                    }}
                >
                    {isSidebarExpanded ? <ChevronLeft className="" /> : <ChevronRight className="" />}
                </button>
                <nav className="flex-1 w-full pt-10">
                    <ul className="grid gap-2 text-sm font-medium">
                        {renderMenuItems(sidebarMenu)}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
