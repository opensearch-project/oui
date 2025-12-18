# Frequently Asked Questions

Here are our responses to questions we expect to get frequently.

## What is the OpenSearch UI Framework?

The OpenSearch UI Framework (OUI) is a design library used by the OpenSearch Project to build React applications that need to share our branding and aesthetics. It distributes UI React components and static assets for use in building web layouts.

## Can I use OUI?

Yes, but be aware of the [license](https://github.com/opensearch-project/oui/blob/main/LICENSE.txt) as always. The roadmap and priorities are directed by usage within the OpenSearch project.

## What is the versioning, releases and upgrade strategy?

We use [semver](https://semver.org/) for versioning and use that to denote breaking changes in OUI upgrades. We consider API changes in our prop names or existing component functionality to be a reason for a breaking change, but do not consider renaming of CSS selectors, mixins, or other style changes to be breaking.

Traditionally releases are made weekly against whatever is in main and you can upgrade from NPM as you see fit.

## How do you handle Theming?

OUI 2.0 will ship with themes that match behavior in OUI 1.0, but going forward, all new themes must be defined by consumers using just exposed CSS Variables.

## Can I contribute to OUI

Yes! We accept PRs regularly similar to our other OpenSearch repos. You can find documentation around creating and submitting new components in [CONTRIBUTING.md](CONTRIBUTING.md).

## What about reporting bugs and feature requests?

Bug reports and feature requests are welcome!
