# Component Mapping Reference: OUI 1.x → OUI 2.x

> **📋 Living Document**: This reference tracks the migration from @opensearch-project/oui@1.x (EUI fork) to @opensearch-project/oui@2.x (shadcn-based).
>
> **Last Updated**: 2025-12-23
>
> **Status**: Comprehensive mapping with priority tracking

## How to Use This Document

This document serves as the definitive mapping guide for migrating from OUI 1.x to OUI 2.x:

1. **Find your component** in the table below
2. **Check availability status** - whether the OUI 2.x component is ready to use
3. **Review prop changes** - key differences in component APIs
4. **Note migration phase** - when the component is expected to be available
5. **Add your learnings** - update this document as you migrate

## Component Comparison Table

| Category | OUI 1.x Component | OUI 2.x Component | Status | Key Prop Changes | Migration Phase | Migration Notes |
|----------|-------------------|-------------------|--------|------------------|----------------|-----------------|
| Actions | **EuiButton** | `Button` | ⬜ Phase 1 | `color="primary"` → `variant="default"`<br/>`color="danger"` → `variant="destructive"`<br/>`fill={true}` → `variant="default"`<br/>`fill={false}` → `variant="outline"`<br/>`size="s"` → `size="sm"` | Phase 1 | Icon handling changed: `iconType="add"` → `<PlusIcon className="h-4 w-4" />` |
| Actions | **EuiButtonEmpty** | `Button` | ⬜ Phase 1 | Equivalent to `variant="ghost"` | Phase 1 | Use ghost variant for similar appearance |
| Actions | **EuiButtonIcon** | `Button` + Icon | 📋 Unknown | `iconType="name"` → `<NameIcon />` component | Unknown | Requires icon mapping and sizing |
| Actions | **EuiLink** | `Link` or `<a>` | 📋 Unknown | Similar props expected | Unknown | External vs internal link handling TBD |
| Layout | **EuiFlexGroup** | `Flex` | ⬜ Phase 1 | `direction="row"` → `direction="row"`<br/>`alignItems="center"` → `align="center"`<br/>`gutterSize="m"` → `gap="md"`<br/>`responsive={false}` → explicit breakpoint classes | Phase 1 | Responsive behavior needs testing |
| Layout | **EuiFlexItem** | `div` with classes | ⬜ Phase 1 | `grow={false}` → `className="flex-shrink-0"`<br/>`grow={true}` → `className="flex-1"` | Phase 1 | CSS specificity conflicts possible |
| Layout | **EuiContainer** | `Container` | ⬜ Phase 1 | `maxWidth="xl"` → `maxWidth="xl"` | Phase 1 | Responsive sizing maintained |
| Layout | **EuiSpacer** | `div` with margin | 📋 Unknown | `size="xs"` → `className="my-1"`<br/>`size="s"` → `className="my-2"`<br/>`size="m"` → `className="my-4"`<br/>`size="l"` → `className="my-6"`<br/>`size="xl"` → `className="my-8"` | Unknown | Spacing scale mapping needs verification |
| Layout | **EuiPage** | `Container` + layout | 📋 Unknown | Requires custom composition | Unknown | Page layout patterns need definition |
| Layout | **EuiPageBody** | `<main>` + classes | 📋 Unknown | Semantic HTML approach | Unknown | Accessibility implications review needed |
| Layout | **EuiPageHeader** | Custom composition | 📋 Unknown | Composition of heading + actions | Unknown | Header pattern standardization needed |
| Layout | **EuiPageContent** | `Card` or `<section>` | 📋 Unknown | Context-dependent implementation | Unknown | Content wrapper patterns TBD |
| Typography | **EuiText** | `Typography` | ⬜ Phase 1 | `size="s"` → `size="sm"`<br/>`size="m"` → `size="base"`<br/>`color="subdued"` → `variant="muted"` | Phase 1 | Color variant mapping needs verification |
| Typography | **EuiTitle** | `Typography` | ⬜ Phase 1 | `size="xxxs"` → `variant="h6"`<br/>`size="xxs"` → `variant="h5"`<br/>`size="xs"` → `variant="h4"`<br/>`size="s"` → `variant="h3"`<br/>`size="m"` → `variant="h2"`<br/>`size="l"` → `variant="h1"` | Phase 1 | Semantic heading hierarchy preserved |
| Typography | **EuiCode** | `Code` | 📋 Unknown | Similar inline code styling | Unknown | Block vs inline code differentiation |
| Typography | **EuiCodeBlock** | `CodeBlock` or `<pre>` | 📋 Unknown | Syntax highlighting integration | Unknown | Language support and themes TBD |
| Forms | **EuiFieldText** | `Input` | ⬜ Phase 1 | `compressed` → `size="sm"`<br/>`isInvalid` → `error={true}` | Phase 1 | Form validation patterns need testing |
| Forms | **EuiCompressedFieldText** | `Input` | ⬜ Phase 1 | Equivalent to `size="sm"` | Phase 1 | Size mapping confirmed |
| Forms | **EuiFieldPassword** | `Input` | ⬜ Phase 1 | `type="password"` maintained | Phase 1 | Show/hide toggle pattern needed |
| Forms | **EuiFieldSearch** | `Input` | ⬜ Phase 1 | `type="search"` with search icon | Phase 1 | Icon positioning and clearing behavior |
| Forms | **EuiTextArea** | `Textarea` | 📋 Unknown | Similar resize and validation props | Unknown | Resize behavior and validation styling |
| Forms | **EuiSelect** | `Select` | 📋 Unknown | Options array → `SelectItem` children | Unknown | Custom option rendering and search |
| Forms | **EuiComboBox** | Custom `Combobox` | ❓ Complex | Requires complex implementation | Unknown | Multi-select, async loading, custom rendering |
| Forms | **EuiFormRow** | `FormField` | ⬜ Phase 1 | `label` → `<FormLabel>`<br/>`helpText` → `<FormDescription>`<br/>`error` → `<FormErrorMessage>` | Phase 1 | Error state handling patterns confirmed |
| Forms | **EuiCompressedFormRow** | `FormField` | ⬜ Phase 1 | Similar to FormField with size adjustments | Phase 1 | Compressed styling via classes |
| Forms | **EuiCheckbox** | `Checkbox` | 📋 Unknown | `checked` → `checked`<br/>`indeterminate` → `indeterminate` | Unknown | Indeterminate state handling |
| Forms | **EuiRadio** | `RadioGroup` + `RadioItem` | 📋 Unknown | Group composition pattern | Unknown | Radio group management patterns |
| Forms | **EuiSwitch** | `Switch` | 📋 Unknown | `checked` → `checked` | Unknown | Label positioning and styling |
| Forms | **EuiRange** | `Slider` | 📋 Unknown | `min`, `max`, `value` props similar | Unknown | Dual handle and step behavior |
| Display | **EuiCard** | `Card` | ⬜ Phase 1 | `title` → `<CardHeader><CardTitle>`<br/>`description` → `<CardContent>`<br/>`footer` → `<CardFooter>` | Phase 1 | Action button patterns need definition |
| Display | **EuiAlert** | `Alert` | ⬜ Phase 1 | `color="success"` → `variant="default"`<br/>`color="warning"` → `variant="warning"`<br/>`color="danger"` → `variant="destructive"` | Phase 1 | Icon and dismiss button patterns |
| Display | **EuiCallOut** | `Alert` or custom | 📋 Unknown | Similar to Alert with different styling | Unknown | Callout vs Alert differentiation |
| Display | **EuiEmptyPrompt** | Custom composition | 📋 Unknown | Composition of typography + actions | Unknown | Empty state patterns standardization |
| Data | **EuiBasicTable** | `Table` + composition | 📋 Unknown | `columns` → manual `TableHeader`/`TableCell` | Unknown | Sorting, pagination, selection patterns |
| Data | **EuiInMemoryTable** | Custom `DataTable` | ❓ Complex | Requires search/filter wrapper | Unknown | Performance optimization for large datasets |
| Data | **EuiDataGrid** | Custom grid component | ❓ Complex | Virtualization and cell renderers | Unknown | Advanced grid features implementation |
| Navigation | **EuiAccordion** | `Accordion` | 📋 Unknown | `title` → `AccordionTrigger` children | Unknown | Animation and nested accordion patterns |
| Navigation | **EuiTabs** | `Tabs` | 📋 Unknown | `tabs` array → `TabsList`/`TabsTrigger` | Unknown | Tab positioning and overflow handling |
| Navigation | **EuiSteps** | Custom stepper | 📋 Unknown | Steps array → step composition | Unknown | Progress indication and validation |
| Navigation | **EuiPagination** | `Pagination` | 📋 Unknown | `pageCount`, `activePage` → similar | Unknown | Page size and navigation patterns |
| Navigation | **EuiBreadcrumbs** | `Breadcrumb` | 📋 Unknown | `breadcrumbs` → `BreadcrumbList` | Unknown | Overflow and responsive behavior |
| Overlays | **EuiPopover** | `Popover` | 📋 Unknown | `button` → `PopoverTrigger`<br/>`isOpen` → controlled state | Unknown | Positioning and z-index conflict resolution |
| Overlays | **EuiContextMenu** | `DropdownMenu` | 📋 Unknown | `panels` → flatter menu structure | Unknown | Nested menu patterns for complex hierarchies |
| Overlays | **EuiToast** | `Toast` + context | 📋 Unknown | Toast provider pattern required | Unknown | Toast positioning and stacking |
| Overlays | **EuiModal** | `Dialog` | 📋 Unknown | `onClose` → controlled state pattern | Unknown | Focus management and backdrop behavior |
| Overlays | **EuiFlyout** | `Sheet` | 📋 Unknown | `onClose` → controlled state<br/>`size` → size variants | Unknown | Responsive sizing and positioning |
| Overlays | **EuiConfirmModal** | `AlertDialog` | 📋 Unknown | More composition required:<br/>`AlertDialogHeader`<br/>`AlertDialogContent`<br/>`AlertDialogFooter` | Unknown | Button action patterns and focus management |
| Overlays | **EuiToolTip** | `Tooltip` | 📋 Unknown | `content` → children of tooltip | Unknown | Positioning and delay configuration |
| Feedback | **EuiProgress** | `Progress` | 📋 Unknown | `value`, `max` props similar | Unknown | Indeterminate state and animations |
| Feedback | **EuiLoadingSpinner** | `Spinner` or CSS | 📋 Unknown | Size variants mapping | Unknown | Animation performance and accessibility |
| Media | **EuiIcon** | Lucide React icons | ⬜ Phase 1 | `type="add"` → `<PlusIcon />` | Phase 1 | See icon mapping table below |
| Media | **EuiImage** | `<img>` + utilities | 📋 Unknown | Similar src, alt props | Unknown | Lazy loading and responsive image patterns |
| Media | **EuiAvatar** | `Avatar` | 📋 Unknown | `name`, `src` props similar | Unknown | Fallback patterns and size variants |
| Display | **EuiBadge** | `Badge` | 📋 Unknown | `color` → `variant`<br/>`iconType` → icon component | Unknown | Color mapping and icon handling |
| Display | **EuiToken** | `Badge` + custom styling | 📋 Unknown | Token-specific styling needs | Unknown | Specialized token appearance |
| Display | **EuiNotificationBadge** | `Badge` | 📋 Unknown | Similar to Badge with notification styling | Unknown | Notification-specific styling |
| Display | **EuiHealth** | Custom indicator | ⚠️ No Equivalent | Health status visualization | N/A | Consider generic status component |
| Display | **EuiStat** | Custom composition | ⚠️ No Equivalent | Title + description + value layout | N/A | Dashboard metric display pattern needed |
| Display | **EuiDescriptionList** | Custom composition | 📋 Unknown | Term-description pairs | Unknown | Definition list patterns |
| Display | **EuiComment** | Custom composition | ⚠️ No Equivalent | User comment with avatar and metadata | N/A | Social/collaboration UI pattern |
| Forms | **EuiColorPicker** | Custom color input | ❓ Complex | Color selection with palette/hex input | Unknown | Color picker implementation needed |
| Forms | **EuiColorPalette** | Custom palette | ❓ Complex | Predefined color selection grid | Unknown | Palette selection patterns |
| Forms | **EuiDatePicker** | Date picker component | ❓ Complex | Date selection with calendar | Unknown | Date/time input patterns |
| Forms | **EuiDatePickerRange** | Date range picker | ❓ Complex | Start/end date selection | Unknown | Date range selection patterns |
| Forms | **EuiSuperDatePicker** | Advanced date picker | ⚠️ No Equivalent | Relative/absolute date with presets | N/A | OpenSearch-specific date selection |
| Forms | **EuiDualRange** | Dual range slider | ❓ Complex | Min/max range selection | Unknown | Dual-handle slider implementation |
| Forms | **EuiFilePicker** | File input component | 📋 Unknown | File upload with drag-and-drop | Unknown | File upload patterns and validation |
| Forms | **EuiSuperSelect** | Enhanced select | ❓ Complex | Rich content in options | Unknown | Custom option rendering patterns |
| Forms | **EuiSelectableSearch** | Searchable list | ❓ Complex | Filter + selection in large lists | Unknown | Search with multi-selection |
| Forms | **EuiSelectable** | Selection list | ❓ Complex | Multi-selection with search/grouping | Unknown | Advanced list selection patterns |
| Forms | **EuiSearchBar** | Search with filters | ❓ Complex | Search input + filter syntax | Unknown | Advanced search interface |
| Forms | **EuiFilterGroup** | Filter collection | ❓ Complex | Multiple filter controls | Unknown | Filter management patterns |
| Forms | **EuiFilterButton** | Filter toggle | 📋 Unknown | Filter state toggle button | Unknown | Active/inactive filter states |
| Forms | **EuiFacetButton** | Faceted search button | ⚠️ No Equivalent | Count + selection for faceted search | N/A | Search refinement UI patterns |
| Navigation | **EuiHeaderBreadcrumbs** | `Breadcrumb` | 📋 Unknown | Header-specific breadcrumb styling | Unknown | Header integration patterns |
| Navigation | **EuiHeader** | Custom header | ⚠️ No Equivalent | Application header with sections | N/A | App header composition patterns |
| Navigation | **EuiHeaderSection** | Custom layout | ⚠️ No Equivalent | Header content sections | N/A | Header layout organization |
| Navigation | **EuiHeaderSectionItem** | Custom layout | ⚠️ No Equivalent | Individual header items | N/A | Header item spacing and alignment |
| Navigation | **EuiHeaderAlert** | Custom alert | ⚠️ No Equivalent | Header-embedded alerts | N/A | Global notification patterns |
| Navigation | **EuiSideNav** | Custom navigation | ❓ Complex | Hierarchical side navigation | Unknown | Collapsible navigation tree |
| Navigation | **EuiCollapsibleNav** | Collapsible nav | ❓ Complex | Mobile-friendly collapsible navigation | Unknown | Responsive navigation patterns |
| Navigation | **EuiCollapsibleNavGroup** | Nav group | ❓ Complex | Grouped navigation items | Unknown | Navigation categorization |
| Navigation | **EuiTreeView** | Custom tree | ❓ Complex | Hierarchical tree with expand/collapse | Unknown | Tree navigation and data display |
| Navigation | **EuiKeyPadMenu** | Grid menu | ⚠️ No Equivalent | Icon + label grid navigation | N/A | App launcher or menu grid pattern |
| Navigation | **EuiKeyPadMenuItem** | Grid menu item | ⚠️ No Equivalent | Individual keypad menu items | N/A | Grid navigation item patterns |
| Navigation | **EuiStepsHorizontal** | Horizontal stepper | 📋 Unknown | Progress steps in horizontal layout | Unknown | Horizontal step progression |
| Utility | **EuiDelayHide** | Custom hook/component | ⚠️ No Equivalent | Delay hiding of content | N/A | Loading state optimization |
| Utility | **EuiDelayRender** | Custom hook/component | ⚠️ No Equivalent | Delay rendering of content | N/A | Performance optimization utility |
| Utility | **EuiErrorBoundary** | Error boundary | 📋 Unknown | React error boundary wrapper | Unknown | Error handling patterns |
| Utility | **EuiInnerText** | Text extraction | ⚠️ No Equivalent | Extract text from React elements | N/A | Utility for text extraction |
| Utility | **EuiI18n** | Internationalization | ⚠️ No Equivalent | i18n wrapper component | N/A | Internationalization patterns |
| Utility | **EuiPortal** | Portal component | 📋 Unknown | Render outside component tree | Unknown | Portal patterns for overlays |
| Utility | **EuiMutationObserver** | DOM observation | ⚠️ No Equivalent | React wrapper for MutationObserver | N/A | DOM change detection |
| Utility | **EuiResizeObserver** | Resize observation | ⚠️ No Equivalent | React wrapper for ResizeObserver | N/A | Element resize detection |
| Utility | **EuiWindowEvent** | Window events | ⚠️ No Equivalent | Window event listener wrapper | N/A | Global event handling |
| Layout | **EuiBottomBar** | Fixed bottom bar | ⚠️ No Equivalent | Sticky bottom action bar | N/A | Bottom action patterns |
| Layout | **EuiControlBar** | Control bar | ⚠️ No Equivalent | Fixed control interface | N/A | Control panel patterns |
| Layout | **EuiPanel** | Panel/container | 📋 Unknown | Content panel with padding/borders | Unknown | Content grouping patterns |
| Layout | **EuiSplitPanel** | Split layout | ⚠️ No Equivalent | Resizable split panels | N/A | Resizable layout patterns |
| Layout | **EuiResizableContainer** | Resizable layout | ⚠️ No Equivalent | Drag-resizable layout container | N/A | Complex resizable layouts |
| Layout | **EuiShowFor** | Responsive display | 📋 Unknown | Show content for specific breakpoints | Unknown | Responsive visibility utilities |
| Layout | **EuiHideFor** | Responsive hide | 📋 Unknown | Hide content for specific breakpoints | Unknown | Responsive visibility utilities |
| Content | **EuiMarkdownEditor** | Markdown editor | ❓ Complex | WYSIWYG markdown editing | Unknown | Rich text editing patterns |
| Content | **EuiMarkdownFormat** | Markdown renderer | 📋 Unknown | Render markdown to HTML | Unknown | Markdown rendering patterns |
| Content | **EuiCodeEditor** | Code editor | ❓ Complex | Syntax-highlighted code editing | Unknown | Code editor integration (Monaco/CodeMirror) |
| Data | **EuiDataGridInMemory** | In-memory data grid | ❓ Complex | Client-side data grid operations | Unknown | Advanced data grid with memory optimizations |
| Data | **EuiDataGridPaginationRenderer** | Grid pagination | ❓ Complex | Custom pagination for data grid | Unknown | Data grid pagination patterns |
| Data | **EuiDataGridToolbar** | Grid toolbar | ❓ Complex | Toolbar for data grid actions | Unknown | Data grid toolbar patterns |
| Display | **EuiListGroup** | List group | 📋 Unknown | Grouped list items | Unknown | List grouping and styling |
| Display | **EuiListGroupItem** | List item | 📋 Unknown | Individual grouped list items | Unknown | List item interaction patterns |
| Display | **EuiExpression** | Expression builder | ⚠️ No Equivalent | Key-value expression display | N/A | Query/filter expression UI |
| Interaction | **EuiDragDropContext** | Drag & drop context | ❓ Complex | Drag and drop functionality | Unknown | Drag and drop patterns |
| Interaction | **EuiDraggable** | Draggable item | ❓ Complex | Individual draggable elements | Unknown | Draggable item patterns |
| Interaction | **EuiDroppable** | Drop target | ❓ Complex | Drop zone for draggable items | Unknown | Drop target patterns |
| Guidance | **EuiTour** | Product tour | ⚠️ No Equivalent | Step-by-step product walkthrough | N/A | User onboarding/guidance patterns |
| Guidance | **EuiTourStep** | Tour step | ⚠️ No Equivalent | Individual tour step with pointer | N/A | Tour step positioning and content |
| Guidance | **EuiBeacon** | Attention beacon | ⚠️ No Equivalent | Animated attention indicator | N/A | UI attention-drawing patterns |
| Feedback | **EuiGlobalToastList** | Toast container | 📋 Unknown | Global toast notification system | Unknown | Toast management and positioning |
| Feedback | **EuiGlobalToastListItem** | Individual toast | 📋 Unknown | Single toast notification | Unknown | Toast content and actions |
| Feedback | **EuiLoadingKibana** | Kibana loader | ⚠️ No Equivalent | Kibana-specific loading animation | N/A | OpenSearch-specific loading patterns |
| Feedback | **EuiLoadingElastic** | Elastic loader | ⚠️ No Equivalent | Elastic-specific loading animation | N/A | Brand-specific loading patterns |
| Feedback | **EuiLoadingChart** | Chart loader | 📋 Unknown | Loading state for charts/visualizations | Unknown | Chart loading patterns |
| Feedback | **EuiLoadingContent** | Content loader | 📋 Unknown | Skeleton loading for content | Unknown | Skeleton loading patterns |
| Overlays | **EuiFlyoutBody** | Flyout body | 📋 Unknown | `<SheetContent>` equivalent | Unknown | Flyout content area |
| Overlays | **EuiFlyoutFooter** | Flyout footer | 📋 Unknown | `<SheetFooter>` equivalent | Unknown | Flyout action area |
| Overlays | **EuiFlyoutHeader** | Flyout header | 📋 Unknown | `<SheetHeader>` equivalent | Unknown | Flyout header with title/close |
| Overlays | **EuiModalBody** | Modal body | 📋 Unknown | `<DialogContent>` equivalent | Unknown | Modal content area |
| Overlays | **EuiModalFooter** | Modal footer | 📋 Unknown | `<DialogFooter>` equivalent | Unknown | Modal action buttons |
| Overlays | **EuiModalHeader** | Modal header | 📋 Unknown | `<DialogHeader>` equivalent | Unknown | Modal title and close button |
| Overlays | **EuiModalHeaderTitle** | Modal title | 📋 Unknown | `<DialogTitle>` equivalent | Unknown | Modal heading element |
| Overlays | **EuiOverlayMask** | Overlay backdrop | 📋 Unknown | Modal/overlay background | Unknown | Backdrop styling and interaction |
| Overlays | **EuiContextMenuItem** | Context menu item | 📋 Unknown | Individual menu items | Unknown | Menu item patterns and interactions |
| Overlays | **EuiContextMenuPanel** | Context menu panel | 📋 Unknown | Menu panel container | Unknown | Menu panel organization |
| Overlays | **EuiPopoverTitle** | Popover title | 📋 Unknown | Popover header section | Unknown | Popover header patterns |
| Overlays | **EuiPopoverFooter** | Popover footer | 📋 Unknown | Popover footer section | Unknown | Popover action patterns |

## Status Legend

- ✅ **Ready**: Component confirmed ready for use in Phase 1
- ⬜ **Phase 1**: Component planned for Phase 1 (needs verification)
- 📋 **Unknown**: Component mapping identified but availability phase unknown
- ❓ **Complex**: Requires custom implementation or significant changes
- 🔄 **In Progress**: Currently being developed or tested
- ❌ **Blocked**: Issues preventing migration
- ⚠️ **No Equivalent**: No direct OUI 2.x equivalent planned (identifies system gaps)

## Icon Mapping Table

### Core Action Icons
| OUI 1.x Icon | Category | Lucide React Icon | Status | Migration Notes |
|--------------|----------|-------------------|--------|-----------------|
| `type="add"` | Actions | `<PlusIcon />` | ✅ Direct | Direct replacement |
| `type="addDataApp"` | Actions | `<PlusIcon /> + <DatabaseIcon />` | ❓ Composite | Combine plus with database icon |
| `type="apps"` | Actions | `<GridIcon />` | ✅ Direct | Application launcher |
| `type="arrowDown"` | Actions | `<ChevronDownIcon />` | ✅ Direct | Use for dropdowns |
| `type="arrowLeft"` | Actions | `<ChevronLeftIcon />` | ✅ Direct | Navigation back |
| `type="arrowRight"` | Actions | `<ChevronRightIcon />` | ✅ Direct | Navigation forward |
| `type="arrowUp"` | Actions | `<ChevronUpIcon />` | ✅ Direct | Collapse/minimize |
| `type="bell"` | Actions | `<BellIcon />` | ✅ Direct | Notifications |
| `type="bellSlash"` | Actions | `<BellOffIcon />` | ✅ Direct | Muted notifications |
| `type="bolt"` | Actions | `<ZapIcon />` | ✅ Direct | Quick actions/power |
| `type="bookmark"` | Actions | `<BookmarkIcon />` | ✅ Direct | Save for later |
| `type="broom"` | Actions | `<BroomIcon />` | ⚠️ No Match | Cleaning/clearing actions |
| `type="brush"` | Actions | `<PaintbrushIcon />` | ✅ Direct | Formatting/styling |
| `type="bullseye"` | Actions | `<TargetIcon />` | ✅ Direct | Focus/target |
| `type="calendar"` | Actions | `<CalendarIcon />` | ✅ Direct | Date/time selection |
| `type="check"` | Actions | `<CheckIcon />` | ✅ Direct | Success states |
| `type="checkInCircleFilled"` | Actions | `<CheckCircleIcon />` | ✅ Direct | Success confirmation |
| `type="clock"` | Actions | `<ClockIcon />` | ✅ Direct | Time display |
| `type="compute"` | Actions | `<CpuIcon />` | ✅ Direct | Processing/compute |
| `type="copy"` | Actions | `<CopyIcon />` | ✅ Direct | Copy functionality |
| `type="copyClipboard"` | Actions | `<ClipboardCopyIcon />` | ✅ Direct | Copy to clipboard |
| `type="cross"` | Actions | `<XIcon />` | ✅ Direct | Close/cancel actions |
| `type="crossInACircleFilled"` | Actions | `<XCircleIcon />` | ✅ Direct | Error/cancel states |
| `type="cut"` | Actions | `<ScissorsIcon />` | ✅ Direct | Cut/remove |
| `type="download"` | Actions | `<DownloadIcon />` | ✅ Direct | Download actions |
| `type="editorBold"` | Actions | `<BoldIcon />` | ✅ Direct | Text formatting |
| `type="editorItalic"` | Actions | `<ItalicIcon />` | ✅ Direct | Text formatting |
| `type="editorUnderline"` | Actions | `<UnderlineIcon />` | ✅ Direct | Text formatting |
| `type="exit"` | Actions | `<LogOutIcon />` | ✅ Direct | Sign out/exit |
| `type="expand"` | Actions | `<ExpandIcon />` | ✅ Direct | Expand/maximize |
| `type="eye"` | Actions | `<EyeIcon />` | ✅ Direct | Show/view toggle |
| `type="eyeClosed"` | Actions | `<EyeOffIcon />` | ✅ Direct | Hide toggle |
| `type="filter"` | Actions | `<FilterIcon />` | ✅ Direct | Filtering functionality |
| `type="flag"` | Actions | `<FlagIcon />` | ✅ Direct | Mark/flag items |
| `type="folderClosed"` | Actions | `<FolderIcon />` | ✅ Direct | Closed folder |
| `type="folderOpen"` | Actions | `<FolderOpenIcon />` | ✅ Direct | Open folder |
| `type="fullScreen"` | Actions | `<MaximizeIcon />` | ✅ Direct | Enter fullscreen |
| `type="fullScreenExit"` | Actions | `<MinimizeIcon />` | ✅ Direct | Exit fullscreen |
| `type="gear"` | Actions | `<SettingsIcon />` | ✅ Direct | Settings/configuration |
| `type="grab"` | Actions | `<GripVerticalIcon />` | ✅ Direct | Drag handle |
| `type="grabHorizontal"` | Actions | `<GripHorizontalIcon />` | ✅ Direct | Horizontal drag |
| `type="heart"` | Actions | `<HeartIcon />` | ✅ Direct | Favorites/like |
| `type="home"` | Actions | `<HomeIcon />` | ✅ Direct | Home/dashboard navigation |
| `type="link"` | Actions | `<LinkIcon />` | ✅ Direct | Link/connect |
| `type="list"` | Actions | `<ListIcon />` | ✅ Direct | List view |
| `type="listAdd"` | Actions | `<ListPlusIcon />` | ✅ Direct | Add to list |
| `type="lock"` | Actions | `<LockIcon />` | ✅ Direct | Security/permissions |
| `type="lockOpen"` | Actions | `<UnlockIcon />` | ✅ Direct | Unlock/open access |
| `type="menu"` | Actions | `<MenuIcon />` | ✅ Direct | Menu toggle |
| `type="menuLeft"` | Actions | `<MenuIcon />` | ✅ Direct | Left-aligned menu |
| `type="menuRight"` | Actions | `<MenuIcon />` | ✅ Direct | Right-aligned menu |
| `type="minimize"` | Actions | `<MinusIcon />` | ✅ Direct | Minimize/reduce |
| `type="node"` | Actions | `<CircleIcon />` | ✅ Similar | Network node |
| `type="package"` | Actions | `<PackageIcon />` | ✅ Direct | Package/bundle |
| `type="pause"` | Actions | `<PauseIcon />` | ✅ Direct | Pause action |
| `type="pencil"` | Actions | `<EditIcon />` | ✅ Direct | Edit functionality |
| `type="pin"` | Actions | `<PinIcon />` | ✅ Direct | Pin/attach |
| `type="pinFilled"` | Actions | `<PinIcon />` | ✅ Similar | Pinned state |
| `type="play"` | Actions | `<PlayIcon />` | ✅ Direct | Play/start |
| `type="playFilled"` | Actions | `<PlayIcon />` | ✅ Similar | Play button filled |
| `type="plus"` | Actions | `<PlusIcon />` | ✅ Direct | Add/create |
| `type="plusInCircle"` | Actions | `<PlusCircleIcon />` | ✅ Direct | Add button |
| `type="plusInCircleFilled"` | Actions | `<PlusCircleIcon />` | ✅ Similar | Filled add button |
| `type="print"` | Actions | `<PrinterIcon />` | ✅ Direct | Print functionality |
| `type="push"` | Actions | `<SendIcon />` | ✅ Similar | Push/send |
| `type="questionInCircle"` | Actions | `<HelpCircleIcon />` | ✅ Direct | Help/info tooltips |
| `type="refresh"` | Actions | `<RefreshCwIcon />` | ✅ Direct | Refresh/reload |
| `type="save"` | Actions | `<SaveIcon />` | ✅ Direct | Save functionality |
| `type="search"` | Actions | `<SearchIcon />` | ✅ Direct | Search inputs |
| `type="share"` | Actions | `<ShareIcon />` | ✅ Direct | Share functionality |
| `type="sortable"` | Actions | `<ArrowUpDownIcon />` | ✅ Direct | Sortable indicator |
| `type="sortDown"` | Actions | `<ArrowDownIcon />` | ✅ Direct | Sort descending |
| `type="sortUp"` | Actions | `<ArrowUpIcon />` | ✅ Direct | Sort ascending |
| `type="starEmpty"` | Actions | `<StarIcon />` | ✅ Direct | Unfavorited |
| `type="starFilled"` | Actions | `<StarIcon />` | ✅ Similar | Favorited |
| `type="stop"` | Actions | `<StopCircleIcon />` | ✅ Direct | Stop action |
| `type="stopFilled"` | Actions | `<StopCircleIcon />` | ✅ Similar | Stop button filled |
| `type="symlink"` | Actions | `<LinkIcon />` | ✅ Similar | Symbolic link |
| `type="tableDensityExpanded"` | Actions | `<RowsIcon />` | ⚠️ No Match | Table density expanded |
| `type="tableDensityCompact"` | Actions | `<RowsIcon />` | ⚠️ No Match | Table density compact |
| `type="tableDensityNormal"` | Actions | `<RowsIcon />` | ⚠️ No Match | Table density normal |
| `type="tag"` | Actions | `<TagIcon />` | ✅ Direct | Tags/labels |
| `type="tear"` | Actions | `<SeparatorHorizontalIcon />` | ⚠️ No Match | Tear/separator |
| `type="training"` | Actions | `<GraduationCapIcon />` | ✅ Direct | Training/learning |
| `type="trash"` | Actions | `<TrashIcon />` | ✅ Direct | Delete actions |
| `type="unfold"` | Actions | `<UnfoldVerticalIcon />` | ✅ Direct | Expand/unfold |
| `type="unlink"` | Actions | `<UnlinkIcon />` | ✅ Direct | Unlink/disconnect |
| `type="upload"` | Actions | `<UploadIcon />` | ✅ Direct | Upload functionality |
| `type="user"` | Actions | `<UserIcon />` | ✅ Direct | User profile/account |
| `type="users"` | Actions | `<UsersIcon />` | ✅ Direct | Multiple users |
| `type="vector"` | Actions | `<VectorIcon />` | ⚠️ No Match | Vector graphics |
| `type="visArea"` | Actions | `<AreaChartIcon />` | ✅ Direct | Area chart |
| `type="visAreaStacked"` | Actions | `<AreaChartIcon />` | ✅ Similar | Stacked area chart |
| `type="visBarHorizontal"` | Actions | `<BarChart3Icon />` | ✅ Similar | Horizontal bar chart |
| `type="visBarHorizontalStacked"` | Actions | `<BarChart3Icon />` | ✅ Similar | Stacked horizontal bar |
| `type="visBarVertical"` | Actions | `<BarChart4Icon />` | ✅ Similar | Vertical bar chart |
| `type="visBarVerticalStacked"` | Actions | `<BarChart4Icon />` | ✅ Similar | Stacked vertical bar |
| `type="visLine"` | Actions | `<LineChartIcon />` | ✅ Direct | Line chart |
| `type="visPie"` | Actions | `<PieChartIcon />` | ✅ Direct | Pie chart |
| `type="visTable"` | Actions | `<TableIcon />` | ✅ Direct | Table view |
| `type="visTagCloud"` | Actions | `<CloudIcon />` | ✅ Similar | Tag cloud |
| `type="visText"` | Actions | `<TypeIcon />` | ✅ Direct | Text visualization |
| `type="visTimelion"` | Actions | `<TimelineIcon />` | ⚠️ No Match | Timelion visualization |
| `type="visVega"` | Actions | `<BarChartIcon />` | ✅ Similar | Vega visualization |
| `type="wordWrap"` | Actions | `<WrapTextIcon />` | ✅ Direct | Word wrap toggle |
| `type="wordWrapDisabled"` | Actions | `<WrapTextIcon />` | ✅ Similar | Word wrap disabled |
| `type="wrench"` | Actions | `<WrenchIcon />` | ✅ Direct | Tools/maintenance |

### Status & Feedback Icons
| OUI 1.x Icon | Category | Lucide React Icon | Status | Migration Notes |
|--------------|----------|-------------------|--------|-----------------|
| `type="alert"` | Status | `<AlertTriangleIcon />` | ✅ Direct | Warning states |
| `type="error"` | Status | `<XCircleIcon />` | ✅ Direct | Error states |
| `type="help"` | Status | `<HelpCircleIcon />` | ✅ Direct | Help/info tooltips |
| `type="iInCircle"` | Status | `<InfoIcon />` | ✅ Direct | Information display |
| `type="info"` | Status | `<InfoIcon />` | ✅ Direct | Information display |
| `type="online"` | Status | `<CircleIcon />` | ✅ Similar | Online status |
| `type="offline"` | Status | `<CircleIcon />` | ✅ Similar | Offline status |
| `type="partial"` | Status | `<CircleIcon />` | ✅ Similar | Partial status |
| `type="success"` | Status | `<CheckCircleIcon />` | ✅ Direct | Success state |
| `type="warning"` | Status | `<AlertTriangleIcon />` | ✅ Direct | Warning state |

### Data & Files
| OUI 1.x Icon | Category | Lucide React Icon | Status | Migration Notes |
|--------------|----------|-------------------|--------|-----------------|
| `type="apmApp"` | Data | `<ActivityIcon />` | ✅ Similar | APM application |
| `type="apmTrace"` | Data | `<GitBranchIcon />` | ✅ Similar | APM trace |
| `type="database"` | Data | `<DatabaseIcon />` | ✅ Direct | Database |
| `type="document"` | Data | `<FileTextIcon />` | ✅ Direct | Document/file |
| `type="documentEdit"` | Data | `<FileEditIcon />` | ✅ Direct | Edit document |
| `type="documents"` | Data | `<FilesIcon />` | ✅ Direct | Multiple documents |
| `type="empty"` | Data | `<CircleIcon />` | ✅ Similar | Empty state |
| `type="exportAction"` | Data | `<DownloadIcon />` | ✅ Direct | Export data |
| `type="importAction"` | Data | `<UploadIcon />` | ✅ Direct | Import data |
| `type="index"` | Data | `<LayersIcon />` | ✅ Similar | Index/layers |
| `type="indexClose"` | Data | `<ArchiveIcon />` | ✅ Similar | Close index |
| `type="indexEdit"` | Data | `<EditIcon />` | ✅ Similar | Edit index |
| `type="indexFlush"` | Data | `<RefreshCwIcon />` | ✅ Similar | Flush index |
| `type="indexMapping"` | Data | `<MapIcon />` | ✅ Similar | Index mapping |
| `type="indexOpen"` | Data | `<FolderOpenIcon />` | ✅ Similar | Open index |
| `type="indexRollup"` | Data | `<ArchiveIcon />` | ✅ Similar | Index rollup |
| `type="indexSettings"` | Data | `<SettingsIcon />` | ✅ Similar | Index settings |
| `type="logstashFilter"` | Data | `<FilterIcon />` | ✅ Direct | Logstash filter |
| `type="logstashIf"` | Data | `<GitBranchIcon />` | ✅ Similar | Logstash conditional |
| `type="logstashInput"` | Data | `<ArrowRightIcon />` | ✅ Similar | Logstash input |
| `type="logstashOutput"` | Data | `<ArrowLeftIcon />` | ✅ Similar | Logstash output |
| `type="logstashQueue"` | Data | `<ListIcon />` | ✅ Similar | Logstash queue |
| `type="storage"` | Data | `<HardDriveIcon />` | ✅ Direct | Storage |

### OpenSearch/Elasticsearch Specific
| OUI 1.x Icon | Category | Lucide React Icon | Status | Migration Notes |
|--------------|----------|-------------------|--------|-----------------|
| `type="analyzeEvent"` | OpenSearch | `<TrendingUpIcon />` | ✅ Similar | Event analysis |
| `type="auditbeatApp"` | OpenSearch | `<ShieldIcon />` | ✅ Similar | Auditbeat |
| `type="beaker"` | OpenSearch | `<FlaskConicalIcon />` | ✅ Direct | Experiments/testing |
| `type="canvasApp"` | OpenSearch | `<PaletteIcon />` | ✅ Similar | Canvas application |
| `type="codeApp"` | OpenSearch | `<CodeIcon />` | ✅ Direct | Code application |
| `type="consoleApp"` | OpenSearch | `<TerminalIcon />` | ✅ Direct | Console application |
| `type="crossClusterReplicationApp"` | OpenSearch | `<CopyIcon />` | ✅ Similar | Cross-cluster replication |
| `type="dashboardApp"` | OpenSearch | `<LayoutDashboardIcon />` | ✅ Direct | Dashboard application |
| `type="devToolsApp"` | OpenSearch | `<SettingsIcon />` | ✅ Similar | Developer tools |
| `type="discoverApp"` | OpenSearch | `<SearchIcon />` | ✅ Direct | Discover application |
| `type="filebeatApp"` | OpenSearch | `<FileIcon />` | ✅ Similar | Filebeat |
| `type="functionbeatApp"` | OpenSearch | `<ZapIcon />` | ✅ Similar | Functionbeat |
| `type="gisApp"` | OpenSearch | `<MapIcon />` | ✅ Direct | GIS application |
| `type="graphApp"` | OpenSearch | `<NetworkIcon />` | ✅ Direct | Graph application |
| `type="heartbeatApp"` | OpenSearch | `<HeartIcon />` | ✅ Direct | Heartbeat |
| `type="indexManagementApp"` | OpenSearch | `<SettingsIcon />` | ✅ Similar | Index management |
| `type="indexPatternApp"` | OpenSearch | `<PatternIcon />` | ⚠️ No Match | Index pattern |
| `type="lensApp"` | OpenSearch | `<EyeIcon />` | ✅ Similar | Lens application |
| `type="logsApp"` | OpenSearch | `<ScrollTextIcon />` | ✅ Direct | Logs application |
| `type="machineLearningApp"` | OpenSearch | `<BrainIcon />` | ✅ Direct | Machine learning |
| `type="managementApp"` | OpenSearch | `<SettingsIcon />` | ✅ Direct | Management app |
| `type="metricbeatApp"` | OpenSearch | `<ActivityIcon />` | ✅ Direct | Metricbeat |
| `type="metricsApp"` | OpenSearch | `<BarChartIcon />` | ✅ Direct | Metrics application |
| `type="monitoringApp"` | OpenSearch | `<MonitorIcon />` | ✅ Direct | Monitoring application |
| `type="notebookApp"` | OpenSearch | `<BookOpenIcon />` | ✅ Direct | Notebook application |
| `type="packetbeatApp"` | OpenSearch | `<NetworkIcon />` | ✅ Direct | Packetbeat |
| `type="pipelineApp"` | OpenSearch | `<GitBranchIcon />` | ✅ Similar | Pipeline application |
| `type="reportingApp"` | OpenSearch | `<FileTextIcon />` | ✅ Similar | Reporting application |
| `type="savedObjectsApp"` | OpenSearch | `<ArchiveIcon />` | ✅ Similar | Saved objects |
| `type="searchProfilerApp"` | OpenSearch | `<SearchIcon />` | ✅ Similar | Search profiler |
| `type="securityAnalyticsApp"` | OpenSearch | `<ShieldIcon />` | ✅ Similar | Security analytics |
| `type="securityApp"` | OpenSearch | `<ShieldIcon />` | ✅ Direct | Security application |
| `type="spacesApp"` | OpenSearch | `<LayoutGridIcon />` | ✅ Similar | Spaces application |
| `type="sqlApp"` | OpenSearch | `<DatabaseIcon />` | ✅ Similar | SQL application |
| `type="timelionApp"` | OpenSearch | `<LineChartIcon />` | ✅ Similar | Timelion application |
| `type="upgradeAssistantApp"` | OpenSearch | `<ArrowUpIcon />` | ✅ Similar | Upgrade assistant |
| `type="uptimeApp"` | OpenSearch | `<TrendingUpIcon />` | ✅ Similar | Uptime application |
| `type="usersRolesApp"` | OpenSearch | `<UsersIcon />` | ✅ Direct | Users and roles |
| `type="visualizeApp"` | OpenSearch | `<BarChartIcon />` | ✅ Direct | Visualize application |
| `type="watchesApp"` | OpenSearch | `<EyeIcon />` | ✅ Similar | Watches application |
| `type="winlogbeatApp"` | OpenSearch | `<MonitorIcon />` | ✅ Similar | Winlogbeat |

### System & Hardware
| OUI 1.x Icon | Category | Lucide React Icon | Status | Migration Notes |
|--------------|----------|-------------------|--------|-----------------|
| `type="aggregate"` | System | `<LayersIcon />` | ✅ Similar | Data aggregation |
| `type="branch"` | System | `<GitBranchIcon />` | ✅ Direct | Git branch/workflow |
| `type="cloudDrizzle"` | System | `<CloudDrizzleIcon />` | ✅ Direct | Light cloud activity |
| `type="cloudStormy"` | System | `<CloudLightningIcon />` | ✅ Direct | Heavy cloud activity |
| `type="cloudSunny"` | System | `<CloudIcon />` | ✅ Similar | Normal cloud |
| `type="cluster"` | System | `<ServerIcon />` | ✅ Similar | Server cluster |
| `type="console"` | System | `<TerminalIcon />` | ✅ Direct | Terminal/console |
| `type="controlsHorizontal"` | System | `<SlidersHorizontalIcon />` | ✅ Direct | Horizontal controls |
| `type="controlsVertical"` | System | `<SlidersVerticalIcon />` | ✅ Direct | Vertical controls |
| `type="currency"` | System | `<DollarSignIcon />` | ✅ Similar | Currency/cost |
| `type="discuss"` | System | `<MessageCircleIcon />` | ✅ Direct | Discussion/chat |
| `type="editorAlignCenter"` | System | `<AlignCenterIcon />` | ✅ Direct | Center align |
| `type="editorAlignLeft"` | System | `<AlignLeftIcon />` | ✅ Direct | Left align |
| `type="editorAlignRight"` | System | `<AlignRightIcon />` | ✅ Direct | Right align |
| `type="editorChecklist"` | System | `<CheckSquareIcon />` | ✅ Direct | Checklist |
| `type="editorCodeBlock"` | System | `<CodeIcon />` | ✅ Direct | Code block |
| `type="editorComment"` | System | `<MessageSquareIcon />` | ✅ Direct | Comment |
| `type="editorDistributeHorizontal"` | System | `<AlignHorizontalDistributeCenterIcon />` | ✅ Direct | Distribute horizontal |
| `type="editorDistributeVertical"` | System | `<AlignVerticalDistributeCenterIcon />` | ✅ Direct | Distribute vertical |
| `type="editorHeading"` | System | `<HeadingIcon />` | ✅ Direct | Heading |
| `type="editorLink"` | System | `<LinkIcon />` | ✅ Direct | Insert link |
| `type="editorOrderedList"` | System | `<ListOrderedIcon />` | ✅ Direct | Ordered list |
| `type="editorPositionBottomLeft"` | System | `<AlignEndVerticalIcon />` | ✅ Similar | Position bottom left |
| `type="editorPositionBottomRight"` | System | `<AlignEndVerticalIcon />` | ✅ Similar | Position bottom right |
| `type="editorPositionTopLeft"` | System | `<AlignStartVerticalIcon />` | ✅ Similar | Position top left |
| `type="editorPositionTopRight"` | System | `<AlignStartVerticalIcon />` | ✅ Similar | Position top right |
| `type="editorRedo"` | System | `<RedoIcon />` | ✅ Direct | Redo action |
| `type="editorStrike"` | System | `<StrikethroughIcon />` | ✅ Direct | Strikethrough |
| `type="editorTable"` | System | `<TableIcon />` | ✅ Direct | Insert table |
| `type="editorUndo"` | System | `<UndoIcon />` | ✅ Direct | Undo action |
| `type="editorUnorderedList"` | System | `<ListIcon />` | ✅ Direct | Unordered list |
| `type="email"` | System | `<MailIcon />` | ✅ Direct | Email |
| `type="faceHappy"` | System | `<SmileIcon />` | ✅ Direct | Happy face/positive |
| `type="faceNeutral"` | System | `<MehIcon />` | ✅ Direct | Neutral face |
| `type="faceSad"` | System | `<FrownIcon />` | ✅ Direct | Sad face/negative |
| `type="glasses"` | System | `<GlassesIcon />` | ⚠️ No Match | Glasses/reading |
| `type="globe"` | System | `<GlobeIcon />` | ✅ Direct | Global/worldwide |
| `type="grid"` | System | `<GridIcon />` | ✅ Direct | Grid view |
| `type="heatmap"` | System | `<GridIcon />` | ✅ Similar | Heatmap visualization |
| `type="image"` | System | `<ImageIcon />` | ✅ Direct | Image/picture |
| `type="inspect"` | System | `<SearchIcon />` | ✅ Similar | Inspect/examine |
| `type="ip"` | System | `<GlobeIcon />` | ✅ Similar | IP address |
| `type="keyboardShortcut"` | System | `<KeyboardIcon />` | ✅ Direct | Keyboard shortcut |
| `type="kqlField"` | System | `<FileTextIcon />` | ✅ Similar | KQL field |
| `type="kqlFunction"` | System | `<FunctionSquareIcon />` | ✅ Direct | KQL function |
| `type="kqlOperand"` | System | `<VariableIcon />` | ✅ Similar | KQL operand |
| `type="kqlSelector"` | System | `<MousePointerIcon />` | ✅ Similar | KQL selector |
| `type="kqlValue"` | System | `<HashIcon />` | ✅ Similar | KQL value |
| `type="layers"` | System | `<LayersIcon />` | ✅ Direct | Layers/stacking |
| `type="logoAWS"` | System | `<CloudIcon />` | ✅ Similar | AWS logo |
| `type="logoAzure"` | System | `<CloudIcon />` | ✅ Similar | Azure logo |
| `type="logoCloud"` | System | `<CloudIcon />` | ✅ Direct | Cloud logo |
| `type="logoDocker"` | System | `<ContainerIcon />` | ✅ Similar | Docker logo |
| `type="logoElastic"` | System | ⚠️ No Match | ⚠️ No Match | Elastic logo (brand specific) |
| `type="logoElasticStack"` | System | ⚠️ No Match | ⚠️ No Match | Elastic Stack logo |
| `type="logoElasticsearch"` | System | ⚠️ No Match | ⚠️ No Match | Elasticsearch logo |
| `type="logoGCP"` | System | `<CloudIcon />` | ✅ Similar | GCP logo |
| `type="logoGithub"` | System | `<GithubIcon />` | ✅ Direct | GitHub logo |
| `type="logoKibana"` | System | ⚠️ No Match | ⚠️ No Match | Kibana logo |
| `type="logoKubernetes"` | System | `<ContainerIcon />` | ✅ Similar | Kubernetes logo |
| `type="logoLogstash"` | System | ⚠️ No Match | ⚠️ No Match | Logstash logo |
| `type="logoSlack"` | System | `<MessageSquareIcon />` | ✅ Similar | Slack logo |
| `type="logoWebhook"` | System | `<WebhookIcon />` | ✅ Direct | Webhook logo |
| `type="magnet"` | System | `<MagnetIcon />` | ⚠️ No Match | Magnet/attraction |
| `type="mapMarker"` | System | `<MapPinIcon />` | ✅ Direct | Map marker |
| `type="memory"` | System | `<HardDriveIcon />` | ✅ Similar | Memory/storage |
| `type="merge"` | System | `<GitMergeIcon />` | ✅ Direct | Merge/combine |
| `type="moon"` | System | `<MoonIcon />` | ✅ Direct | Dark mode/night |
| `type="nested"` | System | `<LayersIcon />` | ✅ Similar | Nested structure |
| `type="number"` | System | `<HashIcon />` | ✅ Direct | Number/numeric |
| `type="pageSelect"` | System | `<FileIcon />` | ✅ Similar | Page selection |
| `type="pagesSelect"` | System | `<FilesIcon />` | ✅ Similar | Multiple page selection |
| `type="paperClip"` | System | `<PaperclipIcon />` | ✅ Direct | Attachment |
| `type="partition"` | System | `<SeparatorVerticalIcon />` | ✅ Similar | Partition/divide |
| `type="percent"` | System | `<PercentIcon />` | ✅ Direct | Percentage |
| `type="popout"` | System | `<ExternalLinkIcon />` | ✅ Direct | Open in new window |
| `type="pulse"` | System | `<ActivityIcon />` | ✅ Direct | Pulse/activity |
| `type="quote"` | System | `<QuoteIcon />` | ✅ Direct | Quote/citation |
| `type="recent"` | System | `<HistoryIcon />` | ✅ Direct | Recent/history |
| `type="reporter"` | System | `<FileTextIcon />` | ✅ Similar | Reporter/reporting |
| `type="scale"` | System | `<ScaleIcon />` | ✅ Direct | Scale/balance |
| `type="securitySignal"` | System | `<ShieldAlertIcon />` | ✅ Direct | Security signal |
| `type="securitySignalDetected"` | System | `<ShieldCheckIcon />` | ✅ Direct | Security signal detected |
| `type="securitySignalResolved"` | System | `<ShieldIcon />` | ✅ Similar | Security signal resolved |
| `type="shard"` | System | `<LayersIcon />` | ✅ Similar | Database shard |
| `type="snowflake"` | System | `<SnowflakeIcon />` | ✅ Direct | Snowflake/unique |
| `type="sortLeft"` | System | `<ArrowLeftIcon />` | ✅ Direct | Sort left |
| `type="sortRight"` | System | `<ArrowRightIcon />` | ✅ Direct | Sort right |
| `type="starEmptySpace"` | System | `<StarIcon />` | ✅ Similar | Star outline |
| `type="starFilledSpace"` | System | `<StarIcon />` | ✅ Similar | Star filled |
| `type="starMinusEmpty"` | System | `<StarOffIcon />` | ✅ Direct | Remove from favorites |
| `type="starMinusFilled"` | System | `<StarOffIcon />` | ✅ Similar | Remove favorite filled |
| `type="starPlusEmpty"` | System | `<StarIcon />` | ✅ Similar | Add to favorites |
| `type="starPlusFilled"` | System | `<StarIcon />` | ✅ Similar | Add favorite filled |
| `type="stats"` | System | `<BarChartIcon />` | ✅ Direct | Statistics |
| `type="string"` | System | `<TypeIcon />` | ✅ Similar | String/text type |
| `type="submodule"` | System | `<FolderIcon />` | ✅ Similar | Git submodule |
| `type="sun"` | System | `<SunIcon />` | ✅ Direct | Light mode/day |
| `type="temperature"` | System | `<ThermometerIcon />` | ✅ Direct | Temperature |
| `type="timeline"` | System | `<TimelineIcon />` | ⚠️ No Match | Timeline view |
| `type="tokenAlias"` | System | `<LinkIcon />` | ✅ Similar | Token alias |
| `type="tokenArray"` | System | `<BracketsIcon />` | ✅ Similar | Array token |
| `type="tokenBinary"` | System | `<BinaryIcon />` | ⚠️ No Match | Binary token |
| `type="tokenBoolean"` | System | `<ToggleLeftIcon />` | ✅ Similar | Boolean token |
| `type="tokenClass"` | System | `<BoxIcon />` | ✅ Similar | Class token |
| `type="tokenCompletionSuggester"` | System | `<SparklesIcon />` | ✅ Similar | Completion suggester |
| `type="tokenConstant"` | System | `<LockIcon />` | ✅ Similar | Constant token |
| `type="tokenDate"` | System | `<CalendarIcon />` | ✅ Direct | Date token |
| `type="tokenDenseVector"` | System | `<VectorIcon />` | ⚠️ No Match | Dense vector token |
| `type="tokenElement"` | System | `<BoxIcon />` | ✅ Similar | Element token |
| `type="tokenEnum"` | System | `<ListIcon />` | ✅ Similar | Enum token |
| `type="tokenEnumMember"` | System | `<CircleIcon />` | ✅ Similar | Enum member token |
| `type="tokenEvent"` | System | `<CalendarIcon />` | ✅ Similar | Event token |
| `type="tokenException"` | System | `<AlertTriangleIcon />` | ✅ Similar | Exception token |
| `type="tokenField"` | System | `<SquareIcon />` | ✅ Similar | Field token |
| `type="tokenFile"` | System | `<FileIcon />` | ✅ Direct | File token |
| `type="tokenFlattened"` | System | `<LayersIcon />` | ✅ Similar | Flattened token |
| `type="tokenFunction"` | System | `<FunctionSquareIcon />` | ✅ Direct | Function token |
| `type="tokenGeo"` | System | `<MapIcon />` | ✅ Direct | Geo token |
| `type="tokenHistogram"` | System | `<BarChartIcon />` | ✅ Direct | Histogram token |
| `type="tokenInterface"` | System | `<BoxIcon />` | ✅ Similar | Interface token |
| `type="tokenIP"` | System | `<GlobeIcon />` | ✅ Similar | IP token |
| `type="tokenJoin"` | System | `<LinkIcon />` | ✅ Similar | Join token |
| `type="tokenKey"` | System | `<KeyIcon />` | ✅ Direct | Key token |
| `type="tokenKeyword"` | System | `<TagIcon />` | ✅ Similar | Keyword token |
| `type="tokenMethod"` | System | `<FunctionSquareIcon />` | ✅ Similar | Method token |
| `type="tokenMetricCounter"` | System | `<HashIcon />` | ✅ Similar | Metric counter |
| `type="tokenMetricGauge"` | System | `<GaugeIcon />` | ✅ Direct | Metric gauge |
| `type="tokenMetricHistogram"` | System | `<BarChartIcon />` | ✅ Similar | Metric histogram |
| `type="tokenModule"` | System | `<PackageIcon />` | ✅ Similar | Module token |
| `type="tokenNamespace"` | System | `<FolderIcon />` | ✅ Similar | Namespace token |
| `type="tokenNested"` | System | `<LayersIcon />` | ✅ Similar | Nested token |
| `type="tokenNull"` | System | `<CircleIcon />` | ✅ Similar | Null token |
| `type="tokenNumber"` | System | `<HashIcon />` | ✅ Direct | Number token |
| `type="tokenObject"` | System | `<BracesIcon />` | ✅ Similar | Object token |
| `type="tokenOperator"` | System | `<PlusIcon />` | ✅ Similar | Operator token |
| `type="tokenPackage"` | System | `<PackageIcon />` | ✅ Direct | Package token |
| `type="tokenParameter"` | System | `<SettingsIcon />` | ✅ Similar | Parameter token |
| `type="tokenPercolator"` | System | `<FilterIcon />` | ✅ Similar | Percolator token |
| `type="tokenProperty"` | System | `<SettingsIcon />` | ✅ Similar | Property token |
| `type="tokenRange"` | System | `<ArrowUpDownIcon />` | ✅ Similar | Range token |
| `type="tokenRankFeature"` | System | `<TrendingUpIcon />` | ✅ Similar | Rank feature token |
| `type="tokenRankFeatures"` | System | `<TrendingUpIcon />` | ✅ Similar | Rank features token |
| `type="tokenRepo"` | System | `<FolderIcon />` | ✅ Similar | Repository token |
| `type="tokenSearchType"` | System | `<SearchIcon />` | ✅ Similar | Search type token |
| `type="tokenShape"` | System | `<CircleIcon />` | ✅ Similar | Shape token |
| `type="tokenString"` | System | `<TypeIcon />` | ✅ Similar | String token |
| `type="tokenStruct"` | System | `<BoxIcon />` | ✅ Similar | Struct token |
| `type="tokenSymbol"` | System | `<HashIcon />` | ✅ Similar | Symbol token |
| `type="tokenTag"` | System | `<TagIcon />` | ✅ Direct | Tag token |
| `type="tokenText"` | System | `<TypeIcon />` | ✅ Direct | Text token |
| `type="tokenTokenCount"` | System | `<HashIcon />` | ✅ Similar | Token count |
| `type="tokenVariable"` | System | `<VariableIcon />` | ✅ Direct | Variable token |

### Icons With No Lucide Equivalent
| OUI 1.x Icon | Category | Suggested Alternative | Status | Migration Notes |
|--------------|----------|----------------------|--------|-----------------|
| `type="logoElastic"` | Branding | Custom SVG | ⚠️ No Match | Brand-specific, use OpenSearch branding |
| `type="logoElasticStack"` | Branding | Custom SVG | ⚠️ No Match | Brand-specific, use OpenSearch equivalent |
| `type="logoElasticsearch"` | Branding | Custom SVG | ⚠️ No Match | Brand-specific, use OpenSearch branding |
| `type="logoKibana"` | Branding | Custom SVG | ⚠️ No Match | Brand-specific, use OpenSearch Dashboards |
| `type="logoLogstash"` | Branding | Custom SVG | ⚠️ No Match | Brand-specific, consider generic pipeline icon |
| `type="broom"` | Actions | Custom SVG or `<EraseIcon />` | ⚠️ No Match | Cleaning/clearing actions |
| `type="glasses"` | System | Custom SVG | ⚠️ No Match | Reading/accessibility |
| `type="magnet"` | System | Custom SVG | ⚠️ No Match | Attraction/magnetic force |
| `type="tableDensityExpanded"` | Actions | Custom spacing icon | ⚠️ No Match | Table row density settings |
| `type="tableDensityCompact"` | Actions | Custom spacing icon | ⚠️ No Match | Table row density settings |
| `type="tableDensityNormal"` | Actions | Custom spacing icon | ⚠️ No Match | Table row density settings |
| `type="tear"` | Actions | Custom separator | ⚠️ No Match | Visual separator/tear line |
| `type="timeline"` | System | Custom timeline SVG | ⚠️ No Match | Timeline visualization |
| `type="tokenBinary"` | System | Custom binary icon | ⚠️ No Match | Binary data type |
| `type="tokenDenseVector"` | System | Custom vector icon | ⚠️ No Match | Dense vector data type |
| `type="vector"` | Actions | Custom vector icon | ⚠️ No Match | Vector graphics |
| `type="visTimelion"` | Actions | Custom chart icon | ⚠️ No Match | Timelion-specific visualization |
| `type="indexPatternApp"` | OpenSearch | Custom pattern icon | ⚠️ No Match | Index pattern management |

**Sizing Guidelines**: All icons should use consistent Tailwind sizing classes:
- Small: `h-4 w-4` (16px)
- Medium: `h-5 w-5` (20px)
- Large: `h-6 w-6` (24px)
- Extra Large: `h-8 w-8` (32px)

**Migration Strategy for Missing Icons**:
1. **Direct replacements**: Use the Lucide equivalent (✅ Direct)
2. **Similar replacements**: Use closest semantic match (✅ Similar)
3. **No equivalent**: Create custom SVG icons or find alternative solutions (⚠️ No Match)
4. **Brand-specific icons**: Replace with OpenSearch equivalents or remove

## Migration Priority by Usage

Based on expected frequency in OpenSearch Dashboards codebase:

### High Priority (Phase 1 Planned - Needs Verification)
1. **EuiButton** - Most commonly used interactive component
2. **EuiFlexGroup/EuiFlexItem** - Core layout primitives
3. **EuiText/EuiTitle** - Typography fundamentals
4. **EuiFormRow/EuiFieldText** - Form basics
5. **EuiCard** - Content display
6. **EuiAlert** - User feedback
7. **EuiContainer** - Layout container
8. **EuiIcon** - Visual communication

### Medium Priority (Unknown Phase)
1. **EuiBasicTable** - Data display (complex implementation needed)
2. **EuiModal/EuiConfirmModal** - Modal interactions
3. **EuiPopover** - Contextual content
4. **EuiTabs** - Content organization
5. **EuiSelect/EuiComboBox** - Advanced form inputs

### Lower Priority (Complex/Specialized)
1. **EuiDataGrid** - Advanced data visualization
2. **EuiInMemoryTable** - Complex data interactions
3. **Visualization components** - Domain-specific functionality

## System Gaps Analysis

Components and icons marked as ⚠️ **No Equivalent** represent gaps in the OUI 2.x system that need architectural decisions:

### Application Architecture Gaps
**Components without direct equivalents that require design system decisions:**
- **EuiHeader** / **EuiHeaderSection** / **EuiHeaderSectionItem** - Application header composition patterns
- **EuiStat** - Dashboard metric display (common in analytics apps)
- **EuiHealth** - Status visualization (important for system monitoring)
- **EuiComment** - User-generated content display
- **EuiSuperDatePicker** - OpenSearch-specific date selection (critical for data exploration)
- **EuiFacetButton** - Search refinement UI patterns
- **EuiKeyPadMenu** / **EuiKeyPadMenuItem** - App launcher/grid navigation
- **EuiExpression** - Query/filter expression UI
- **EuiTour** / **EuiTourStep** / **EuiBeacon** - User onboarding and guidance

### Utility & Performance Gaps
**Low-level utilities that may need replacement strategies:**
- **EuiDelayHide** / **EuiDelayRender** - Performance optimization utilities
- **EuiI18n** - Internationalization wrapper (critical for global applications)
- **EuiInnerText** - Text extraction utility
- **EuiMutationObserver** / **EuiResizeObserver** / **EuiWindowEvent** - DOM observation utilities

### Layout & Interface Gaps
**Specialized layout components:**
- **EuiBottomBar** / **EuiControlBar** - Fixed control interfaces
- **EuiSplitPanel** / **EuiResizableContainer** - Resizable layouts (important for dashboards)
- **EuiLoadingKibana** / **EuiLoadingElastic** - Brand-specific loading states

### Icon System Gaps
**Icons requiring custom implementation (19 total):**
- **Brand logos**: Elastic, Elasticsearch, Kibana, Logstash (need OpenSearch equivalents)
- **Specialized UI**: Table density controls, timeline, vector graphics, binary icons
- **Domain-specific**: Index pattern, Timelion visualization, tear separators

### Gap Impact Assessment
- **High Impact**: 9 components (Header system, date pickers, stats, health indicators)
- **Medium Impact**: 8 components (Tours, expressions, keypad menus, control bars)
- **Low Impact**: 15+ utilities and specialized components
- **Icon Impact**: 19 icons need custom solutions

### Recommendations
1. **Prioritize high-impact gaps** in Phase 2 planning
2. **Create OpenSearch-specific variants** for domain components (SuperDatePicker, etc.)
3. **Develop consistent patterns** for stat displays, health indicators, and headers
4. **Custom icon library** for missing icons with consistent design language

## Update Guidelines

### When You Migrate a Component:
1. **Before migration**: Check this table for current mapping
2. **During migration**: Note any deviations from the mapping
3. **After migration**: Update status to ✅ and add any learnings
4. **Document changes**: Update prop mappings if they differ from expectations

### Adding Your Learnings:
- Update the "Migration Notes" column with specific insights
- If prop mappings are incorrect, fix them in the table
- Add new components discovered during migration
- Update the status when components become available

---

**📝 Update Instructions**: Keep this document current as the authoritative mapping reference for all OUI migrations.
**🔄 Review Schedule**: Update component statuses monthly as development progresses.