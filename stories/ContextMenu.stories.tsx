import type { Meta, StoryObj } from '@storybook/react';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuCheckboxItem,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuLabel,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
} from '@/components';
import { 
    Copy, 
    Scissors, 
    ClipboardPaste, 
    Edit, 
    Trash2, 
    Download, 
    Share, 
    Star, 
    Archive,
    MoreHorizontal,
    FileText,
    Video,
    Music,
    Settings,
    User,
    Mail,
    Phone,
    Calendar,
    Clock,
    Bookmark,
    Tag,
    Filter,
    ArrowUpAZ,
    ArrowDownAZ,
    Grid3X3,
    List,
    Eye,
    EyeOff
} from 'lucide-react';

const meta: Meta<typeof ContextMenu> = {
    title: 'UI/ContextMenu',
    component: ContextMenu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onOpenChange: {
            action: 'openChanged',
            description: 'Callback when the context menu open state changes',
        },
        modal: {
            control: { type: 'boolean' },
            description: 'Whether the context menu is modal',
            table: {
                defaultValue: { summary: 'true' },
            },
        },
    },
    args: {
        modal: true,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <div className="oui:flex oui:h-[200px] oui:w-[300px] oui:items-center oui:justify-center oui:rounded-md oui:border oui:border-dashed oui:text-sm">
            <ContextMenu>
                <ContextMenuTrigger className="oui:flex oui:h-full oui:w-full oui:items-center oui:justify-center">
                    Right click here
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem>
                        <Copy className="oui:mr-2 oui:h-4 oui:w-4" />
                        Copy
                        <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem>
                        <Scissors className="oui:mr-2 oui:h-4 oui:w-4" />
                        Cut
                        <ContextMenuShortcut>⌘X</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem>
                        <ClipboardPaste className="oui:mr-2 oui:h-4 oui:w-4" />
                        Paste
                        <ContextMenuShortcut>⌘V</ContextMenuShortcut>
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A basic context menu with common actions like copy, cut, and paste.',
            },
        },
    },
};

export const WithSeparators: Story = {
    render: () => (
        <div className="oui:flex oui:h-[200px] oui:w-[300px] oui:items-center oui:justify-center oui:rounded-md oui:border oui:border-dashed oui:text-sm">
            <ContextMenu>
                <ContextMenuTrigger className="oui:flex oui:h-full oui:w-full oui:items-center oui:justify-center">
                    Right click for file actions
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem>
                        <Edit className="oui:mr-2 oui:h-4 oui:w-4" />
                        Edit
                        <ContextMenuShortcut>⌘E</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem>
                        <Copy className="oui:mr-2 oui:h-4 oui:w-4" />
                        Duplicate
                        <ContextMenuShortcut>⌘D</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>
                        <Download className="oui:mr-2 oui:h-4 oui:w-4" />
                        Download
                    </ContextMenuItem>
                    <ContextMenuItem>
                        <Share className="oui:mr-2 oui:h-4 oui:w-4" />
                        Share
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>
                        <Archive className="oui:mr-2 oui:h-4 oui:w-4" />
                        Archive
                    </ContextMenuItem>
                    <ContextMenuItem variant="destructive">
                        <Trash2 className="oui:mr-2 oui:h-4 oui:w-4" />
                        Delete
                        <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A context menu with separators to group related actions.',
            },
        },
    },
};

export const WithCheckboxItems: Story = {
    render: () => (
        <div className="oui:flex oui:h-[200px] oui:w-[300px] oui:items-center oui:justify-center oui:rounded-md oui:border oui:border-dashed oui:text-sm">
            <ContextMenu>
                <ContextMenuTrigger className="oui:flex oui:h-full oui:w-full oui:items-center oui:justify-center">
                    Right click for view options
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuLabel>View Options</ContextMenuLabel>
                    <ContextMenuSeparator />
                    <ContextMenuCheckboxItem checked>
                        <Eye className="oui:mr-2 oui:h-4 oui:w-4" />
                        Show Preview
                    </ContextMenuCheckboxItem>
                    <ContextMenuCheckboxItem>
                        <Grid3X3 className="oui:mr-2 oui:h-4 oui:w-4" />
                        Grid View
                    </ContextMenuCheckboxItem>
                    <ContextMenuCheckboxItem checked>
                        <List className="oui:mr-2 oui:h-4 oui:w-4" />
                        List View
                    </ContextMenuCheckboxItem>
                    <ContextMenuSeparator />
                    <ContextMenuCheckboxItem>
                        <Bookmark className="oui:mr-2 oui:h-4 oui:w-4" />
                        Show Bookmarks
                    </ContextMenuCheckboxItem>
                    <ContextMenuCheckboxItem checked>
                        <Tag className="oui:mr-2 oui:h-4 oui:w-4" />
                        Show Tags
                    </ContextMenuCheckboxItem>
                </ContextMenuContent>
            </ContextMenu>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A context menu with checkbox items for toggling view options.',
            },
        },
    },
};

export const WithRadioGroup: Story = {
    render: () => (
        <div className="oui:flex oui:h-[200px] oui:w-[300px] oui:items-center oui:justify-center oui:rounded-md oui:border oui:border-dashed oui:text-sm">
            <ContextMenu>
                <ContextMenuTrigger className="oui:flex oui:h-full oui:w-full oui:items-center oui:justify-center">
                    Right click for sort options
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuLabel>Sort By</ContextMenuLabel>
                    <ContextMenuSeparator />
                    <ContextMenuRadioGroup value="name">
                        <ContextMenuRadioItem value="name">
                            <FileText className="oui:mr-2 oui:h-4 oui:w-4" />
                            Name
                        </ContextMenuRadioItem>
                        <ContextMenuRadioItem value="date">
                            <Calendar className="oui:mr-2 oui:h-4 oui:w-4" />
                            Date Modified
                        </ContextMenuRadioItem>
                        <ContextMenuRadioItem value="size">
                            <Archive className="oui:mr-2 oui:h-4 oui:w-4" />
                            File Size
                        </ContextMenuRadioItem>
                        <ContextMenuRadioItem value="type">
                            <Filter className="oui:mr-2 oui:h-4 oui:w-4" />
                            File Type
                        </ContextMenuRadioItem>
                    </ContextMenuRadioGroup>
                    <ContextMenuSeparator />
                    <ContextMenuRadioGroup value="asc">
                        <ContextMenuRadioItem value="asc">
                            <ArrowUpAZ className="oui:mr-2 oui:h-4 oui:w-4" />
                            Ascending
                        </ContextMenuRadioItem>
                        <ContextMenuRadioItem value="desc">
                            <ArrowDownAZ className="oui:mr-2 oui:h-4 oui:w-4" />
                            Descending
                        </ContextMenuRadioItem>
                    </ContextMenuRadioGroup>
                </ContextMenuContent>
            </ContextMenu>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A context menu with radio groups for selecting sort options.',
            },
        },
    },
};

export const WithSubmenus: Story = {
    render: () => (
        <div className="oui:flex oui:h-[200px] oui:w-[300px] oui:items-center oui:justify-center oui:rounded-md oui:border oui:border-dashed oui:text-sm">
            <ContextMenu>
                <ContextMenuTrigger className="oui:flex oui:h-full oui:w-full oui:items-center oui:justify-center">
                    Right click for nested menus
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem>
                        <Edit className="oui:mr-2 oui:h-4 oui:w-4" />
                        Edit
                    </ContextMenuItem>
                    <ContextMenuSub>
                        <ContextMenuSubTrigger>
                            <Share className="oui:mr-2 oui:h-4 oui:w-4" />
                            Share
                        </ContextMenuSubTrigger>
                        <ContextMenuSubContent>
                            <ContextMenuItem>
                                <Mail className="oui:mr-2 oui:h-4 oui:w-4" />
                                Email
                            </ContextMenuItem>
                            <ContextMenuItem>
                                <Copy className="oui:mr-2 oui:h-4 oui:w-4" />
                                Copy Link
                            </ContextMenuItem>
                            <ContextMenuItem>
                                <Download className="oui:mr-2 oui:h-4 oui:w-4" />
                                Export
                            </ContextMenuItem>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuSub>
                        <ContextMenuSubTrigger>
                            <MoreHorizontal className="oui:mr-2 oui:h-4 oui:w-4" />
                            More Actions
                        </ContextMenuSubTrigger>
                        <ContextMenuSubContent>
                            <ContextMenuItem>
                                <Star className="oui:mr-2 oui:h-4 oui:w-4" />
                                Add to Favorites
                            </ContextMenuItem>
                            <ContextMenuItem>
                                <Archive className="oui:mr-2 oui:h-4 oui:w-4" />
                                Archive
                            </ContextMenuItem>
                            <ContextMenuItem>
                                <Settings className="oui:mr-2 oui:h-4 oui:w-4" />
                                Properties
                            </ContextMenuItem>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuSeparator />
                    <ContextMenuItem variant="destructive">
                        <Trash2 className="oui:mr-2 oui:h-4 oui:w-4" />
                        Delete
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A context menu with nested submenus for organizing complex actions.',
            },
        },
    },
};

export const FileExplorer: Story = {
    render: () => (
        <div className="oui:flex oui:h-[200px] oui:w-[300px] oui:items-center oui:justify-center oui:rounded-md oui:border oui:border-dashed oui:text-sm">
            <ContextMenu>
                <ContextMenuTrigger className="oui:flex oui:h-full oui:w-full oui:items-center oui:justify-center">
                    Right click for file operations
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem>
                        <FileText className="oui:mr-2 oui:h-4 oui:w-4" />
                        Open
                        <ContextMenuShortcut>⌘O</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem>
                        <Edit className="oui:mr-2 oui:h-4 oui:w-4" />
                        Open With...
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>
                        <Copy className="oui:mr-2 oui:h-4 oui:w-4" />
                        Copy
                        <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem>
                        <Scissors className="oui:mr-2 oui:h-4 oui:w-4" />
                        Cut
                        <ContextMenuShortcut>⌘X</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem>
                        <Copy className="oui:mr-2 oui:h-4 oui:w-4" />
                        Duplicate
                        <ContextMenuShortcut>⌘D</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>
                        <Download className="oui:mr-2 oui:h-4 oui:w-4" />
                        Download
                    </ContextMenuItem>
                    <ContextMenuItem>
                        <Share className="oui:mr-2 oui:h-4 oui:w-4" />
                        Share
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>
                        <Star className="oui:mr-2 oui:h-4 oui:w-4" />
                        Add to Favorites
                    </ContextMenuItem>
                    <ContextMenuItem>
                        <Archive className="oui:mr-2 oui:h-4 oui:w-4" />
                        Move to Archive
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>
                        <Settings className="oui:mr-2 oui:h-4 oui:w-4" />
                        Properties
                        <ContextMenuShortcut>⌘I</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem variant="destructive">
                        <Trash2 className="oui:mr-2 oui:h-4 oui:w-4" />
                        Move to Trash
                        <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A comprehensive file explorer context menu with all common file operations.',
            },
        },
    },
};

export const MediaPlayer: Story = {
    render: () => (
        <div className="oui:flex oui:h-[200px] oui:w-[300px] oui:items-center oui:justify-center oui:rounded-md oui:border oui:border-dashed oui:text-sm">
            <ContextMenu>
                <ContextMenuTrigger className="oui:flex oui:h-full oui:w-full oui:items-center oui:justify-center">
                    Right click for media controls
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem>
                        <Music className="oui:mr-2 oui:h-4 oui:w-4" />
                        Play
                        <ContextMenuShortcut>Space</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem>
                        <Clock className="oui:mr-2 oui:h-4 oui:w-4" />
                        Pause
                        <ContextMenuShortcut>Space</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuSub>
                        <ContextMenuSubTrigger>
                            <Settings className="oui:mr-2 oui:h-4 oui:w-4" />
                            Playback Speed
                        </ContextMenuSubTrigger>
                        <ContextMenuSubContent>
                            <ContextMenuRadioGroup value="1x">
                                <ContextMenuRadioItem value="0.5x">0.5x</ContextMenuRadioItem>
                                <ContextMenuRadioItem value="0.75x">0.75x</ContextMenuRadioItem>
                                <ContextMenuRadioItem value="1x">Normal</ContextMenuRadioItem>
                                <ContextMenuRadioItem value="1.25x">1.25x</ContextMenuRadioItem>
                                <ContextMenuRadioItem value="1.5x">1.5x</ContextMenuRadioItem>
                                <ContextMenuRadioItem value="2x">2x</ContextMenuRadioItem>
                            </ContextMenuRadioGroup>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuSub>
                        <ContextMenuSubTrigger>
                            <Video className="oui:mr-2 oui:h-4 oui:w-4" />
                            Quality
                        </ContextMenuSubTrigger>
                        <ContextMenuSubContent>
                            <ContextMenuRadioGroup value="720p">
                                <ContextMenuRadioItem value="480p">480p</ContextMenuRadioItem>
                                <ContextMenuRadioItem value="720p">720p HD</ContextMenuRadioItem>
                                <ContextMenuRadioItem value="1080p">1080p Full HD</ContextMenuRadioItem>
                                <ContextMenuRadioItem value="4k">4K Ultra HD</ContextMenuRadioItem>
                            </ContextMenuRadioGroup>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuSeparator />
                    <ContextMenuCheckboxItem checked>
                        <Eye className="oui:mr-2 oui:h-4 oui:w-4" />
                        Show Controls
                    </ContextMenuCheckboxItem>
                    <ContextMenuCheckboxItem>
                        <EyeOff className="oui:mr-2 oui:h-4 oui:w-4" />
                        Picture in Picture
                    </ContextMenuCheckboxItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>
                        <Download className="oui:mr-2 oui:h-4 oui:w-4" />
                        Download
                    </ContextMenuItem>
                    <ContextMenuItem>
                        <Share className="oui:mr-2 oui:h-4 oui:w-4" />
                        Share
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A media player context menu with playback controls and quality settings.',
            },
        },
    },
};

export const ContactCard: Story = {
    render: () => (
        <div className="oui:flex oui:h-[200px] oui:w-[300px] oui:items-center oui:justify-center oui:rounded-md oui:border oui:border-dashed oui:text-sm">
            <ContextMenu>
                <ContextMenuTrigger className="oui:flex oui:h-full oui:w-full oui:items-center oui:justify-center">
                    Right click for contact actions
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem>
                        <User className="oui:mr-2 oui:h-4 oui:w-4" />
                        View Profile
                    </ContextMenuItem>
                    <ContextMenuItem>
                        <Edit className="oui:mr-2 oui:h-4 oui:w-4" />
                        Edit Contact
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>
                        <Mail className="oui:mr-2 oui:h-4 oui:w-4" />
                        Send Email
                    </ContextMenuItem>
                    <ContextMenuItem>
                        <Phone className="oui:mr-2 oui:h-4 oui:w-4" />
                        Call
                    </ContextMenuItem>
                    <ContextMenuItem>
                        <Calendar className="oui:mr-2 oui:h-4 oui:w-4" />
                        Schedule Meeting
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>
                        <Star className="oui:mr-2 oui:h-4 oui:w-4" />
                        Add to Favorites
                    </ContextMenuItem>
                    <ContextMenuItem>
                        <Tag className="oui:mr-2 oui:h-4 oui:w-4" />
                        Add Tag
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>
                        <Share className="oui:mr-2 oui:h-4 oui:w-4" />
                        Share Contact
                    </ContextMenuItem>
                    <ContextMenuItem variant="destructive">
                        <Trash2 className="oui:mr-2 oui:h-4 oui:w-4" />
                        Delete Contact
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A contact card context menu with communication and management options.',
            },
        },
    },
};

export const DisabledItems: Story = {
    render: () => (
        <div className="oui:flex oui:h-[200px] oui:w-[300px] oui:items-center oui:justify-center oui:rounded-md oui:border oui:border-dashed oui:text-sm">
            <ContextMenu>
                <ContextMenuTrigger className="oui:flex oui:h-full oui:w-full oui:items-center oui:justify-center">
                    Right click for mixed states
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem>
                        <Copy className="oui:mr-2 oui:h-4 oui:w-4" />
                        Copy
                        <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem disabled>
                        <Scissors className="oui:mr-2 oui:h-4 oui:w-4" />
                        Cut
                        <ContextMenuShortcut>⌘X</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem disabled>
                        <ClipboardPaste className="oui:mr-2 oui:h-4 oui:w-4" />
                        Paste
                        <ContextMenuShortcut>⌘V</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>
                        <Edit className="oui:mr-2 oui:h-4 oui:w-4" />
                        Edit
                    </ContextMenuItem>
                    <ContextMenuItem disabled>
                        <Share className="oui:mr-2 oui:h-4 oui:w-4" />
                        Share
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem variant="destructive" disabled>
                        <Trash2 className="oui:mr-2 oui:h-4 oui:w-4" />
                        Delete
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A context menu showing disabled items for unavailable actions.',
            },
        },
    },
};

export const Showcase: Story = {
    render: () => (
        <div className="oui:grid oui:grid-cols-2 oui:gap-4">
            <div className="oui:flex oui:h-[150px] oui:w-[200px] oui:items-center oui:justify-center oui:rounded-md oui:border oui:border-dashed oui:text-sm">
                <ContextMenu>
                    <ContextMenuTrigger className="oui:flex oui:h-full oui:w-full oui:items-center oui:justify-center">
                        Basic Menu
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem>
                            <Copy className="oui:mr-2 oui:h-4 oui:w-4" />
                            Copy
                        </ContextMenuItem>
                        <ContextMenuItem>
                            <Edit className="oui:mr-2 oui:h-4 oui:w-4" />
                            Edit
                        </ContextMenuItem>
                        <ContextMenuItem variant="destructive">
                            <Trash2 className="oui:mr-2 oui:h-4 oui:w-4" />
                            Delete
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            </div>

            <div className="oui:flex oui:h-[150px] oui:w-[200px] oui:items-center oui:justify-center oui:rounded-md oui:border oui:border-dashed oui:text-sm">
                <ContextMenu>
                    <ContextMenuTrigger className="oui:flex oui:h-full oui:w-full oui:items-center oui:justify-center">
                        With Separators
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem>
                            <Edit className="oui:mr-2 oui:h-4 oui:w-4" />
                            Edit
                        </ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem>
                            <Share className="oui:mr-2 oui:h-4 oui:w-4" />
                            Share
                        </ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem variant="destructive">
                            <Trash2 className="oui:mr-2 oui:h-4 oui:w-4" />
                            Delete
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            </div>

            <div className="oui:flex oui:h-[150px] oui:w-[200px] oui:items-center oui:justify-center oui:rounded-md oui:border oui:border-dashed oui:text-sm">
                <ContextMenu>
                    <ContextMenuTrigger className="oui:flex oui:h-full oui:w-full oui:items-center oui:justify-center">
                        With Checkboxes
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuCheckboxItem checked>
                            <Eye className="oui:mr-2 oui:h-4 oui:w-4" />
                            Show Preview
                        </ContextMenuCheckboxItem>
                        <ContextMenuCheckboxItem>
                            <Grid3X3 className="oui:mr-2 oui:h-4 oui:w-4" />
                            Grid View
                        </ContextMenuCheckboxItem>
                        <ContextMenuCheckboxItem checked>
                            <List className="oui:mr-2 oui:h-4 oui:w-4" />
                            List View
                        </ContextMenuCheckboxItem>
                    </ContextMenuContent>
                </ContextMenu>
            </div>

            <div className="oui:flex oui:h-[150px] oui:w-[200px] oui:items-center oui:justify-center oui:rounded-md oui:border oui:border-dashed oui:text-sm">
                <ContextMenu>
                    <ContextMenuTrigger className="oui:flex oui:h-full oui:w-full oui:items-center oui:justify-center">
                        With Submenus
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem>
                            <Edit className="oui:mr-2 oui:h-4 oui:w-4" />
                            Edit
                        </ContextMenuItem>
                        <ContextMenuSub>
                            <ContextMenuSubTrigger>
                                <Share className="oui:mr-2 oui:h-4 oui:w-4" />
                                Share
                            </ContextMenuSubTrigger>
                            <ContextMenuSubContent>
                                <ContextMenuItem>
                                    <Mail className="oui:mr-2 oui:h-4 oui:w-4" />
                                    Email
                                </ContextMenuItem>
                                <ContextMenuItem>
                                    <Copy className="oui:mr-2 oui:h-4 oui:w-4" />
                                    Copy Link
                                </ContextMenuItem>
                            </ContextMenuSubContent>
                        </ContextMenuSub>
                        <ContextMenuItem variant="destructive">
                            <Trash2 className="oui:mr-2 oui:h-4 oui:w-4" />
                            Delete
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All context menu variants displayed together for easy comparison.',
            },
        },
    },
};