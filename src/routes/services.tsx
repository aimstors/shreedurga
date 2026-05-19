import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { serviceCategories } from '@/lib/services'
import { serviceAreaIntro } from '@/lib/service-areas'

export const Route = createFileRoute('/services')({
  head: () => ({
    meta: [
      { title: 'Interior Design Services in Tinsukia & Dibrugarh | Shree Durga Interior' },
      { name: 'description', content: 'Modular kitchen, false ceiling, PVC panels, uPVC & aluminium windows, ACP, epoxy flooring and full home/commercial interiors across Upper Assam & Arunachal Pradesh.' },
      { property: 'og:title', content: 'Interior Design Services | Shree Durga Interior' },
      { property: 'og:description', content: 'Complete interior solutions — residential, commercial, modular kitchens, ceilings, windows, flooring and more.' },
    ],
  }),
  component: ServicesPage,
})

function ServiceCard({ s, delay = 0 }: any) {
  const Icon = s.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="s-bento-card"
    >
      <div className="s-icon"><Icon size={22} /></div>
      <div className="s-title">{s.title}</div>
      <div className="s-desc">{s.desc}</div>
      <div className="s-arrow"><ArrowRight size={14} /></div>
    </motion.div>
  )
}

function ServicesPage() {
  return (
    <div className="page-services-dark" style={{ background: '#000', color: '#fff' }}>
      <div className="page-hero">
        <div className="breadcrumb"><Link to="/">Home</Link><span>›</span><span>Services</span></div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="page-title"
        >
          Everything your space needs.<br />Under one roof.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="page-sub"
        >
          From 2D drawings and 3D visualisation to modular kitchens, false ceilings, uPVC windows, ACP work and epoxy flooring — we deliver the complete interior package. {serviceAreaIntro}
        </motion.p>
      </div>

      {serviceCategories.map((cat) => (
        <section key={cat.id} id={cat.id} className="services-grid-wrap" style={{ paddingTop: 32, paddingBottom: 32 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontSize: 28, fontWeight: 600, marginBottom: 20, letterSpacing: '-0.01em' }}
            >
              {cat.title}
            </motion.h2>
            <div
              style={{
                display: 'grid',
                gap: 16,
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              }}
            >
              {cat.services.map((s, i) => (
                <ServiceCard key={s.slug} s={s} delay={i * 0.04} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <div style={{ textAlign: 'center', padding: '48px 24px 96px' }}>
        <Link to="/contact" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          Get a free quote <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
