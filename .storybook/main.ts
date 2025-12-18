import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "path";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    {
      name: "@storybook/addon-vitest",
      options: {
        // Point to the workspace configuration
        configFile: '../vitest.workspace.ts'
      }
    },
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {
      strictMode: true,
    },
  },

  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
    enableCrashReports: false,
  },

  managerHead: (head) => {
    return head + `
      <style>
        #oui-version-selector {
          position: fixed;
          top: 5px;
          right: 50px;
          z-index: 9999;
        }
        .oui-version-button {
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 4px;
          padding: 6px 12px;
          color: white;
          font-size: 12px;
          cursor: pointer;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }
        .oui-version-button:hover {
          background: rgba(0, 0, 0, 0.9);
        }
        .oui-version-dropdown {
          display: none;
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 1px solid #ccc;
          border-radius: 4px;
          min-width: 140px;
          margin-top: 4px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .oui-version-item {
          padding: 8px 12px;
          cursor: pointer;
          font-size: 12px;
          color: #333;
          border-bottom: 1px solid #eee;
        }
        .oui-version-item:last-child {
          border-bottom: none;
        }
        .oui-version-item:hover {
          background-color: #f5f5f5;
        }
        .oui-version-badge {
          background: #3b82f6;
          color: white;
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 10px;
          margin-left: 8px;
        }
      </style>
      <script>
        setTimeout(function() {
          if (document.getElementById('oui-version-selector')) return;

          var isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
          var pathMatch = window.location.pathname.match(/^\\\/([0-9.]+)/);
          var currentVersion = pathMatch ? pathMatch[1] : '2.0';

          var container = document.createElement('div');
          container.id = 'oui-version-selector';

          if (isLocal) {
            var button = document.createElement('button');
            button.className = 'oui-version-button';
            button.style.cursor = 'default';
            button.textContent = 'v' + currentVersion;
            container.appendChild(button);
          } else {
            var button = document.createElement('button');
            button.className = 'oui-version-button';
            button.textContent = 'v' + currentVersion + ' ▼';
            button.onclick = function() {
              var dropdown = document.getElementById('oui-dropdown');
              if (dropdown) {
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
              }
            };

            var dropdown = document.createElement('div');
            dropdown.className = 'oui-version-dropdown';
            dropdown.id = 'oui-dropdown';
            dropdown.innerHTML = '<div style="padding: 8px; color: #666; font-size: 11px;">Loading...</div>';

            container.appendChild(button);
            container.appendChild(dropdown);

            window.ouiSelectVersion = function(version) {
              window.open('https://oui.opensearch.org/' + version, '_blank');
              dropdown.style.display = 'none';
            };

            fetch('/versions.json')
              .then(function(response) { return response.json(); })
              .then(function(versions) {
                dropdown.innerHTML = '';
                for (var i = 0; i < versions.length; i++) {
                  var item = document.createElement('div');
                  item.className = 'oui-version-item';
                  item.textContent = 'v' + versions[i];
                  if (i === 0) {
                    var badge = document.createElement('span');
                    badge.className = 'oui-version-badge';
                    badge.textContent = 'Latest';
                    item.appendChild(badge);
                  }
                  (function(version) {
                    item.onclick = function() {
                      window.ouiSelectVersion(version);
                    };
                  })(versions[i]);
                  dropdown.appendChild(item);
                }
              })
              .catch(function() {
                dropdown.innerHTML = '';
                var versions = ['2.0', '1.22', '1.21', '1.20'];
                for (var i = 0; i < versions.length; i++) {
                  var item = document.createElement('div');
                  item.className = 'oui-version-item';
                  item.textContent = 'v' + versions[i];
                  if (i === 0) {
                    var badge = document.createElement('span');
                    badge.className = 'oui-version-badge';
                    badge.textContent = 'Latest';
                    item.appendChild(badge);
                  }
                  (function(version) {
                    item.onclick = function() {
                      window.ouiSelectVersion(version);
                    };
                  })(versions[i]);
                  dropdown.appendChild(item);
                }
              });

            document.addEventListener('click', function(e) {
              if (!container.contains(e.target)) {
                dropdown.style.display = 'none';
              }
            });
          }

          document.body.appendChild(container);
        }, 500);
      </script>
    `;
  },

  viteFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": resolve(__dirname, "../src"),
      };
    }

    // Configure for better Vitest integration
    config.define = {
      ...config.define,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    };

    return config;
  }
};

export default config;
