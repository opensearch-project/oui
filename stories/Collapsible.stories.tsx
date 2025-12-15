import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components';
import { Button } from '@/components';



const meta: Meta<typeof Collapsible> = {
    title: 'UI/Collapsible',
    component: Collapsible,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A collapsible component that allows content to be expanded and collapsed with smooth animations.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        open: {
            control: { type: 'boolean' },
            description: 'Whether the collapsible is open',
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Whether the collapsible is disabled',
        },
        onOpenChange: {
            action: 'openChanged',
            description: 'Callback fired when the open state changes',
        },
    },
    args: {
        open: false,
        disabled: false,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args: any) => {
        const [isOpen, setIsOpen] = useState(args.open || false);
        
        useEffect(() => {
            setIsOpen(args.open || false);
        }, [args.open]);

        return (
            <div className="oui:w-[350px]">
                <Collapsible open={isOpen} onOpenChange={setIsOpen} disabled={args.disabled}>
                    <div className="oui:flex oui:items-center oui:justify-between oui:space-x-4 oui:px-4">
                        <h4 className="oui:text-sm oui:font-semibold">
                            @peduarte starred 3 repositories
                        </h4>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="oui:w-9 oui:p-0">
                                <ChevronsUpDown className="oui:h-4 oui:w-4 oui:text-foreground" />
                                <span className="oui:sr-only">Toggle</span>
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <div className="oui:rounded-md oui:border oui:px-4 oui:py-3 oui:font-mono oui:text-sm oui:mb-2">
                        @radix-ui/primitives
                    </div>
                    <CollapsibleContent className="oui:space-y-2">
                        <div className="oui:rounded-md oui:border oui:px-4 oui:py-3 oui:font-mono oui:text-sm">
                            @radix-ui/colors
                        </div>
                        <div className="oui:rounded-md oui:border oui:px-4 oui:py-3 oui:font-mono oui:text-sm">
                            @stitches/react
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>
        );
    },
};

export const Navigation: Story = {
    render: (args: any) => {
        const [openSections, setOpenSections] = useState<string[]>(['dashboard']);

        const toggleSection = (section: string) => {
            setOpenSections(prev =>
                prev.includes(section)
                    ? prev.filter(s => s !== section)
                    : [...prev, section]
            );
        };

        const navItems = [
            {
                id: 'dashboard',
                title: 'Dashboard',
                items: ['Overview', 'Analytics', 'Reports']
            },
            {
                id: 'projects',
                title: 'Projects',
                items: ['Active Projects', 'Archived', 'Templates']
            },
            {
                id: 'team',
                title: 'Team',
                items: ['Members', 'Roles', 'Permissions']
            },
            {
                id: 'settings',
                title: 'Settings',
                items: ['General', 'Security', 'Integrations']
            }
        ];

        return (
            <div className="oui:w-[280px] oui:border oui:rounded-lg oui:p-4">
                <h3 className="oui:font-semibold oui:mb-4">Navigation</h3>
                <div className="oui:space-y-2">
                    {navItems.map((section) => (
                        <Collapsible
                            key={section.id}
                            open={openSections.includes(section.id)}
                            onOpenChange={() => toggleSection(section.id)}
                            disabled={args.disabled}
                        >
                            <CollapsibleTrigger className="oui:flex oui:items-center oui:justify-between oui:w-full oui:p-2 oui:text-left oui:hover:bg-accent oui:rounded-md">
                                <span className="oui:font-medium">{section.title}</span>
                                <ChevronsUpDown className="oui:h-4 oui:w-4 oui:text-foreground" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="oui:ml-4 oui:mt-1">
                                <div className="oui:space-y-1">
                                    {section.items.map((item) => (
                                        <button
                                            key={item}
                                            className="oui:block oui:w-full oui:text-left oui:p-2 oui:text-sm oui:text-muted-foreground oui:hover:text-foreground oui:hover:bg-accent oui:rounded-md"
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Navigation menu with collapsible sections for organizing hierarchical content.',
            },
        },
    },
};
