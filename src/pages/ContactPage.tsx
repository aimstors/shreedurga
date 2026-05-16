import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, Phone, Mail, MessageCircle, MapPin, 
  Clock, Facebook, Check, ChevronRight, X, Plus
} from 'lucide-react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useState } from 'react'

const FAQItem = ({ question, answer, delay = 0 }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`faq-item ${isOpen ? 'open' : ''}`}
    >
      <button className="faq-btn" onClick={() => setIsOpen(!isOpen)}>
        {question} 
        <Plus size={18} style={{ transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s' }} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="faq-answer"
          >
            <div className="faq-answer-inner">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const ContactPage = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [budget, setBudget] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const toggleService = (svc: string) => {
    setSelectedServices(prev => 
      prev.includes(svc) ? prev.filter(s => s !== svc) : [...prev, svc]
    )
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    data.services = selectedServices as any
    data.budget = budget as any

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.ok) setSuccess(true)
      else throw new Error("Failed")
    } catch (err) {
      alert("Error sending message. Please call us directly.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-contact-dark" style={{ background: '#000', color: '#fff' }}>
      <Nav />
      
      <div className="page-hero">
        <div className="breadcrumb"><a href="/">Home</a><span>›</span><span>Contact</span></div>
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
          Tell us about your project and we'll be in touch within 24 hours.
        </motion.p>
      </div>

      <div className="quick-row">
        <motion.a href="tel:+919435754461" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="quick-item">
          <div className="q-icon" style={{ background: 'rgba(41,151,255,.1)', color: 'var(--accent)' }}>
            <Phone size={20} />
          </div>
          <div>
            <div className="q-label">Call directly</div>
            <div className="q-value">+91 94357 54461</div>
            <div className="q-sub">Mon–Sat, 9 AM – 6 PM</div>
          </div>
        </motion.a>
        <motion.a href="mailto:shreedurgainterior50@gmail.com" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} className="quick-item">
          <div className="q-icon" style={{ background: 'rgba(48,209,88,.1)', color: 'var(--accent2)' }}>
            <Mail size={20} />
          </div>
          <div>
            <div className="q-label">Email us</div>
            <div className="q-value" style={{ fontSize: '13px', marginTop: '2px' }}>shreedurgainterior50@gmail.com</div>
            <div className="q-sub">Reply within 24 hours</div>
          </div>
        </motion.a>
        <motion.a href="https://wa.me/+919435754461" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="quick-item">
          <div className="q-icon" style={{ background: 'rgba(48,209,88,.1)', color: 'var(--accent2)' }}>
            <MessageCircle size={20} />
          </div>
          <div>
            <div className="q-label">WhatsApp</div>
            <div className="q-value">Message us</div>
            <div className="q-sub">Quick responses, any time</div>
          </div>
        </motion.a>
      </div>

      <div className="contact-layout">
        <div className="info-panel">
          <div className="info-eyebrow">Get in touch</div>
          <h2 className="info-title">We'd love to hear about your project.</h2>
          <p className="info-desc">Whether it's a full home renovation or a single room refresh — our team is ready to listen, advise, and create something extraordinary for you.</p>

          <div className="info-items">
            <div className="info-item">
              <div className="info-icon"><MapPin size={17} /></div>
              <div>
                <div className="info-item-label">Studio location</div>
                <div className="info-item-value">Kamalabari Rd, Opposite Bajaj Dealer<br />Duliajan, Assam — India</div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><Clock size={17} /></div>
              <div>
                <div className="info-item-label">Opening hours</div>
                <div className="info-item-value">
                  <div className="hours-grid">
                    <div className="hours-block"><div className="hours-day">Mon – Sat</div><div className="hours-time">9:00 AM – 6:00 PM</div></div>
                    <div className="hours-block"><div className="hours-day">Sunday</div><div className="hours-time">By appointment</div></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><Phone size={17} /></div>
              <div>
                <div className="info-item-label">Phone & WhatsApp</div>
                <div className="info-item-value"><a href="tel:+919435754461">+91 94357 54461</a></div>
              </div>
            </div>
          </div>

          <div className="social-row">
            <a href="https://www.facebook.com/shreedurgainterior" className="soc-pill"><Facebook size={15} /> Facebook</a>
            <a href="https://wa.me/+919435754461" className="soc-pill"><MessageCircle size={15} /> WhatsApp</a>
          </div>
        </div>

        <div className="form-panel">
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div 
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                id="formWrap"
              >
                <div className="form-eyebrow">Send a message</div>
                <h2 className="form-title">Book your free consultation.</h2>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">First name *</label><input className="form-input" name="firstName" type="text" placeholder="Rajesh" required /></div>
                    <div className="form-group"><label className="form-label">Last name *</label><input className="form-input" name="lastName" type="text" placeholder="Sharma" required /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">Phone number *</label><input className="form-input" name="phone" type="tel" placeholder="+91 98765 43210" required /></div>
                    <div className="form-group"><label className="form-label">Email address</label><input className="form-input" name="email" type="email" placeholder="you@example.com" /></div>
                  </div>
                  <div className="form-group"><label className="form-label">City / Location</label><input className="form-input" name="city" type="text" placeholder="Duliajan, Assam" /></div>
                  
                  <div className="form-group">
                    <label className="form-label">Services you're interested in</label>
                    <div className="service-chips">
                      {["Interior Design", "Modular Kitchen", "Room Interior", "Office Interior", "False Ceiling", "Custom Furniture", "3D Visualisation", "Steel Railing", "UPVC Windows"].map(svc => (
                        <div 
                          key={svc} 
                          className={`chip ${selectedServices.includes(svc) ? 'selected' : ''}`}
                          onClick={() => toggleService(svc)}
                        >
                          <span className="chip-dot"></span>{svc}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Project type</label>
                    <select name="projectType" className="form-select">
                      <option value="" disabled selected>Select project type</option>
                      <option>Full Home Interior</option>
                      <option>Single Room</option>
                      <option>Modular Kitchen Only</option>
                      <option>Office / Commercial</option>
                      <option>New Construction</option>
                      <option>Renovation / Makeover</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Approximate budget</label>
                    <div className="budget-row">
                      {["Under ₹1 Lakh", "₹1–3 Lakhs", "₹3–10 Lakhs", "₹10L+"].map(b => (
                        <button 
                          key={b}
                          type="button" 
                          className={`budget-btn ${budget === b ? 'selected' : ''}`}
                          onClick={() => setBudget(b)}
                        >
                          {b.replace(' ', '\n')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tell us about your project</label>
                    <textarea name="message" className="form-textarea" placeholder="Describe your space, style preferences, timeline, and any specific requirements…"></textarea>
                  </div>

                  <div className="form-bottom">
                    <p className="form-note">We typically respond within 24 hours.<br />Your details are kept completely private.</p>
                    <button type="submit" className="btn-submit" disabled={loading}>
                      {loading ? 'Sending...' : 'Send message'} <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="form-success"
                style={{ display: 'block' }}
              >
                <div className="success-icon"><Check size={28} /></div>
                <h3 className="success-title">Message received!</h3>
                <p className="success-desc">Thank you for reaching out. Our team will contact you within 24 hours to discuss your project and arrange a free consultation.</p>
                <a href="tel:+919435754461" className="btn-submit">
                  <Phone size={16} /> Call now: +91 94357 54461
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="map-section">
        <div className="map-inner">
          <div className="map-info">
            <h3 className="map-info-title">Visit our studio</h3>
            <div className="map-detail">
              <div className="map-detail-icon">📍</div>
              <div className="map-detail-text"><strong>Studio Address</strong>Kamalabari Rd, Opposite Bajaj Dealer<br />Duliajan, Assam — India</div>
            </div>
            <div className="map-detail">
              <div className="map-detail-icon">🕐</div>
              <div className="map-detail-text"><strong>Opening Hours</strong>Monday – Saturday: 9:00 AM – 6:00 PM<br />Sunday: By appointment</div>
            </div>
            <div className="map-detail">
              <div className="map-detail-icon">📞</div>
              <div className="map-detail-text"><strong>Phone</strong><a href="tel:+919435754461" style={{ color: 'var(--accent)', textDecoration: 'none' }}>+91 94357 54461</a></div>
            </div>
            <a href="https://maps.google.com/?q=Kamalabari+Rd+Duliajan+Assam" target="_blank" rel="noreferrer" className="map-link">
              Open in Google Maps <ArrowRight size={14} />
            </a>
          </div>
          <div className="map-embed" style={{ background: '#111' }}>
            <div className="map-pin-anim"><MapPin size={24} color="var(--accent)" /></div>
            <div className="map-place-name">Duliajan, Assam</div>
            <div className="map-place-sub">Kamalabari Road · Near Bajaj Dealer</div>
            <a href="https://maps.google.com/?q=Kamalabari+Rd+Duliajan+Assam" target="_blank" rel="noreferrer" className="map-open-btn">
              View on Google Maps <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>

      <section className="faq-section">
        <div className="faq-inner">
          <div className="faq-eyebrow">Frequently asked</div>
          <h2 className="faq-title">Common questions.</h2>
          <div className="faq-list">
            <FAQItem 
              question="How long does a project typically take?" 
              answer="Timelines vary by scope. A single room typically takes 2–4 weeks. Full home renovations range from 6–16 weeks. We provide a detailed timeline at the start of every project so you always know exactly where things stand." 
            />
            <FAQItem 
              question="Do you offer free consultations?" 
              answer="Yes — absolutely. We offer a complimentary first consultation at our studio or at your location. We listen to your vision and share initial ideas. No obligation, no pressure." 
              delay={0.1}
            />
            <FAQItem 
              question="Can I see a 3D design before work begins?" 
              answer="Absolutely. We produce photorealistic 3D renderings of your space before any physical work begins — so you can visualise the result, request adjustments, and feel 100% confident before we start." 
              delay={0.2}
            />
            <FAQItem 
              question="Do you work outside Duliajan?" 
              answer="Yes. We serve clients across Assam — including Dibrugarh, Guwahati, Jorhat, Tinsukia, and beyond. Get in touch with your location and we'll discuss." 
              delay={0.3}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ContactPage
