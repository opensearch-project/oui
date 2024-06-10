# Validating with OpenSearch Dashboards

The following are instructions for locally validating OUI changes within the 
[OpenSearch Dashboards](https://github.com/opensearch-project/OpenSearch-Dashboards) 
project.

## Instructions

To consume local OUI artifacts in OpenSearch Dashboards, and because there are 
some blockers to using `npm link` right now,`package.json` references to 
`opensearch-project/oui` will need to be updated to point to your local repo 
by running the following in `opensearch-project/OpenSearch-Dashboards`:

```bash
# Replace `<PATH TO>` below with a valid path to OUI
find . -type f -name package.json -exec sed -i 's/"@elastic\/eui": ".*"/"@elastic\/eui": "file:\/<PATH TO>\/oui"/g' {} \;
```
 
To see changes in OUI be reflected in Dashboards, first build release 
artifacts in `opensearch-project/oui`:

```bash
yarn build
```

Then update OpenSearch Dashboards to consume them and restart your server by 
running the following in `opensearch-project/OpenSearch-Dashboards`:

```bash
yarn osd clean
yarn osd bootstrap
yarn start
```

Changes from OUI should now be available in your local OpenSearch Dashboards server! 
