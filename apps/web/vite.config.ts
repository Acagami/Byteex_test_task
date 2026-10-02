import react from '@vitejs/plugin-react'
import { defineConfig, type Connect } from 'vite'

// Vite's SPA fallback otherwise serves the storefront for /admin/.
const adminRoute: Connect.NextHandleFunction = (request, response, next) => {
  const path = request.url?.split('?')[0]
  if (path === '/admin') {
    response.writeHead(302, { Location: '/admin/' })
    response.end()
    return
  }
  if (path === '/admin/') request.url = '/admin/index.html'
  next()
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'decap-admin-route',
      configureServer(server) { server.middlewares.use(adminRoute) },
      configurePreviewServer(server) { server.middlewares.use(adminRoute) },
    },
  ],
})
