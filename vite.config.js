import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: "localhost", // Custom hostname
		port: 4001, // Custom port
		strictPort: true, // Ensures the port is used as specified
	},
});
