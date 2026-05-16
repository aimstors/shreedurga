import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, Mail, MapPin, Check, Star, ArrowRight, Home, Layout, 
  Award, Plus
} from 'lucide-react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

// --- Local Components ---

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg-circle"></div>
      <div className="hero-bg-circle2"></div>
      <div className="hero-grid-pattern"></div>
      <div className="hero-inner">
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hero-eyebrow"
          >
            <span className="hero-eyebrow-dot"></span>
            Assam's Premier Interior Studio
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-title"
          >
            Beautiful spaces,<br />crafted with <em>care.</em>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-sub"
          >
            We transform homes, offices and commercial spaces into extraordinary environments — designed with precision, built to last.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-actions"
          >
            <a href="#contact" className="btn-primary">Book Free Consultation</a>
            <a href="#services" className="btn-secondary">Explore Services</a>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hero-trust"
          >
            <div className="trust-avatars">
              <div className="trust-avatar" style={{ background: '#D4E6FF' }}>R</div>
              <div className="trust-avatar" style={{ background: '#D4F2E6' }}>P</div>
              <div className="trust-avatar" style={{ background: '#FDF2D4' }}>A</div>
              <div className="trust-avatar" style={{ background: '#F2D4D4' }}>M</div>
              <div className="trust-avatar" style={{ background: '#E6D4F2' }}>S</div>
            </div>
            <p className="trust-text"><strong>850+ happy clients</strong> across Assam</p>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-visual"
        >
          <div className="hero-img-wrap">
            <div className="hero-img"></div>
          </div>
          <div className="hero-card">
            <div className="hero-card-icon">
              <Check size={22} color="var(--gold)" />
            </div>
            <div>
              <div className="hero-card-title">Project delivered on time</div>
              <div className="hero-card-sub">Full kitchen renovation · Duliajan · 3 weeks</div>
            </div>
          </div>
          <div className="hero-float-badge">
            <div className="hero-float-badge-num">25</div>
            <div className="hero-float-badge-text">Years of<br />Excellence</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const StatCounter = ({ target, suffix = '', label, delay = 0 }: { target: number, suffix?: string, label: string, delay?: number }) => {
  const [count, setCount] = useState(0)
  const nodeRef = useRef(null)

  useEffect(() => {
    let startTime: number | null = null
    const duration = 2000

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        window.requestAnimationFrame(step)
        observer.disconnect()
      }
    }, { threshold: 0.5 })

    if (nodeRef.current) observer.observe(nodeRef.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <motion.div 
      ref={nodeRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="stat"
    >
      <div className="stat-num">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </motion.div>
  )
}

const Stats = () => {
  return (
    <div className="stats">
      <div className="stats-inner">
        <StatCounter target={25} label="Years of excellence" delay={0} />
        <StatCounter target={850} suffix="+" label="Projects completed" delay={0.1} />
        <StatCounter target={98} suffix="%" label="Client satisfaction" delay={0.2} />
        <StatCounter target={12} label="Design awards won" delay={0.3} />
      </div>
    </div>
  )
}

const About = () => {
  return (
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
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="section-eyebrow"
            >
              Our story
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title"
            >
              Crafting beautiful interiors <em>for over two decades.</em>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="section-sub"
              style={{ marginBottom: '8px' }}
            >
              Founded in 1999 in Duliajan, Assam, Shree Durga Interior has grown into one of the region's most trusted interior design studios — with a reputation built on exceptional craftsmanship, transparent pricing, and a genuine passion for beautiful spaces.
            </motion.p>
            <div className="about-feats">
              {[
                "Premium materials, locally and globally sourced",
                "Photorealistic 3D visualisation before execution",
                "On-time delivery with full project management",
                "Transparent, zero-hidden-cost pricing"
              ].map((feat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="about-feat"
                >
                  <div className="check"><Check size={11} color="var(--green)" /></div>
                  {feat}
                </motion.div>
              ))}
            </div>
            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              href="#contact" 
              className="btn-primary" 
              style={{ display: 'inline-block' }}
            >
              Start Your Project
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}

const ServiceCard = ({ num, icon: Icon, title, desc, tags, featured = false, delay = 0 }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`svc ${featured ? 'featured' : ''}`}
    >
      <div className="svc-num">{num}</div>
      <div className="svc-icon" style={{ background: 'var(--bg2)' }}>
        <Icon size={24} />
      </div>
      <div className="svc-title">{title}</div>
      <p className="svc-desc">{desc}</p>
      {tags && (
        <div className="svc-tags">
          {tags.map((tag: string) => <span key={tag} className="svc-tag">{tag}</span>)}
        </div>
      )}
      <div className="svc-arrow">
        <ArrowRight size={13} />
      </div>
    </motion.div>
  )
}

const Services = () => {
  return (
    <section className="section services" id="services">
      <div className="section-inner">
        <div className="services-header">
          <div>
            <div className="section-eyebrow">What we do</div>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Services <em>built for you.</em></h2>
          </div>
          <a href="/services" className="section-link">All services <ArrowRight size={14} /></a>
        </div>
        <div className="services-bento">
          <ServiceCard 
            num="01" 
            icon={Layout} 
            title="Full Interior Design & Styling" 
            desc="Our flagship end-to-end service. From concept and space planning to 3D visualisation and final handover — we manage everything so you don't have to."
            tags={["Concept Design", "3D Render", "Project Management"]}
            featured
          />
          <ServiceCard 
            num="02" 
            icon={Home} 
            title="Modular Kitchen" 
            desc="Smart, beautiful kitchens with custom cabinets, premium countertops, and intelligent storage solutions."
            delay={0.1}
          />
          <ServiceCard 
            num="03" 
            icon={Award} 
            title="Office Interior Design" 
            desc="Ergonomic, professional workspaces with glass partitions, acoustic solutions, and brand-driven aesthetics."
            delay={0.2}
          />
          <ServiceCard 
            num="04" 
            icon={Home} 
            title="Room Interior Design" 
            desc="Bedrooms, living rooms, studies — custom furniture, mood lighting, and curated wall treatments."
          />
          <ServiceCard 
            num="05" 
            icon={Plus} 
            title="False Ceiling & 3D Design" 
            desc="Designer POP, gypsum and PVC ceilings with integrated lighting — previewed in photorealistic 3D first."
            delay={0.1}
          />
        </div>
      </div>
    </section>
  )
}

const ContactForm = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [budget, setBudget] = useState<string | null>(null)

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

  if (success) return (
    <div className="form-success" style={{ display: 'block' }}>
      <div className="success-ring"><Check size={30} /></div>
      <div className="success-title">Message received!</div>
      <p className="success-desc">Thank you for reaching out. Our team will contact you within 24 hours to discuss your project and arrange a consultation.</p>
      <a href="tel:+919435754461" className="btn-primary" style={{ display: 'inline-block' }}>Call us: +91 94357 54461</a>
    </div>
  )

  return (
    <div id="formWrap">
      <div className="form-title">Book your free consultation</div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="fgroup"><label className="flabel">First name *</label><input className="finput" name="firstName" type="text" placeholder="Rajesh" required /></div>
          <div className="fgroup"><label className="flabel">Last name *</label><input className="finput" name="lastName" type="text" placeholder="Sharma" required /></div>
        </div>
        <div className="form-row">
          <div className="fgroup"><label className="flabel">Phone *</label><input className="finput" name="phone" type="tel" placeholder="+91 98765 43210" required /></div>
          <div className="fgroup"><label className="flabel">Email</label><input className="finput" name="email" type="email" placeholder="you@example.com" /></div>
        </div>
        <div className="fgroup"><label className="flabel">City / Location</label><input className="finput" name="city" type="text" placeholder="Duliajan, Assam" /></div>
        
        <div className="fgroup">
          <label className="flabel">Services interested in</label>
          <div className="chips">
            {["Interior Design", "Modular Kitchen", "Room Interior", "Office Interior", "False Ceiling", "Custom Furniture", "Steel Railing", "3D Visualisation"].map(svc => (
              <div 
                key={svc} 
                className={`chip ${selectedServices.includes(svc) ? 'on' : ''}`}
                onClick={() => toggleService(svc)}
              >
                {svc}
              </div>
            ))}
          </div>
        </div>

        <div className="fgroup">
          <label className="flabel">Approximate budget</label>
          <div className="budget-grid">
            {["Under ₹1 Lakh", "₹1–3 Lakhs", "₹3–10 Lakhs", "₹10L+"].map(b => (
              <button 
                key={b}
                type="button" 
                className={`bud ${budget === b ? 'on' : ''}`}
                onClick={() => setBudget(b)}
              >
                {b.replace(' ', '\n')}
              </button>
            ))}
          </div>
        </div>

        <div className="fgroup"><label className="flabel">Tell us about your project</label><textarea className="ftextarea" name="message" placeholder="Describe your space, style preferences, timeline, and any specific needs…"></textarea></div>
        
        <div className="form-submit-row">
          <p className="form-note">We respond within 24 hours.<br />Your details are kept private.</p>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send message'} <ArrowRight size={15} />
          </button>
        </div>
      </form>
    </div>
  )
}

const HomePage = () => {
  return (
    <div className="page-home">
      <Nav />
      <Hero />
      <Stats />
      <About />
      <Services />
      
      {/* Projects Grid */}
      <section className="section projects" id="projects">
        <div className="section-inner">
          <div className="services-header">
            <div>
              <div className="section-eyebrow">Portfolio</div>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Recent <em>transformations.</em></h2>
            </div>
            <a href="/projects" className="section-link">All projects <ArrowRight size={14} /></a>
          </div>
          <div className="projects-grid">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="proj"
            >
              <div className="proj-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80')" }}></div>
              <div className="proj-overlay"></div>
              <div className="proj-cat">Modular Kitchen</div>
              <div className="proj-info"><div className="proj-title">Modern Kitchen, Duliajan</div><div className="proj-meta">2024 · ₹4.5 Lakhs · 3 weeks</div></div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="proj"
            >
              <div className="proj-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80')" }}></div>
              <div className="proj-overlay"></div>
              <div className="proj-cat">Living Room</div>
              <div className="proj-info"><div className="proj-title">Luxury Living Room, Dibrugarh</div><div className="proj-meta">2024 · ₹3.2 Lakhs</div></div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="section-inner">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="section-eyebrow">Get in touch</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="section-title">Let's build something <em>beautiful.</em></motion.h2>
          <div className="contact-grid" style={{ marginTop: '48px' }}>
            <div className="contact-info">
              <div>
                <div className="contact-info-title">Ready to transform your space?</div>
                <p className="contact-info-sub">Tell us about your project and we'll be in touch within 24 hours — no commitment required.</p>
                <div className="contact-detail">
                  <div className="contact-detail-icon"><Phone size={17} /></div>
                  <div><div className="contact-detail-label">Phone & WhatsApp</div><div className="contact-detail-val"><a href="tel:+919435754461">+91 94357 54461</a></div></div>
                </div>
                <div className="contact-detail">
                  <div className="contact-detail-icon"><Mail size={17} /></div>
                  <div><div className="contact-detail-label">Email</div><div className="contact-detail-val"><a href="mailto:shreedurgainterior50@gmail.com">shreedurgainterior50@gmail.com</a></div></div>
                </div>
                <div className="contact-detail">
                  <div className="contact-detail-icon"><MapPin size={17} /></div>
                  <div><div className="contact-detail-label">Studio</div><div className="contact-detail-val">Kamalabari Rd, Opp. Bajaj Dealer<br />Duliajan, Assam</div></div>
                </div>
              </div>
            </div>
            <div className="contact-form-wrap">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HomePage
