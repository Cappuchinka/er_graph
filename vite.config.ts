import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// https://vite.dev/config/
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    return defineConfig({
        plugins: [react()],
        server: {
            port: 5143,
            proxy: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                [process.env.VITE_ER_GRAPH_APP]: {
                    target: process.env.VITE_ER_GRAPH_APP_TARGET,
                    changeOrigin: true,
                    secure: false,
                }
            }
        }
    })
}
