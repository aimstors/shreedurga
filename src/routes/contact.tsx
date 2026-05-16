import { createFileRoute, Link } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MessageCircle, MapPin, Clock, Facebook, Check, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { submitContactForm } from '@/lib/contact.functions'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Contact Us | Shree Durga Interior' },
      { name: 'description', content: 'Let’s build something beautiful together. Book your free consultation today.' },
    ],
  }),
  component: ContactPage,
})

function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    try {
      await submitContactForm({ data })
      setSuccess(true)
    } catch (err) {
      alert("Error sending message. Please call us directly.")
    } finally {
      setLoading(false)
    }
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
          </div>
        </div>

        <div className="form-panel">
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">First name *</label><input className="form-input" name="firstName" required /></div>
                    <div className="form-group"><label className="form-label">Last name *</label><input className="form-input" name="lastName" required /></div>
                  </div>
                  <div className="form-group"><label className="form-label">Phone *</label><input className="form-input" name="phone" required /></div>
                  <div className="form-group"><label className="form-label">Message</label><textarea className="form-textarea" name="message"></textarea></div>
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
    </div>
  )
}
