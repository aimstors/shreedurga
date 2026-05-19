import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Check, Star, MapPin } from 'lucide-react'
import { serviceAreas, serviceAreaIntro } from '@/lib/service-areas'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About Us — Interior Designer in Tinsukia | Shree Durga Interior' },
      { name: 'description', content: 'Since 1999, Shree Durga Interior has delivered 850+ residential and commercial interiors across Upper Assam and Arunachal Pradesh.' },
      { property: 'og:title', content: 'About — Shree Durga Interior' },
      { property: 'og:description', content: 'Two decades of beautiful interiors across Assam & Arunachal Pradesh.' },
    ],
  }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <>
      <section className="section about" id="about">
        <div className="section-inner">
          <div className="about-grid">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="about-imgs"
            >
              <div className="about-img-main"></div>
              <div className="about-img-secondary"></div>
              <div className="about-pill">
                <div className="about-pill-icon"><Star size={18} fill="var(--gold)" color="var(--gold)" /></div>
                <div><div className="about-pill-num">850+</div><div className="about-pill-label">Projects delivered</div></div>
              </div>
            </motion.div>
            <div>
              <div className="section-eyebrow">Our story</div>
              <h2 className="section-title">
                Crafting beautiful interiors <em>for over two decades.</em>
              </h2>
              <p className="section-sub" style={{ marginBottom: 8 }}>
                Founded in 1999 in Duliajan, Assam, Shree Durga Interior has grown into one of the region's most trusted interior design studios — with a reputation built on exceptional craftsmanship, transparent pricing, and a genuine passion for beautiful spaces.
              </p>
              <div className="about-feats">
                {[
                  'Complete interior solutions — residential & commercial',
                  'Photorealistic 3D visualisation before execution',
                  'On-time delivery with full project management',
                  'Transparent, zero-hidden-cost pricing',
                ].map((feat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="about-feat"
                  >
                    <div className="check"><Check size={11} color="var(--green)" /></div>
                    {feat}
                  </motion.div>
                ))}
              </div>
              <Link to="/contact" className="btn-primary" style={{ display: 'inline-block' }}>
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#0a0a0a', color: '#fff', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="section-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <MapPin size={14} /> Service areas
          </div>
          <h2 className="section-title" style={{ marginTop: 12 }}>
            We serve <em>12 districts</em> across Assam & Arunachal Pradesh.
          </h2>
          <p className="section-sub" style={{ marginBottom: 24 }}>{serviceAreaIntro}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {serviceAreas.map((d) => (
              <span
                key={d.name}
                style={{
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: 999,
                  padding: '8px 14px',
                  fontSize: 14,
                  background: 'rgba(255,255,255,0.04)',
                }}
                title={d.state}
              >
                {d.name}
                <span style={{ opacity: 0.5, marginLeft: 6, fontSize: 12 }}>· {d.state === 'Assam' ? 'AS' : 'AR'}</span>
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
