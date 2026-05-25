import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { serviceCategories, type Service } from '@/lib/services'

const C = {
  bg: '#f5f3ee',
  surface: '#e8e4dd',
  ink: '#2d2d2d',
  deep: '#0d0d0d',
  border: '#dcd8cf',
}

const serif: React.CSSProperties = { fontFamily: "'DM Serif Display', serif" }
const sans: React.CSSProperties = { fontFamily: "'Fira Sans', sans-serif" }

export const Route = createFileRoute('/services')({
  head: () => ({
    meta: [
      { title: 'Interior Design Services in Tinsukia & Dibrugarh | Shree Durga Interior' },
      { name: 'description', content: 'Modular kitchen, false ceiling, PVC panels, uPVC & aluminium windows, ACP, epoxy flooring and full home/commercial interiors across Upper Assam & Arunachal Pradesh.' },
      { property: 'og:title', content: 'Interior Design Services | Shree Durga Interior' },
      { property: 'og:description', content: 'Complete interior solutions — residential, commercial, modular kitchens, ceilings, windows, flooring and more.' },
    ],
    links: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Fira+Sans:wght@300;400;500;600&display=swap' },
    ],
  }),
  component: ServicesPage,
})

const tile: React.CSSProperties = {
  background: C.surface,
  padding: 32,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: 24,
  minHeight: 220,
  transition: 'transform 0.4s cubic-bezier(.2,.7,.2,1), background 0.4s',
}

const eyebrow: React.CSSProperties = {
  textTransform: 'uppercase',
  letterSpacing: '0.18em',
  fontSize: 11,
  opacity: 0.6,
  display: 'block',
}

function Eye({ n, label }: { n: string; label: string }) {
  return <span style={{ ...eyebrow, ...sans }}>{n} / {label}</span>
}

function SLink({ s, children, style }: { s: Service; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <Link
      to="/services/$slug"
      params={{ slug: s.slug }}
      className="sd-svc-link"
      style={{ color: 'inherit', textDecoration: 'none', ...style }}
    >
      {children}
    </Link>
  )
}

function findCat(id: string) {
  return serviceCategories.find((c) => c.id === id)!
}

function ServicesPage() {
  const interiors = findCat('interiors')
  const design = findCat('design')
  const ceiling = findCat('ceiling-walls')
  const kitchen = interiors.services.filter((s) =>
    ['modular-kitchen', 'wardrobe', 'tv-unit', 'bed-bedroom'].includes(s.slug),
  )
  const windows = findCat('windows-glass')
  const metal = findCat('metal-exterior')
  const flooring = findCat('flooring')

  return (
    <div
      id="services-top"
      style={{
        background: C.bg,
        color: C.ink,
        padding: '96px 24px 96px',
        ...sans,
      }}
    >
      <style>{`
        .sd-bento { display: grid; gap: 16px; grid-template-columns: 1fr; }
        @media (min-width: 720px) { .sd-bento { grid-template-columns: repeat(4, 1fr); } }
        @media (min-width: 1024px) { .sd-bento { grid-template-columns: repeat(6, 1fr); } }
        .sd-tile-hover:hover { background: ${C.deep} !important; color: ${C.bg} !important; transform: translateY(-2px); }
        .sd-cta:hover { transform: translateY(-2px); }
        .sd-cta:hover svg { transform: translateX(6px); }
        .sd-link-back { color: ${C.ink}; text-decoration: none; }
        .sd-link-back:hover { color: ${C.deep}; text-decoration: underline; }
        .sd-svc-link { transition: opacity 0.2s; }
        .sd-svc-link:hover { opacity: 0.6; text-decoration: underline; }
      `}</style>

      {/* Hero */}
      <div style={{ maxWidth: 1280, margin: '0 auto', marginBottom: 72 }}>
        <div style={{ ...eyebrow, marginBottom: 24 }}>
          <Link to="/" className="sd-link-back">Home</Link>
          <span style={{ margin: '0 10px', opacity: 0.4 }}>/</span>
          <span>Services</span>
        </div>
        <h1
          style={{
            ...serif,
            color: C.deep,
            fontSize: 'clamp(48px, 8vw, 112px)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            margin: '0 0 28px',
          }}
        >
          Our Services
        </h1>
        <p
          style={{
            maxWidth: 640,
            fontSize: 'clamp(17px, 1.6vw, 22px)',
            fontWeight: 300,
            lineHeight: 1.55,
            opacity: 0.9,
            margin: 0,
          }}
        >
          From the tea estates of Tinsukia to the hills of Arunachal Pradesh,
          we craft premium spaces that balance structural integrity with
          high-end aesthetic precision.
        </p>
      </div>

      {/* Bento */}
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="sd-bento">
          {/* 01 Interiors — featured */}
          <div
            id="interiors"
            className="sd-tile-hover"
            style={{ ...tile, gridColumn: 'span 3 / span 3', gridRow: 'span 2 / span 2', minHeight: 460 }}
          >
            <div>
              <Eye n="01" label="Interiors" />
              <h3 style={{ ...serif, color: C.deep, fontSize: 40, lineHeight: 1.05, margin: '16px 0 0' }}>
                Residential & Commercial Design
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, opacity: 0.85, fontSize: 16 }}>
              {interiors.services.slice(0, 2).map((s) => (
                <SLink key={s.slug} s={s}><p style={{ margin: 0 }}>{s.title}</p></SLink>
              ))}
              <p style={{ margin: 0 }}>Retail & Hospitality Fit-outs</p>
            </div>
          </div>

          {/* 02 Ceiling */}
          <div id="ceiling-walls" className="sd-tile-hover" style={{ ...tile, gridColumn: 'span 2 / span 2' }}>
            <Eye n="02" label="Ceiling & Walls" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {ceiling.services.map((s) => (
                <SLink key={s.slug} s={s}>
                  <p style={{ ...serif, color: C.deep, fontSize: 20, margin: 0, lineHeight: 1.25 }}>{s.title}</p>
                </SLink>
              ))}
            </div>
          </div>

          {/* Decorative deep tile */}
          <div
            style={{
              background: C.deep,
              padding: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gridColumn: 'span 1 / span 1',
            }}
          >
            <div style={{ width: 1, height: '100%', background: C.bg, opacity: 0.2 }} />
          </div>

          {/* 03 Kitchen & Storage */}
          <div className="sd-tile-hover" style={{ ...tile, gridColumn: 'span 3 / span 3' }}>
            <Eye n="03" label="Kitchen & Storage" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <SLink s={kitchen.find((k) => k.slug === 'modular-kitchen')!}>
                <h3 style={{ ...serif, color: C.deep, fontSize: 26, lineHeight: 1.15, margin: 0 }}>
                  Modular Kitchens
                </h3>
              </SLink>
              <p style={{ fontSize: 13, opacity: 0.8, alignSelf: 'end', margin: 0, display: 'flex', flexWrap: 'wrap', gap: '4px 8px' }}>
                {kitchen.filter((k) => k.slug !== 'modular-kitchen').map((k, i) => (
                  <span key={k.slug}>
                    <SLink s={k}>{k.title}</SLink>{i < kitchen.length - 2 ? ' ·' : ''}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* 04 Windows */}
          <div
            id="windows-glass"
            style={{
              ...tile,
              gridColumn: 'span 2 / span 2',
              gridRow: 'span 2 / span 2',
              borderLeft: `1px solid ${C.border}`,
              borderTop: `1px solid ${C.border}`,
              minHeight: 460,
            }}
          >
            <Eye n="04" label="Windows & Glass" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {windows.services.map((s) => (
                <SLink key={s.slug} s={s}>
                  <div>
                    <p style={{ ...serif, color: C.deep, fontSize: 22, margin: '0 0 4px' }}>{s.title}</p>
                    <p style={{ fontSize: 13, opacity: 0.7, margin: 0 }}>{s.desc}</p>
                  </div>
                </SLink>
              ))}
            </div>
          </div>

          {/* 05 Metalwork */}
          <div
            id="metal-exterior"
            style={{ ...tile, background: C.ink, color: C.bg, gridColumn: 'span 1 / span 1', minHeight: 180 }}
          >
            <span style={{ ...eyebrow, opacity: 0.5, fontSize: 10 }}>05 / Metal</span>
            <p style={{ ...serif, fontSize: 18, margin: 0, lineHeight: 1.2, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {metal.services.map((s, i) => (
                <span key={s.slug}>
                  <SLink s={s}>{s.title}</SLink>{i < metal.services.length - 1 ? ' &' : ''}
                </span>
              ))}
            </p>
          </div>

          {/* 06 Flooring */}
          <div
            id="flooring"
            style={{
              ...tile,
              gridColumn: 'span 1 / span 1',
              justifyContent: 'center',
              gap: 6,
              borderBottom: `1px solid ${C.border}`,
              borderRight: `1px solid ${C.border}`,
              minHeight: 180,
            }}
          >
            <Eye n="06" label="Floor" />
            {flooring.services.map((s) => (
              <p key={s.slug} style={{ margin: 0, fontSize: 14, opacity: 0.85 }}>{s.title}</p>
            ))}
          </div>

          {/* 07 Design & Drawing */}
          <div id="design" className="sd-tile-hover" style={{ ...tile, gridColumn: 'span 2 / span 2' }}>
            <Eye n="07" label="Design & Drawing" />
            <ul style={{ ...serif, color: C.deep, fontStyle: 'italic', listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 18 }}>
              {design.services.map((s) => <li key={s.slug}>{s.title}</li>)}
              <li>Custom Wallpaper Styling</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          maxWidth: 1280,
          margin: '96px auto 0',
          paddingTop: 80,
          borderTop: `1px solid ${C.ink}1a`,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 32,
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <h2 style={{ ...serif, color: C.deep, fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05, margin: '0 0 16px' }}>
            Start your transformation.
          </h2>
          <p style={{ fontSize: 17, opacity: 0.8, margin: 0 }}>
            Serving Tinsukia, Dibrugarh, Pasighat and 9 more districts within 200 km.
          </p>
        </div>
        <Link
          to="/contact"
          className="sd-cta"
          style={{
            background: C.deep,
            color: C.bg,
            padding: '20px 40px',
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: '0.02em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 16,
            textDecoration: 'none',
            transition: 'transform 0.25s',
          }}
        >
          Book a Consultation
          <ArrowRight size={18} style={{ transition: 'transform 0.25s' }} />
        </Link>
      </div>
    </div>
  )
}
