import {
    defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3002,
         allowedHosts: [
            "3002-leoescobarh-autenticaci-d4n0zb7xbsl.ws-us118.gitpod.io"
        ]
    },
    build: {
        outDir: 'dist'
    }
})