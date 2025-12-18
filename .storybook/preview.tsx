import type { Preview } from "@storybook/react-vite";
import { useEffect } from "react";

import "../src/styles/preset.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { backgrounds } = context.globals;

      useEffect(() => {
        const isDark = backgrounds?.value === "dark";

        if (isDark) {
          document.body.classList.add("dark");
        } else {
          document.body.classList.remove("dark");
        }
      }, [backgrounds]);

      return <Story />;
    },
  ],
};

export default preview;
