<p align="center"><img src="https://opensearch.org/assets/brand/SVG/Logo/opensearch_dashboards_logo_darkmode.svg" height="64px"/></p>
<h1 align="center">OUI Developer Guide</h1>

This guide applies to all development within the OpenSearch Dashboards project and is recommended for the development of all OpenSearch Dashboards plugins.

- [Running locally](#running-locally)
  - [Node](#node)
  - [Start documentation server](#start-documentation-server)
- [Maintenance and contributing](#maintenance-and-contributing)

## Running locally

### Node

We depend upon the version of node defined in [.nvmrc](.nvmrc).

You will probably want to install a node version manager. [nvm](https://github.com/creationix/nvm) is recommended.

To install and use the correct node version with `nvm`:

```
nvm install
```

### Start documentation server

You can run the documentation locally at [http://localhost:8030/](http://localhost:8030/) by running the following.

```
yarn
yarn start
```

If another process is already listening on port 8030, the next free port will be used. Alternatively, you can specify a port:

```
yarn start --port 9000
```
## Maintenance and contributing

[CONTRIBUTING.md](CONTRIBUTING.md)

* [Component design](wiki/component-design.md)
* [Component development](wiki/component-development.md)
  * [Creating components manually](wiki/creating-components-manually.md)
  * [Creating components with Yeoman](wiki/creating-components-yeoman.md)
* [Creating icons](wiki/creating-icons.md)
* [Theming](wiki/theming.md)
* [Testing](wiki/testing.md)
  * [Accessibility Testing](wiki/automated-accessibility-testing.md)
* [Documentation](wiki/documentation-guidelines.md)
* [Releasing versions](wiki/releasing-versions.md)
