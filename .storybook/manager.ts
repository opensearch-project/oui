import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

const theme = create({
  base: "light",
  brandTitle: "OUI",
  brandImage: "",
  brandUrl: "https://oui.opensearch.org/",
  brandTarget: "_self",
});

addons.setConfig({
  theme,
});
