import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { allServices, serviceCategories, type Service } from '@/lib/services'

const C = {
  bg: '#f5f3ee',
  surface: '#e8e4dd',
  ink: '#2d2d2d',
  deep: '#0d0d0d',
  border: '#dcd8cf',
}

const serif: React.CSSProperties = { fontFamily: "'DM Serif Display', serif" }
const sans: React.CSSProperties = { fontFamily: "'Fira Sans', sans-serif" }

export const Route = createFileRoute('/services/$slug')({
  loader: ({ params }) => {
    const service = allServices.find((s) => s.slug === params.slug)
    if (!service) throw notFound()
    const category = serviceCategories.find((c) =>
      c.services.some((s) => s.slug === params.slug),
    )!
    const related = category.services.filter((s) => s.slug !== params.slug).slice(0, 3)
    return { service, category, related }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.title} | Shree Durga Interior` },
          { name: 'description', content: loaderData.service.desc },
          { property: 'og:title', content: `${loaderData.service.title} | Shree Durga Interior` },
          { property: 'og:description', content: loaderData.service.desc },
        ]
      : [],
    links: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Fira+Sans:wght@300;400;500;600&display=swap' },
    ],
  }),
  notFoundComponent: () => (
    <div style={{ background: C.bg, color: C.ink, minHeight: '60vh', padding: '120px 24px', textAlign: 'center', ...sans }}>
      <h1 style={{ ...serif, fontSize: 48, color: C.deep, margin: 0 }}>Service not found</h1>
      <p style={{ marginTop: 16 }}>
        <Link to="/services" style={{ color: C.deep }}>Back to all services</Link>
      </p>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div style={{ background: C.bg, color: C.ink, padding: 80, ...sans }}>
      <h1 style={{ ...serif }}>Something went wrong</h1>
      <p>{error.message}</p>
    </div>
  ),
  component: ServiceDetailPage,
})

const highlights = [
  'Free on-site consultation & measurement',
  'Transparent quote with material breakdown',
  'In-house craftsmen — no third-party subcontracting',
  '12-month workmanship warranty',
]

const process = [
  { n: '01', title: 'Discovery', desc: 'Site visit, brief intake and budget alignment.' },
  { n: '02', title: 'Design', desc: '2D layouts and 3D visualisations for approval.' },
  { n: '03', title: 'Build', desc: 'Material procurement and on-site execution.' },
  { n: '04', title: 'Handover', desc: 'Final walkthrough, snag-fixing and warranty.' },
]

function ServiceDetailPage() {
  const { service, category, related } = Route.useLoaderData()
  const Icon = service.icon

  return (
    <div style={{ background: C.bg, color: C.ink, ...sans }}>
      <style>{`
        .sd-gallery { display: grid; gap: 12px; grid-template-columns: 1fr; }
        @media (min-width: 720px) { .sd-gallery { grid-template-columns: repeat(3, 1fr); } }
        .sd-process { display: grid; gap: 16px; grid-template-columns: 1fr; }
        @media (min-width: 720px) { .sd-process { grid-template-columns: repeat(4, 1fr); } }
        .sd-related { display: grid; gap: 16px; grid-template-columns: 1fr; }
        @media (min-width: 720px) { .sd-related { grid-template-columns: repeat(3, 1fr); } }
        .sd-cta:hover { transform: translateY(-2px); }
        .sd-cta:hover svg { transform: translateX(6px); }
        .sd-card:hover { background: ${C.deep} !important; color: ${C.bg} !important; }
        .sd-link { color: ${C.ink}; text-decoration: none; }
        .sd-link:hover { text-decoration: underline; }
      `}</style>

      {/* Hero */}
      <section style={{ padding: '96px 24px 64px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: 11, opacity: 0.6, marginBottom: 24 }}>
          <Link to="/" className="sd-link">Home</Link>
          <span style={{ margin: '0 10px', opacity: 0.4 }}>/</span>
          <Link to="/services" className="sd-link">Services</Link>
          <span style={{ margin: '0 10px', opacity: 0.4 }}>/</span>
          <span>{category.title}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48, alignItems: 'end' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '8px 14px', background: C.surface, marginBottom: 28 }}>
              <Icon size={18} />
              <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.16em' }}>{category.title}</span>
            </div>
            <h1 style={{ ...serif, color: C.deep, fontSize: 'clamp(40px, 7vw, 96px)', lineHeight: 0.98, letterSpacing: '-0.02em', margin: 0 }}>
              {service.title}
            </h1>
            <p style={{ marginTop: 28, maxWidth: 720, fontSize: 'clamp(17px, 1.6vw, 21px)', lineHeight: 1.55, opacity: 0.85, fontWeight: 300 }}>
              {service.desc}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery placeholders */}
      <section style={{ padding: '24px 24px 64px', maxWidth: 1280, margin: '0 auto' }}>
        <div className="sd-gallery">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                aspectRatio: i === 0 ? '4 / 5' : '4 / 5',
                background: `linear-gradient(135deg, ${C.surface}, ${C.border})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <span style={{ ...serif, fontSize: 48, color: C.deep, opacity: 0.25 }}>0{i + 1}</span>
              <span style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em', opacity: 0.55 }}>
                Project visual
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* What's included */}
      <section style={{ padding: '64px 24px', maxWidth: 1280, margin: '0 auto', display: 'grid', gap: 64, gridTemplateColumns: '1fr' }}>
        <div>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: 11, opacity: 0.6 }}>What's included</span>
          <h2 style={{ ...serif, color: C.deep, fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05, margin: '12px 0 32px' }}>
            Built end-to-end, with nothing left for you to chase.
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 16, gridTemplateColumns: '1fr', maxWidth: 720 }}>
            {highlights.map((h) => (
              <li key={h} style={{ display: 'flex', gap: 14, alignItems: 'start', fontSize: 17, lineHeight: 1.5 }}>
                <Check size={20} style={{ marginTop: 3, flexShrink: 0, color: C.deep }} />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: '64px 24px', maxWidth: 1280, margin: '0 auto' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: 11, opacity: 0.6 }}>Our process</span>
        <h2 style={{ ...serif, color: C.deep, fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05, margin: '12px 0 40px' }}>
          From idea to handover.
        </h2>
        <div className="sd-process">
          {process.map((p) => (
            <div key={p.n} style={{ padding: 24, background: C.surface, minHeight: 180, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ ...serif, fontSize: 32, color: C.deep }}>{p.n}</span>
              <h3 style={{ ...serif, fontSize: 22, color: C.deep, margin: 0 }}>{p.title}</h3>
              <p style={{ margin: 0, fontSize: 14, opacity: 0.8, lineHeight: 1.5 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '64px 24px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ background: C.deep, color: C.bg, padding: 'clamp(40px, 6vw, 80px)', display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ maxWidth: 560 }}>
            <h2 style={{ ...serif, fontSize: 'clamp(28px, 3.4vw, 44px)', lineHeight: 1.05, margin: '0 0 12px' }}>
              Ready to start your {service.title.toLowerCase()} project?
            </h2>
            <p style={{ margin: 0, opacity: 0.75, fontSize: 16 }}>
              Get a free consultation and detailed quote within 48 hours.
            </p>
          </div>
          <Link
            to="/contact"
            className="sd-cta"
            style={{
              background: C.bg,
              color: C.deep,
              padding: '20px 36px',
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: '0.02em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 14,
              textDecoration: 'none',
              transition: 'transform 0.25s',
            }}
          >
            Book a Consultation
            <ArrowRight size={18} style={{ transition: 'transform 0.25s' }} />
          </Link>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ padding: '32px 24px 96px', maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
            <h2 style={{ ...serif, color: C.deep, fontSize: 'clamp(24px, 2.8vw, 36px)', margin: 0 }}>
              More in {category.title}
            </h2>
            <Link to="/services" className="sd-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
              <ArrowLeft size={14} /> All services
            </Link>
          </div>
          <div className="sd-related">
            {related.map((r: Service) => {
              const RI = r.icon
              return (
                <Link
                  key={r.slug}
                  to="/services/$slug"
                  params={{ slug: r.slug }}
                  className="sd-card"
                  style={{
                    background: C.surface,
                    color: C.ink,
                    padding: 28,
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    minHeight: 200,
                    transition: 'background 0.3s, color 0.3s',
                  }}
                >
                  <RI size={22} />
                  <h3 style={{ ...serif, fontSize: 22, margin: 0, lineHeight: 1.2 }}>{r.title}</h3>
                  <p style={{ margin: 0, fontSize: 13, opacity: 0.75, lineHeight: 1.5 }}>{r.desc}</p>
                  <span style={{ marginTop: 'auto', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.16em', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
