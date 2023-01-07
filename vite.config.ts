import { crx, defineManifest } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Zenn History",
  version: "1.0.0",
  description: "Zennの履歴データを記録・検索できる非公式のChrome拡張",
  permissions: ["storage", "tabs"],
  host_permissions: ["https://zenn.dev/*"],
  action: {
    default_popup: "index.html",
  },
  background: { service_worker: "src/background/index.ts" },
  content_scripts: [
    {
      matches: ["https://zenn.dev/*"],
      js: ["src/contentScript/getDocument.ts"],
      run_at: "document_end",
    },
  ],
  commands: {
    _execute_action: {
      suggested_key: {
        default: "Ctrl+Shift+X",
      },
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
});
