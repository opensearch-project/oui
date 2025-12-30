/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import * as LucideIcons from '@/components/custom/icons/lucide';
import * as OUICustomIcons from '@/components/custom/icons/custom';
// Direct imports for usage examples
import {
  SearchIcon,
  HeartIcon,
  StarIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  CircleIcon,
  DiscoverIcon
} from '@/components/custom/icons';

const meta: Meta = {
  title: 'UI/Icons',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Icon system with Lucide React icons and custom OUI icons. All icons follow consistent naming and API patterns.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component to display icon grids
const IconGrid = ({ icons, title }: { icons: Array<{ name: string; component: React.ComponentType<any> }>; title: string }) => (
  <div className="oui:mb-8">
    <h3 className="oui:text-lg oui:font-semibold oui:mb-4 oui:text-gray-900">{title}</h3>
    <div className="oui:grid oui:grid-cols-6 sm:oui:grid-cols-8 md:oui:grid-cols-10 lg:oui:grid-cols-12 oui:gap-4">
      {icons.map(({ name, component: IconComponent }) => (
        <div key={name} className="oui:flex oui:flex-col oui:items-center oui:p-3 oui:rounded-lg oui:border oui:bg-white hover:oui:bg-gray-50 oui:transition-colors">
          <IconComponent className="oui:w-6 oui:h-6 oui:text-gray-700 oui:mb-2" />
          <span className="oui:text-xs oui:text-center oui:text-gray-600 oui:leading-tight">
            {name.replace('Icon', '')}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// Organize lucide icons by category
const lucideIconsByCategory = {
  'Status & Feedback': [
    { name: 'AlertCircleIcon', component: LucideIcons.AlertCircleIcon },
    { name: 'CheckCircleIcon', component: LucideIcons.CheckCircleIcon },
    { name: 'InfoIcon', component: LucideIcons.InfoIcon },
    { name: 'XCircleIcon', component: LucideIcons.XCircleIcon },
    { name: 'AlertTriangleIcon', component: LucideIcons.AlertTriangleIcon },
    { name: 'HelpCircleIcon', component: LucideIcons.HelpCircleIcon },
    { name: 'CircleCheckIcon', component: LucideIcons.CircleCheckIcon },
    { name: 'CircleXIcon', component: LucideIcons.CircleXIcon },
    { name: 'CircleAlertIcon', component: LucideIcons.CircleAlertIcon },
    { name: 'BadgeIcon', component: LucideIcons.BadgeIcon },
    { name: 'BadgeCheckIcon', component: LucideIcons.BadgeCheckIcon },
  ],
  'Navigation & Arrows': [
    { name: 'ArrowLeftIcon', component: LucideIcons.ArrowLeftIcon },
    { name: 'ArrowRightIcon', component: LucideIcons.ArrowRightIcon },
    { name: 'ArrowUpIcon', component: LucideIcons.ArrowUpIcon },
    { name: 'ArrowDownIcon', component: LucideIcons.ArrowDownIcon },
    { name: 'ChevronLeftIcon', component: LucideIcons.ChevronLeftIcon },
    { name: 'ChevronRightIcon', component: LucideIcons.ChevronRightIcon },
    { name: 'ChevronDownIcon', component: LucideIcons.ChevronDownIcon },
    { name: 'ChevronUpIcon', component: LucideIcons.ChevronUpIcon },
    { name: 'ChevronsUpIcon', component: LucideIcons.ChevronsUpIcon },
    { name: 'ChevronsDownIcon', component: LucideIcons.ChevronsDownIcon },
    { name: 'ChevronsLeftIcon', component: LucideIcons.ChevronsLeftIcon },
    { name: 'ChevronsRightIcon', component: LucideIcons.ChevronsRightIcon },
    { name: 'ArrowUpRightIcon', component: LucideIcons.ArrowUpRightIcon },
    { name: 'ArrowDownLeftIcon', component: LucideIcons.ArrowDownLeftIcon },
    { name: 'ArrowUpLeftIcon', component: LucideIcons.ArrowUpLeftIcon },
    { name: 'ArrowDownRightIcon', component: LucideIcons.ArrowDownRightIcon },
  ],
  'Actions & Controls': [
    { name: 'PlusIcon', component: LucideIcons.PlusIcon },
    { name: 'MinusIcon', component: LucideIcons.MinusIcon },
    { name: 'PlusCircleIcon', component: LucideIcons.PlusCircleIcon },
    { name: 'MinusCircleIcon', component: LucideIcons.MinusCircleIcon },
    { name: 'PlayIcon', component: LucideIcons.PlayIcon },
    { name: 'PlayCircleIcon', component: LucideIcons.PlayCircleIcon },
    { name: 'PauseIcon', component: LucideIcons.PauseIcon },
    { name: 'PauseCircleIcon', component: LucideIcons.PauseCircleIcon },
    { name: 'StopCircleIcon', component: LucideIcons.StopCircleIcon },
    { name: 'SkipBackIcon', component: LucideIcons.SkipBackIcon },
    { name: 'SkipForwardIcon', component: LucideIcons.SkipForwardIcon },
    { name: 'RefreshCwIcon', component: LucideIcons.RefreshCwIcon },
    { name: 'RefreshCcwIcon', component: LucideIcons.RefreshCcwIcon },
  ],
  'UI Elements': [
    { name: 'UserIcon', component: LucideIcons.UserIcon },
    { name: 'UsersIcon', component: LucideIcons.UsersIcon },
    { name: 'SearchIcon', component: LucideIcons.SearchIcon },
    { name: 'SettingsIcon', component: LucideIcons.SettingsIcon },
    { name: 'MenuIcon', component: LucideIcons.MenuIcon },
    { name: 'MoreHorizontalIcon', component: LucideIcons.MoreHorizontalIcon },
    { name: 'MoreVerticalIcon', component: LucideIcons.MoreVerticalIcon },
    { name: 'XIcon', component: LucideIcons.XIcon },
    { name: 'CheckIcon', component: LucideIcons.CheckIcon },
    { name: 'FilterIcon', component: LucideIcons.FilterIcon },
    { name: 'SortAscIcon', component: LucideIcons.SortAscIcon },
    { name: 'SortDescIcon', component: LucideIcons.SortDescIcon },
  ],
  'Files & Folders': [
    { name: 'FileIcon', component: LucideIcons.FileIcon },
    { name: 'FilesIcon', component: LucideIcons.FilesIcon },
    { name: 'FolderIcon', component: LucideIcons.FolderIcon },
    { name: 'FolderOpenIcon', component: LucideIcons.FolderOpenIcon },
    { name: 'FileTextIcon', component: LucideIcons.FileTextIcon },
    { name: 'FileImageIcon', component: LucideIcons.FileImageIcon },
    { name: 'FileVideoIcon', component: LucideIcons.FileVideoIcon },
    { name: 'FileAudioIcon', component: LucideIcons.FileAudioIcon },
    { name: 'FolderPlusIcon', component: LucideIcons.FolderPlusIcon },
    { name: 'DownloadIcon', component: LucideIcons.DownloadIcon },
    { name: 'UploadIcon', component: LucideIcons.UploadIcon },
    { name: 'SaveIcon', component: LucideIcons.SaveIcon },
    { name: 'CopyIcon', component: LucideIcons.CopyIcon },
  ],
  'Communication': [
    { name: 'MailIcon', component: LucideIcons.MailIcon },
    { name: 'PhoneIcon', component: LucideIcons.PhoneIcon },
    { name: 'MessageCircleIcon', component: LucideIcons.MessageCircleIcon },
    { name: 'MessageSquareIcon', component: LucideIcons.MessageSquareIcon },
    { name: 'SendIcon', component: LucideIcons.SendIcon },
    { name: 'InboxIcon', component: LucideIcons.InboxIcon },
  ],
  'Time & Calendar': [
    { name: 'CalendarIcon', component: LucideIcons.CalendarIcon },
    { name: 'ClockIcon', component: LucideIcons.ClockIcon },
    { name: 'HistoryIcon', component: LucideIcons.HistoryIcon },
    { name: 'TimerIcon', component: LucideIcons.TimerIcon },
  ],
  'Visibility & Editing': [
    { name: 'EyeIcon', component: LucideIcons.EyeIcon },
    { name: 'EyeOffIcon', component: LucideIcons.EyeOffIcon },
    { name: 'EditIcon', component: LucideIcons.EditIcon },
    { name: 'PenIcon', component: LucideIcons.PenIcon },
    { name: 'TrashIcon', component: LucideIcons.TrashIcon },
    { name: 'Trash2Icon', component: LucideIcons.Trash2Icon },
  ],
  'Favorites & Ratings': [
    { name: 'StarIcon', component: LucideIcons.StarIcon },
    { name: 'HeartIcon', component: LucideIcons.HeartIcon },
    { name: 'BookmarkIcon', component: LucideIcons.BookmarkIcon },
    { name: 'ThumbsUpIcon', component: LucideIcons.ThumbsUpIcon },
    { name: 'ThumbsDownIcon', component: LucideIcons.ThumbsDownIcon },
  ],
  'Tech & Devices': [
    { name: 'ZapIcon', component: LucideIcons.ZapIcon },
    { name: 'WifiIcon', component: LucideIcons.WifiIcon },
    { name: 'SmartphoneIcon', component: LucideIcons.SmartphoneIcon },
    { name: 'TabletIcon', component: LucideIcons.TabletIcon },
    { name: 'LaptopIcon', component: LucideIcons.LaptopIcon },
    { name: 'MonitorIcon', component: LucideIcons.MonitorIcon },
    { name: 'CameraIcon', component: LucideIcons.CameraIcon },
    { name: 'VideoIcon', component: LucideIcons.VideoIcon },
    { name: 'MicIcon', component: LucideIcons.MicIcon },
    { name: 'MicOffIcon', component: LucideIcons.MicOffIcon },
  ],
  'Security & Access': [
    { name: 'ShieldIcon', component: LucideIcons.ShieldIcon },
    { name: 'LockIcon', component: LucideIcons.LockIcon },
    { name: 'UnlockIcon', component: LucideIcons.UnlockIcon },
    { name: 'KeyIcon', component: LucideIcons.KeyIcon },
    { name: 'UserCheckIcon', component: LucideIcons.UserCheckIcon },
  ],
  'Business & Shopping': [
    { name: 'HomeIcon', component: LucideIcons.HomeIcon },
    { name: 'BuildingIcon', component: LucideIcons.BuildingIcon },
    { name: 'CreditCardIcon', component: LucideIcons.CreditCardIcon },
    { name: 'ShoppingCartIcon', component: LucideIcons.ShoppingCartIcon },
    { name: 'ShoppingBagIcon', component: LucideIcons.ShoppingBagIcon },
    { name: 'TagIcon', component: LucideIcons.TagIcon },
    { name: 'DollarSignIcon', component: LucideIcons.DollarSignIcon },
  ],
  'Data & Analytics': [
    { name: 'ActivityIcon', component: LucideIcons.ActivityIcon },
    { name: 'TrendingUpIcon', component: LucideIcons.TrendingUpIcon },
    { name: 'TrendingDownIcon', component: LucideIcons.TrendingDownIcon },
    { name: 'BarChartIcon', component: LucideIcons.BarChartIcon },
    { name: 'PieChartIcon', component: LucideIcons.PieChartIcon },
    { name: 'LineChartIcon', component: LucideIcons.LineChartIcon },
    { name: 'DatabaseIcon', component: LucideIcons.DatabaseIcon },
    { name: 'ServerIcon', component: LucideIcons.ServerIcon },
  ],
  'Tools & Utilities': [
    { name: 'SlidersIcon', component: LucideIcons.SlidersIcon },
    { name: 'ZoomInIcon', component: LucideIcons.ZoomInIcon },
    { name: 'ZoomOutIcon', component: LucideIcons.ZoomOutIcon },
    { name: 'MaximizeIcon', component: LucideIcons.MaximizeIcon },
    { name: 'MinimizeIcon', component: LucideIcons.MinimizeIcon },
  ],
  'Links & External': [
    { name: 'ExternalLinkIcon', component: LucideIcons.ExternalLinkIcon },
    { name: 'LinkIcon', component: LucideIcons.LinkIcon },
    { name: 'Link2Icon', component: LucideIcons.Link2Icon },
    { name: 'UnlinkIcon', component: LucideIcons.UnlinkIcon },
  ],
  'Miscellaneous': [
    { name: 'BellIcon', component: LucideIcons.BellIcon },
    { name: 'BellOffIcon', component: LucideIcons.BellOffIcon },
    { name: 'FlagIcon', component: LucideIcons.FlagIcon },
    { name: 'GlobeIcon', component: LucideIcons.GlobeIcon },
    { name: 'MapPinIcon', component: LucideIcons.MapPinIcon },
    { name: 'ImageIcon', component: LucideIcons.ImageIcon },
    { name: 'TypeIcon', component: LucideIcons.TypeIcon },
    { name: 'HashIcon', component: LucideIcons.HashIcon },
    { name: 'CircleIcon', component: LucideIcons.CircleIcon },
  ],
};

const customIcons = [
  { name: 'DiscoverIcon', component: OUICustomIcons.DiscoverIcon },
];

export const Default: Story = {
  render: () => (
    <div className="oui:max-w-7xl oui:mx-auto oui:space-y-12">
      {/* Header */}
      <div className="oui:text-center oui:mb-12">
        <h1 className="oui:text-3xl oui:font-bold oui:text-gray-900 oui:mb-4">Icons</h1>
        <p className="oui:text-lg oui:text-gray-600 oui:max-w-3xl oui:mx-auto">
          Complete icon system with curated Lucide React icons and custom OUI icons.
          All icons follow consistent naming and API patterns, supporting size, color, and stroke width customization.
        </p>
      </div>

      {/* Usage Examples */}
      <div className="oui:space-y-8 oui:mb-16">
        <h2 className="oui:text-2xl oui:font-semibold oui:text-gray-900 oui:border-b oui:pb-2">Usage Examples</h2>

        {/* Size Examples */}
        <div>
          <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Size Examples</h3>
          <div className="oui:flex oui:gap-6 oui:items-end oui:p-6 oui:bg-gray-50 oui:rounded-lg">
            <div className="oui:text-center">
              <SearchIcon size={16} className="oui:mb-2 oui:text-gray-700" />
              <code className="oui:text-xs oui:bg-white oui:px-2 oui:py-1 oui:rounded oui:text-gray-800 oui:font-mono">
                &lt;SearchIcon size={16} /&gt;
              </code>
            </div>
            <div className="oui:text-center">
              <SearchIcon size={24} className="oui:mb-2 oui:text-gray-700" />
              <code className="oui:text-xs oui:bg-white oui:px-2 oui:py-1 oui:rounded oui:text-gray-800 oui:font-mono">
                &lt;SearchIcon /&gt;
              </code>
            </div>
            <div className="oui:text-center">
              <SearchIcon size={32} className="oui:mb-2 oui:text-gray-700" />
              <code className="oui:text-xs oui:bg-white oui:px-2 oui:py-1 oui:rounded oui:text-gray-800 oui:font-mono">
                &lt;SearchIcon size={32} /&gt;
              </code>
            </div>
            <div className="oui:text-center">
              <DiscoverIcon size={48} className="oui:mb-2 oui:text-orange-600" />
              <code className="oui:text-xs oui:bg-white oui:px-2 oui:py-1 oui:rounded oui:text-gray-800 oui:font-mono">
                &lt;DiscoverIcon size={48} /&gt;
              </code>
            </div>
          </div>
        </div>

        {/* Color Examples */}
        <div>
          <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Color Examples</h3>
          <div className="oui:flex oui:gap-6 oui:items-center oui:p-6 oui:bg-gray-50 oui:rounded-lg">
            <div className="oui:text-center">
              <HeartIcon className="oui:mb-2 oui:text-red-500" />
              <code className="oui:text-xs oui:bg-white oui:px-2 oui:py-1 oui:rounded oui:text-gray-800 oui:font-mono">
                &lt;HeartIcon className="text-red-500" /&gt;
              </code>
            </div>
            <div className="oui:text-center">
              <StarIcon color="#fbbf24" className="oui:mb-2" />
              <code className="oui:text-xs oui:bg-white oui:px-2 oui:py-1 oui:rounded oui:text-gray-800 oui:font-mono">
                &lt;StarIcon color="#fbbf24" /&gt;
              </code>
            </div>
            <div className="oui:text-center">
              <CheckCircleIcon className="oui:mb-2 oui:text-green-600" />
              <code className="oui:text-xs oui:bg-white oui:px-2 oui:py-1 oui:rounded oui:text-gray-800 oui:font-mono">
                &lt;CheckCircleIcon className="text-green-600" /&gt;
              </code>
            </div>
            <div className="oui:text-center">
              <AlertTriangleIcon className="oui:mb-2 oui:text-yellow-500" />
              <code className="oui:text-xs oui:bg-white oui:px-2 oui:py-1 oui:rounded oui:text-gray-800 oui:font-mono">
                &lt;AlertTriangleIcon className="text-yellow-500" /&gt;
              </code>
            </div>
          </div>
        </div>

        {/* Stroke Width Examples */}
        <div>
          <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Stroke Width Examples</h3>
          <div className="oui:flex oui:gap-6 oui:items-center oui:p-6 oui:bg-gray-50 oui:rounded-lg">
            <div className="oui:text-center">
              <CircleIcon strokeWidth={1} className="oui:mb-2 oui:text-gray-700" />
              <code className="oui:text-xs oui:bg-white oui:px-2 oui:py-1 oui:rounded oui:text-gray-800 oui:font-mono">
                &lt;CircleIcon strokeWidth={1} /&gt;
              </code>
            </div>
            <div className="oui:text-center">
              <CircleIcon strokeWidth={2} className="oui:mb-2 oui:text-gray-700" />
              <code className="oui:text-xs oui:bg-white oui:px-2 oui:py-1 oui:rounded oui:text-gray-800 oui:font-mono">
                &lt;CircleIcon /&gt;
              </code>
            </div>
            <div className="oui:text-center">
              <CircleIcon strokeWidth={3} className="oui:mb-2 oui:text-gray-700" />
              <code className="oui:text-xs oui:bg-white oui:px-2 oui:py-1 oui:rounded oui:text-gray-800 oui:font-mono">
                &lt;CircleIcon strokeWidth={3} /&gt;
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Custom OUI Icons */}
      <div className="oui:space-y-8">
        <h2 className="oui:text-2xl oui:font-semibold oui:text-gray-900 oui:border-b oui:pb-2">Custom OUI Icons</h2>
        <p className="oui:text-gray-600 oui:mb-6">
          Custom icons created from SVG files. These follow the same API patterns as Lucide icons and are generated at build time.
        </p>
        <IconGrid title="Custom Icons" icons={customIcons} />
      </div>

      {/* Lucide React Icons */}
      <div className="oui:space-y-8">
        <h2 className="oui:text-2xl oui:font-semibold oui:text-gray-900 oui:border-b oui:pb-2">Lucide React Icons</h2>
        <p className="oui:text-gray-600 oui:mb-6">
          Curated collection of Lucide React icons organized by category. These icons maintain full API compatibility with the lucide-react package.
        </p>
        {Object.entries(lucideIconsByCategory).map(([category, icons]) => (
          <IconGrid key={category} title={category} icons={icons} />
        ))}
      </div>
    </div>
  ),
};