# Documentation guidelines

Always remember to update [documentation site][docs] via the `src-docs` folder and the `CHANGELOG.md` in the same PR that contains functional changes. We do this in tandem to prevent our examples from going out of sync with the actual components. In this sense, treat documentation no differently than how you would treat tests.

The complexity of the component should determine how many examples you need to create, and how complex they should be. In general, your examples should demonstrate:

* The most common use-cases for the component.
* How the component handles edge cases, e.g. overflowing content, text-based vs. element-based content.
* The various states of the component, e.g. disabled, selected, empty of content, error state.

## Writing docs

Here are our formatting guidelines for writing documentation:

- Use sentence case, always, for page and section titles. Example: `This component does something`
- When referencing the component name, wrap it in `<strong>` tags. Example: `<strong>OuiComponent</strong>`
- When referencing the component name, always include the `Oui` prefix unless you are referencing the generic term. Example: `OuiFlyout` vs `flyout`
- Wrap references to prop names and elements in `<OuiCode>` blocks. Example: `<OuiCode>propName</OuiCode>`
- If the code reference is more than a single prop name or value, add the language type. Example: `<OuiCode language="js">propName=true</OuiCode>`
- When referencing another OUI component, wrap the reference in a link to the component. Example: `<Link to="/component/url><strong>OuiComponent</strong><Link>`

## Linking between OUI doc pages/components

In instances where you would like to provide a link to another OUI component
referenced in a given component description or example, take advantage of `react-router`,
which is used for routing in OUI docs. Aside from the benefit of shorter path names, `react-router` will take the environment into account and provide the correct URL for both development and production locations.

### Basic example:

```js
import {
  Link,
} from 'react-router-dom';

// ...

Consult the larger <Link to="/guidelines/colors">color guidelines</Link> page
for a better explanation about passing color contrast.
```

### Linking to external resources

When referring to external sites or resources, use OUI components that take an `href` prop, such as `OuiLink`.

#### Basic example:

```js
import {
  OuiLink,
} from '/src/components';

// ...

<OuiLink href="https://github.com/opensearch-project/oui/blob/master/src/global_styling/mixins/_shadow.scss">View the Sass code for shadow mixins</OuiLink>.
```

## Adding snippets

There are a couple themes to keep in mind when adding snippets:

### Ask yourself
- Does this snippet provide the consumer with everything it needs for the component to work?
- Does this snippet provide the details of a specific object the component needs to work?
- If it doesn't provide either and the whole demo JS is needed for the component to work, then it's probably best to not add a snippet.

### Stay consistent
- Don't use `this.`, but write the snippet like a **Function Component**.
- Use descriptive JS variables in place of **consumer generated** strings, functions, states and node prop types.
- All other props, like enums, should be written with proper value types.

``` js
<OuiPopover
  id={popoverId}
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}
  anchorPosition="downLeft"
>
  <!-- Popover content -->
</OuiPopover>
```

- If the demo code provides lots of examples, this is probably mostly for us maintainers to manage all the different states. However, **the consumer really just needs a single basic snippet**. In some cases, you can add a second one with the **most commonly used props**. The basic example should always come first.

```js
<OuiLink href="#"><!-- Link text --></OuiLink>
```

```js
<OuiLink href="#" color="success">
  <!-- Colored link text -->
</OuiLink>
```


- Use HTML comments to suggest what the `children` might be.

``` js
<OuiText color="danger"><!-- Raw HTML content --></OuiText>
```

- The snippet should illustrate when a component requires its children to be wrapped with a specific tag.

``` js
<OuiCallOut>
  <p><!-- Content --></p>
</OuiCallOut>
```

- When a component contains a single element child the snippet should illustrate it. Enforce best practices by providing a description.

``` js
<OuiTitle>
  <h2><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
</OuiTitle>
```

- When a prop receives an array of objects, display only one object and show all the required keys.

``` js
<OuiSteps
  steps={[
    {
      title: 'Step 1',
      children: <p>Do this first</p>,
    },
  ]}
/>
```

## Adding playground toggles

Most documentation pages include a [playground section](https://elastic.github.io/eui/#/layout/accordion/playground) where consumers can interact with the component's props to see in real time how different configurations affect visual and functional output. Generally, the playground system will automatically generate the correct toggle type; for instance, a text input for props that accept string values, and a switch input for props that accept boolean values.

### Toggles for required props

Props marked required for a component typically do not have default values and therefore need to be set for the playground to work well. For example, the `children` prop, which can be set in the component's [`playground.js` file](https://github.com/opensearch-project/oui/blob/master/src-docs/src/views/accordion/playground.js):

```js
propsToUse.children = {
  value: `<OuiText>
    <p>
      Any content inside of <strong>OuiAccordion</strong> will appear here.
    </p>
  </OuiText>`,
  type: PropTypes.ReactNode,
  hidden: false,
};
```
### Custom or altered toggles

Some props accept values that are difficult to parse or require knowledge about how the prop should be used to determine the type of toggle to use. For example, callback function props such as `onToggle`. For cases like this we may provide utility functions to help:

```js
propsToUse.onToggle = simulateFunction(propsToUse.onToggle);
```

Or perhaps the prop accepts a wide range of values and the best user experience would be to limit the value to a simpler input:

```js
propsToUse.valueAppend = {
  ...propsToUse.valueAppend,
  type: PropTypes.String,
};
```

### Toggles for complex or markup-heavy props

Not all props lend themselves to becoming helpful playground toggles. For instance, optional "action" props that require the consumer to provide a fully configured button or link element. In cases such as this, it is acceptable to omit the toggle and rely on prop table documentation to convey how the prop is best used.

## Full screen demos

OUI's documentation sections provide an easy way to create full screen demos that are simply blank pages (no headers or other chrome). To create a basic full screen demo with a built-in button add the following as your section.

```tsx
{
  title: '',
  fullScreen: {
    slug: 'url-you-want',
    demo: <FullScreenDemo />,
  }
}
```

If you want something other than a button to display in the default demo render, you can still provide a `demo` key.

```tsx
{
  title: '',
  demo: <Demo />,
  fullScreen: {
    slug: 'url-you-want',
    demo: <FullScreenDemo />,
  }
}
```

In your full screen demo component, you'll want to provide an easy exit back to the original page. You can do this by adding a button wrapped with `ExampleContext.consumer` which passes the `parentPath` through.

```tsx
import { ExampleContext } from '../../services';

<ExampleContext.Consumer>
  {({ parentPath }) => (
    <OuiButton fill href={`#${parentPath}`} iconType="exit">
      Exit full screen
    </OuiButton>
  )}
</ExampleContext.Consumer>
```

## Changelog

Any updates to the `src/` folder require an entry in the [CHANGELOG.md](../CHANGELOG.md) file. Documentation-only changes do not. Here are our guidelines for updating the file:

* Append your changes to the `master` sub-heading of `CHANGELOG.md`.
* Add a list item for each significant change in the PR: bugs that were fixed, new features, new components, or changes to the public API
* In the list item, always link to any relevant pull requests
* Add a summary of what has changed, making sure it's informative to consumers who might be unaware of implementation details
* Avoid documenting internal implementation changes that don't affect the public interface
* Write your entry in the **past tense**, starting with a verb (e.g. Added... , Fixed...)

[docs]: https://elastic.github.io/eui/
