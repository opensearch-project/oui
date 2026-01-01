import type { Preview } from "@storybook/react-vite";

import "../src/styles/preset.css";
import "./storybook.css";
import "./themes/pulse-theme.css";

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
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'v9',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'v9', title: 'v9 Theme', left: '🎨' },
          { value: 'pulse', title: 'Pulse Theme', left: '⚡' }
        ],
        showName: true,
        dynamicTitle: true,
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
    (Story, context) => {
      const { theme } = context.globals;
      const selectedTheme = theme || 'v9';

      // Remove all theme classes generically
      document.body.className = document.body.className
        .replace(/\b\w+-theme\b/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      // Apply theme class for non-default themes (v9 is default, no class needed)
      if (selectedTheme !== 'v9') {
        document.body.classList.add(`${selectedTheme}-theme`);
      }

      return <Story />;
    },
  ],
};

export default preview;
