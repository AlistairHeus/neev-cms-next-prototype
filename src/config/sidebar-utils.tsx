// sidebarConfig.ts
import {
    ActivityIcon,
    BookDashed,
    BookOpenCheck,
    CheckIcon,
    ClipboardPlus,
    FilePenIcon,
    FolderKanban,
    LayoutGridIcon,
    SettingsIcon,
    User,
    Users
} from "lucide-react";
export type MenuItem = {
    id: string;
    title: string;
    href: string;
    icon: React.ReactNode;
    nested?: MenuItem[];
    active?: boolean; // Optional property to indicate if the item is active
};
export const sidebarMenu: MenuItem[] = [
    {
        id: 'home',
        title: 'Dashboard',
        href: '#',
        icon: <LayoutGridIcon className="h-5 w-5" />
    },
    {
        id: 'users',
        title: 'Users',
        href: '#',
        icon: <User className="h-5 w-5" />,
        nested: [
            {
                id: 'admins',
                title: 'Admins',
                href: '#',
                icon: <User className="h-5 w-5" />
            },
            {
                id: 'academics',
                title: 'Academics',
                href: '#',
                icon: <ActivityIcon className="h-5 w-5" />,
                nested: [
                    {
                        id: 'facilitators',
                        title: 'Facilitators',
                        href: '#',
                        icon: <ActivityIcon className="h-5 w-5" />
                    },
                    {
                        id: 'implementors',
                        title: 'Implementors',
                        href: '#',
                        icon: <ActivityIcon className="h-5 w-5" />
                    }
                ]
            },
            {
                id: 'content',
                title: 'Content',
                href: '#',
                icon: <FilePenIcon className="h-5 w-5" />,
                nested: [
                    {
                        id: 'creator',
                        title: 'Creator',
                        href: '#',
                        icon: <FilePenIcon className="h-5 w-5" />
                    },
                    {
                        id: 'reviewer',
                        title: 'Reviewer',
                        href: '#',
                        icon: <FilePenIcon className="h-5 w-5" />
                    }
                ]
            },
            {
                id: 'evaluators',
                title: 'Evaluators',
                href: '#',
                icon: <CheckIcon className="h-5 w-5" />
            }
        ]
    },
    {
        id: "teams",
        title: "Teams",
        href: "/teams",
         icon: <Users className="w-5 h-5"/>,
         nested: [
            {
                id: 'content-team',
                title: 'Content',
                href: '#',
                icon: <FilePenIcon className="h-5 w-5" />
    
            },
           
        ] 
    },
    {
        id: 'Assessments',
        title: 'Assessments',
        href: '/assessments',
        icon: <BookOpenCheck className="h-5 w-5" />,
        nested: [
            {
                id: 'assemble-assessment',
                title: 'Assemble',
                href: '/assessments/assemble-assessment',
                icon: <ClipboardPlus className="h-5 w-5" />
            },
            {
                id: 'drafts',
                title: 'Drafts',
                href: '#',
                icon: <BookDashed className="h-5 w-5" />
            },
            {
                id: 'published-asessment',
                title: 'Published',
                href: '#',
                icon: <FolderKanban className="h-5 w-5" />
            },
            {
                id: 'review-asessment',
                title: 'Review',
                href: '#',
                icon: <FolderKanban className="h-5 w-5" />
            },
            
        ]

    },
    {
        id: 'settings',
        title: 'Settings',
        href: '#',
        icon: <SettingsIcon className="h-5 w-5" />
    }
]; 