// vite.config.ts
import { defineConfig } from "file:///C:/Users/kusai/Desktop/fsd-front/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/kusai/Desktop/fsd-front/node_modules/@vitejs/plugin-react/dist/index.mjs";
import mkcert from "file:///C:/Users/kusai/Desktop/fsd-front/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\kusai\\Desktop\\fsd-front";
var vite_config_default = defineConfig(() => {
  return {
    plugins: [
      react(),
      mkcert()
    ],
    resolve: {
      alias: {
        "@pages": path.resolve(__vite_injected_original_dirname, "src/pages"),
        "@widgets": path.resolve(__vite_injected_original_dirname, "src/widgets"),
        "@shared": path.resolve(__vite_injected_original_dirname, "src/shared"),
        "@features": path.resolve(__vite_injected_original_dirname, "src/features"),
        "@entities": path.resolve(__vite_injected_original_dirname, "src/entities"),
        "@public": path.resolve(__vite_injected_original_dirname, "src/public")
      }
    },
    server: {
      port: Number(process.env.VITE_APP_DEV_PORT) || 3e3,
      host: "localhost"
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxrdXNhaVxcXFxEZXNrdG9wXFxcXGZzZC1mcm9udFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxca3VzYWlcXFxcRGVza3RvcFxcXFxmc2QtZnJvbnRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2t1c2FpL0Rlc2t0b3AvZnNkLWZyb250L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBta2NlcnQgZnJvbSAndml0ZS1wbHVnaW4tbWtjZXJ0J1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW1xuICAgICAgcmVhY3QoKSxcbiAgICAgIG1rY2VydCgpLFxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0BwYWdlcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL3BhZ2VzXCIpLFxuICAgICAgICAnQHdpZGdldHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyYy93aWRnZXRzXCIpLFxuICAgICAgICAnQHNoYXJlZCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL3NoYXJlZFwiKSxcbiAgICAgICAgJ0BmZWF0dXJlcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2ZlYXR1cmVzXCIpLFxuICAgICAgICAnQGVudGl0aWVzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvZW50aXRpZXNcIiksXG4gICAgICAgICdAcHVibGljJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvcHVibGljXCIpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgcG9ydDogTnVtYmVyKHByb2Nlc3MuZW52LlZJVEVfQVBQX0RFVl9QT1JUKSB8fCAzMDAwLFxuICAgICAgaG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgfSxcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFIsU0FBUyxvQkFBb0I7QUFDelQsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFVBQVU7QUFIakIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhLE1BQU07QUFDaEMsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLFVBQVUsS0FBSyxRQUFRLGtDQUFXLFdBQVc7QUFBQSxRQUM3QyxZQUFZLEtBQUssUUFBUSxrQ0FBVyxhQUFhO0FBQUEsUUFDakQsV0FBVyxLQUFLLFFBQVEsa0NBQVcsWUFBWTtBQUFBLFFBQy9DLGFBQWEsS0FBSyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxRQUNuRCxhQUFhLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsUUFDbkQsV0FBVyxLQUFLLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQ2pEO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTSxPQUFPLFFBQVEsSUFBSSxpQkFBaUIsS0FBSztBQUFBLE1BQy9DLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
