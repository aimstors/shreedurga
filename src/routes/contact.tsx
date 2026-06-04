import { createFileRoute, Link } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MapPin, Check, ArrowRight, MessageCircle, Mail } from 'lucide-react'
import { useState } from 'react'
import { serviceAreas, serviceAreaIntro } from '@/lib/service-areas'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Contact — Free Consultation | Shree Durga Interior' },
      { name: 'description', content: 'Call, WhatsApp or write to us. Free consultation across Tinsukia, Dibrugarh and 10+ districts of Assam & Arunachal Pradesh.' },
      { property: 'og:title', content: 'Contact Shree Durga Interior' },
      { property: 'og:description', content: 'Book your free interior design consultation today.' },
    ],
  }),
  component: ContactPage,
})

function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    window.setTimeout(() => {
      setSuccess(true)
      setLoading(false)
      e.currentTarget.reset()
    }, 350)
  }

  return (
    <div className="page-contact-dark" style={{ background: '#000', color: '#fff' }}>
      <div className="page-hero">
        <div className="breadcrumb"><Link to="/">Home</Link><span>›</span><span>Contact</span></div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="page-title"
        >
          Let's build something<br />beautiful together.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="page-sub"
        >
          Book your free consultation. We'll get back within 24 hours.
        </motion.p>
      </div>

      <div className="contact-layout">
        <div className="info-panel">
          <div className="info-eyebrow">Get in touch</div>
          <h2 className="info-title">We'd love to hear about your project.</h2>
          <div className="info-items">
            <div className="info-item">
              <div className="info-icon"><MapPin size={17} /></div>
              <div>
                <div className="info-item-label">Studio location</div>
                <div className="info-item-value">Kamalabari Rd, Opposite Bajaj Dealer<br />Duliajan, Assam — India</div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><Phone size={17} /></div>
              <div>
                <div className="info-item-label">Call us</div>
                <div className="info-item-value"><a href="tel:+919435754461" style={{ color: 'inherit' }}>+91 94357 54461</a></div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><MessageCircle size={17} /></div>
              <div>
                <div className="info-item-label">WhatsApp</div>
                <div className="info-item-value"><a href="https://wa.me/919435754461" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Chat with us</a></div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-panel">
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">First name *</label><input className="form-input" name="firstName" required /></div>
                    <div className="form-group"><label className="form-label">Last name</label><input className="form-input" name="lastName" /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">Phone *</label><input className="form-input" name="phone" type="tel" required /></div>
                    <div className="form-group"><label className="form-label">Email</label><input className="form-input" name="email" type="email" /></div>
                  </div>
                  <div className="form-group"><label className="form-label">Message</label><textarea className="form-textarea" name="message" placeholder="Tell us about your space, location & timeline"></textarea></div>
                  <button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send message'} <ArrowRight size={16} />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="form-success">
                <Check size={48} color="var(--accent2)" />
                <h3 className="success-title">Message sent!</h3>
                <p>We will get back to you shortly.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <section style={{ padding: '64px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div className="info-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <MapPin size={14} /> Service areas
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 600, margin: '12px 0 8px', letterSpacing: '-0.01em' }}>
          12 districts. One trusted studio.
        </h2>
        <p style={{ opacity: 0.7, marginBottom: 24, maxWidth: 720 }}>{serviceAreaIntro}</p>
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
            >
              {d.name}
              <span style={{ opacity: 0.5, marginLeft: 6, fontSize: 12 }}>· {d.state === 'Assam' ? 'AS' : 'AR'}</span>
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
