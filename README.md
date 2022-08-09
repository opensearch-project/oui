# OpenSearch UI Framework

> The OpenSearch UI Framework is a collection of React UI components for quickly building user interfaces
> at OpenSearch Project. Not using React? No problem! You can still use the CSS behind each component.

You should check out our [living style guide][docs], which contains many examples of components in the OUI framework aesthetic, and how to use them in your products. We also have a [FAQ][faq] that covers common usage questions.

## Installation

To install the OpenSearch UI Framework into an existing project, use the `yarn` CLI (`npm` is not supported).

```
yarn add @opensearch-project/oui
```

Note that OUI has [several `peerDependencies` requirements](package.json) that will also need to be installed if starting with a blank project. You can read more about other ways to [consume OUI][consuming].

```
yarn add @opensearch-project/oui @elastic/datemath moment prop-types
```


## Running Locally

### Node

We depend upon the version of node defined in [.nvmrc](.nvmrc).

You will probably want to install a node version manager. [nvm](https://github.com/creationix/nvm) is recommended.

To install and use the correct node version with `nvm`:

```
nvm install
```

### Documentation

You can run the documentation locally at [http://localhost:8030/](http://localhost:8030/) by running the following.

```
yarn
yarn start
```

If another process is already listening on port 8030, the next free port will be used. Alternatively, you can specify a port:

```
yarn start --port 9000
```

## Goals

The primary goal of this library is to provide reusable UI components that can be used throughout
OpenSearch web products. As React components, they remove CSS from the process of building UIs.
As a single source of truth, the framework allows our designers to make changes to our aesthetic
directly in the code. And unit test coverage for the UI components allows us to deliver a stable
"API for user interfaces".


## Wiki

### Consumption

* [Consuming OUI][consuming]
* [Using OUI with react-router](wiki/react-router.md)

### Maintenance / Contributing

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

## License

[Apache Licensed.][license] Read the [FAQ][faq] for details.

[license]: LICENSE
[faq]: FAQ.md
[consuming]: wiki/consuming.md
[docs]: https://elastic.github.io/eui/
