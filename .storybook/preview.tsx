import type { Preview } from "@storybook/react-vite";

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
      const isDark = backgrounds?.value === "dark";

      // Apply dark mode class directly without React hooks to avoid version conflicts
      if (isDark) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }

      return <Story />;
    },
  ],
};

export default preview;
