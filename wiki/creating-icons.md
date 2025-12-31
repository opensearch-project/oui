# Creating icons

OUI 2.x provides a comprehensive icon system combining curated Lucide React icons with custom OUI icons. If you need an icon that doesn't exist in our collection, create a new issue and tag it with the *icons* label. A designer from the OUI team will respond to discuss your needs.

If you are willing and able to design the icon yourself, this document describes the guidelines for designing a new custom icon, cleaning up the SVG, and getting it added to OUI. While designers on the OUI team are available to assist, we greatly appreciate your contributions and pull requests.

If you read through these guidelines or begin designing your icon and realize you're in too deep, then create an issue in this repo and request assistance. An OUI team member will reply and discuss options.

## Icon System Overview

OUI 2.x provides two types of icons:

1. **Lucide React Icons**: A curated collection of 118+ icons from the lucide-react package, all following consistent naming with "Icon" suffix
2. **Custom OUI Icons**: SVG-based icons specific to OpenSearch/OUI use cases, automatically generated as React components

All icons are imported from a single source:

```typescript
import { SearchIcon, UserIcon, DiscoverIcon } from '@opensearch-project/oui';
```

## Design the icon

From a content perspective, we've taken an approach of being open to many types of icons so long as they don't duplicate an icon that already exists. Stylistically, we have more stringent requirements outlined below.

### Content

While we're pretty much open to all requests, we ask that you first try to use an existing icon as this helps us avoid having multiple versions of the same glyph.  Likewise, if there is a universally known icon that represents an action, we recommend leveraging those existing patterns (e.g. a scissors for cut).

Finding and sharing reference icons is a great way to get moving if you're uncertain of the general shape. Post these examples to your issue and we'll provide feedback.

Lastly, we reserve the right to reject any icons that do not fit the OUI style or may be deemed inappropriate.

### Style

<!-- TODO: update with new Icon style guidelines: https://lucide.dev/guide/design/icon-design-guide -->

This is where things get more opinionated. To maintain a cohesive, high quality icon set, we require that all new glpyhs adhere to the following guidelines:

- Use an outline style with a 1 pixel width stroke, straight edges, rounded corners and ends
- Adhere to an overall 16 pixel square shape

![Dimensions](https://user-images.githubusercontent.com/446285/63458957-56bd8c00-c419-11e9-958c-9fd912736180.png)

- Center the glyph in the square leaving a 1 or 2 pixel trim area, where possible
- Align vertical and horizontal paths to a 16x16 pixel grid

![Guides](https://user-images.githubusercontent.com/446285/63458958-5624f580-c419-11e9-89cf-45fa1b596329.png)

#### _For Sketch users_
_As a reference, you can download and view the `icons.sketch` file via the **Sketch libraries** link atop the [OUI documentation site][docs] site. The Symbols page within this file contains artboards for the vast majority of OUI glyphs._

#### _For non-Sketch users_
_While we use Sketch to maintain our internal design library, you can use any design tool to produce the SVG file._

## Before Adding a Custom Icon

First, check if a suitable icon already exists in our Lucide React collection:
1. Browse available icons at `http://localhost:6006/?path=/story/ui-icons--default` when running Storybook locally
2. Search through our curated collection of 118+ Lucide icons organized by category
3. If a Lucide icon meets your needs, use it instead of creating a custom one

If no suitable Lucide icon exists, proceed with creating a custom icon.

## Add a Custom Icon to OUI

Once you've designed your new icon, follow these steps to add it to the OUI repo.

### Clean the SVG

OUI provides SVG icon formats only. After exporting your icon as an SVG from your design tool, open it in a code or text editor and remove any unnecessary elements and attributes, such as:
- `<def>...</def>`
- `<use>...</use>`
- `id: <value>`
- `fill: <value>`
- `fill-rule: <value>` or `fillRule: <value>`

_**Note**: Sketch users can use the [SVGO plugin][sketch-SVGO-plugin] to remove any extraneous code added by Sketch. Once installed, this plugin will run automatically any time an SVG is exported from Sketch._

### Prepare the pull request

Create a new feature branch against this repo and make the following changes:

_1. Add your SVG to the custom icons directory_
- Add your cleaned SVG file to `/src/components/custom/icons/custom/` folder
- Use kebab-case naming (e.g., `my-new-icon.svg`)
- The build system will automatically generate a PascalCase component name with "Icon" suffix (e.g., `MyNewIconIcon`)

_2. Generate the React component_
- Run `yarn build:icons` to generate the React component from your SVG
- This creates a TypeScript component in the same directory following OUI patterns
- The component automatically includes proper TypeScript types and forwardRef implementation

_3. Compile and test_
- Run `yarn build` to build the complete package
- Add your icon to the Icons story
- Preview your icon in Storybook at `http://localhost:6006/?path=/story/ui-icons--default`
- Your icon will appear in the "Custom OUI Icons" section
- Switch between light and dark themes to verify visibility
- Run `yarn test` to ensure all tests pass

If everything looks good, then commit your changes, push up your branch, and open a PR! :raised_hands:

Opening a PR will notify the OUI team that your work is ready for review. Please include a screenshot in the description and reference the issue that your PR fixes.

### Ship it
Once your PR is approved, you will be able to merge it and give yourself a well-deserved pat on the back. Finally, stay tuned for the next release of OUI at which point your icon will become available to the masses and appear on the OUI Storybook site.

## Usage

After your icon is published, consumers can use it like any other OUI icon:

```typescript
import { MyNewIcon } from '@opensearch-project/oui';

// Use with all standard icon props
<MyNewIcon size={24} className="text-blue-500" strokeWidth={2} />
```

[icons]: https://oui.opensearch.org/#/display/icons
[docs]: https://oui.opensearch.org
[sketch-SVGO-plugin]: [https://www.sketch.com/extensions/plugins/svgo-compressor/]
[sketch-symbol-organizer-plugin]: [https://github.com/sonburn/symbol-organizer]
