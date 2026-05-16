import { createRootRoute } from '@tanstack/react-router'
import { Outlet, ScrollRestoration } from '@tanstack/react-router'
import { HeadContent, Scripts } from '@tanstack/react-start'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import styles from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Shree Durga Interior — Duliajan, Assam' },
    ],
    links: [
      { rel: 'stylesheet', href: styles },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="app-container">
          <Nav />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
