![OpenSearch logo](https://opensearch.org/assets/img/opensearch-logo-themed.svg)
# OpenSearch UI Framework

- [Welcome!](#welcome)
- [Installation](#installation)
- [Project Resources](#project-resources)
- [Project Style Guidelines](#project-style-guidelines)
- [Code of Conduct](#code-of-conduct)
- [License](#license)
- [Copyright](#copyright)

## Welcome!

> The OpenSearch UI (OUI) Framework is a collection of React UI components for quickly building user interfaces
> for the OpenSearch Project.

You should check out our [living style guide][docs], which contains many examples of components in the OUI framework aesthetic, and how to use them in your products. We also have a [FAQ][FAQ.md] that covers common usage questions.

### Goals

The primary goal of this library is to provide reusable UI components that can be used in any
OpenSearch project web project. As React components, they remove CSS from the process of building UIs.
As a single source of truth, the framework allows our designers to make changes to our aesthetic
directly in the code. And unit test coverage for the UI components allows us to deliver a stable
"API for user interfaces".

## Installation

To install the OpenSearch UI Framework into an existing project, use the `yarn` CLI (`npm` is not supported).

```
yarn add @opensearch-project/oui
```

Note that OUI has [several `peerDependencies` requirements](package.json) that will also need to be installed if starting with a blank project. You can read more about other ways to [consume OUI][consuming].

## Project Resources

* [FAQ](FAQ.md)
* [Project Website](https://opensearch.org/)
* [Downloads](https://opensearch.org/downloads.html)
* [Documentation](https://opensearch.org/docs/latest/)
* Need help? Try [Forums](https://forum.opensearch.org/)
* [Project Principles](https://opensearch.org/about.html#principles-for-development)
* [Contributing to OpenSearch](CONTRIBUTING.md)
* [Maintainer Responsibilities](RESPONSIBILITIES.md)
* [Release Management](RELEASING.md)
* [Organization Admins](ADMINS.md)
* [Repo Maintainers](MAINTAINERS.md)
* [Security](SECURITY.md)

## Project Style Guidelines

The [OpenSearch Project style guidelines](https://github.com/opensearch-project/documentation-website/blob/main/STYLE_GUIDE.md) and [OpenSearch terms](https://github.com/opensearch-project/documentation-website/blob/main/TERMS.md) documents provide style standards and terminology to be observed when creating OpenSearch Project content.

## Code of Conduct

This project has adopted the [Amazon Open Source Code of Conduct](CODE_OF_CONDUCT.md). For more information see the [Code of Conduct FAQ](https://aws.github.io/code-of-conduct-faq), or contact [opensource-codeofconduct@amazon.com](mailto:opensource-codeofconduct@amazon.com) with any additional questions or comments.

## License

This project is licensed under the [Apache v2.0 License](LICENSE.txt).

## Copyright

Copyright OpenSearch Contributors. See [NOTICE](NOTICE.txt) for details.

[consuming]: wiki/consuming.md
[docs]: https://oui.opensearch.org
