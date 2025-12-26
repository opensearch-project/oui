<p align="center"><img src="https://opensearch.org/assets/brand/SVG/Logo/opensearch_dashboards_logo_darkmode.svg" height="64px"/></p>
<h1 align="center">OUI Developer Guide</h1>

This guide applies to all development within the OpenSearch Dashboards project and is recommended for the development of all OpenSearch Dashboards plugins.

- [Running locally](#running-locally)
  - [Node](#node)
  - [Start documentation server](#start-documentation-server)
- [Documentation](#documentation)
- [Maintenance and contributing](#maintenance-and-contributing)

## Running locally

### Node

We depend upon the version of node defined in [.nvmrc](.nvmrc).

You will probably want to install a node version manager. [nvm](https://github.com/creationix/nvm) is recommended.

To install and use the correct node version v with `nvm`:

v - version mentioned in [.nvmrc](.nvmrc).

```
nvm install
```

And then also set the node version to use in your terminal

```
nvm use
```

Confirm the version of node by running:
```
yarn node --version
```

### Start documentation server

Make sure dependencies are installed with:

```
yarn
```

You can run the documentation locally at [http://localhost:8030/](http://localhost:8030/) by running the following.

```
yarn start
```

If another process is already listening on port 8030, the next free port will be used. Alternatively, you can specify a port:

```
yarn start --port 9000
```

## Documentation

### Component Development
* [Design System Governance](wiki/design-system-governance.md) - Component standards and governance framework
* [Component development](wiki/component-development.md) - Complete guide for adding and developing components
  * [Creating components manually](wiki/creating-components-manually.md) - Step-by-step component creation
  * [Creating components with Yeoman](wiki/creating-components-yeoman.md) - Legacy Yeoman approach (deprecated)
* [Testing](wiki/testing.md) - Component testing with Storybook

### Storybook & Documentation
* [Storybook naming conventions](wiki/storybook-naming-conventions.md) - File naming and organization
* [Storybook template pattern](wiki/storybook-template-pattern.md) - Story structure and examples
* [Documentation guidelines](wiki/documentation-guidelines.md) - Writing and organizing documentation

### Styling & Theming
* [Theming](wiki/theming.md) - CSS custom properties and theme system
* [Naming conventions reference](wiki/naming-conventions-reference.md) - Component and class naming

### OUI 1.x to 2.x Migration
* [Migration Guide](wiki/design-system-migration-guide.md) - Guide to migrating from OUI 1.x to 2.x
* [AI Assistant Migration Guide](wiki/agents/ai-assistant-migration-guide.md) - Migration guide for AI Assistants
* [1.x to 2.x Component Mapping](wiki/oui-1.x-2.x-component-mapping-reference.md) - Component mapping for migration

### Other Guides
* [Consuming OUI](wiki/consuming.md) - How to use OUI in your projects
* [Creating icons](wiki/creating-icons.md) - Adding and designing icons
* [Releasing versions](wiki/releasing-versions.md) - Release management process
* [Automated accessibility testing](wiki/automated-accessibility-testing.md) - A11y testing setup
* [Validating with OpenSearch Dashboards](wiki/validating-with-opensearch-dashboards.md) - Integration testing

## Maintenance and contributing

[CONTRIBUTING.md](CONTRIBUTING.md)