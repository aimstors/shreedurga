import { motion } from 'framer-motion'
import { 
  ArrowRight, Layout, Home, Award, Plus, 
  MessageCircle, Star, Check, Smartphone, 
  Zap, Settings, Users, PenTool, ClipboardList, Phone
} from 'lucide-react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useState, useEffect, useRef } from 'react'

const ProjectCard = ({ cat, title, meta, badge, img, wide = false, delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="p-card"
    data-proj={cat.toLowerCase()}
  >
    <div className="p-card-bg" style={{ backgroundImage: `url('${img}')` }}></div>
    <div className="p-card-overlay"></div>
    <div className="p-card-top">
      <span className="p-card-cat">{cat}</span>
      {badge && <span className="p-card-badge">{badge}</span>}
    </div>
    <div className="p-card-hover-detail"><div className="p-view-btn">View Project</div></div>
    <div className="p-card-info">
      <div className="p-title">{title}</div>
      <div className="p-meta">
        {meta.map((m: string, i: number) => (
          <span key={i}>
            {i > 0 && <span className="p-meta-dot"></span>}
            {m.includes('weeks') ? <span className="p-pill">{m}</span> : m}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
)

const StatItem = ({ target, suffix = '', label, delay = 0 }: any) => {
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
      className="stat-item"
    >
      <div className="stat-num">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </motion.div>
  )
}

const ProjectsPage = () => {
  const [filter, setFilter] = useState('all')

  return (
    <div className="page-projects-dark" style={{ background: '#000', color: '#fff' }}>
      <Nav />

      <div className="page-hero">
        <div className="breadcrumb"><a href="/">Home</a><span>›</span><span>Projects</span></div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="page-title"
        >
          850+ spaces<br />transformed.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="page-sub"
        >
          A curated selection of our finest work across Assam.
        </motion.p>
      </div>

      <div className="filter-wrap">
        {['All Projects', 'Kitchen', 'Living', 'Bedroom', 'Office', 'Ceiling'].map(f => (
          <button 
            key={f}
            className={`filter-btn ${filter === f.split(' ')[0].toLowerCase() ? 'active' : ''}`}
            onClick={() => setFilter(f.split(' ')[0].toLowerCase())}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="projects-section">
        {/* HERO GRID */}
        <div className="projects-hero-grid">
          <ProjectCard 
            cat="Modular Kitchen" title="Modern Modular Kitchen, Duliajan" badge="Featured"
            meta={["2024", "₹4.5 Lakhs", "3 weeks"]}
            img="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80"
          />
          <ProjectCard 
            cat="Living Room" title="Luxury Living Room, Dibrugarh" delay={0.1}
            meta={["2024", "₹3.2 Lakhs"]}
            img="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80"
          />
          <ProjectCard 
            cat="Office" title="Corporate Office, Guwahati" delay={0.2}
            meta={["2024", "₹8.5 Lakhs"]}
            img="https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80"
          />
        </div>

        {/* ROW 2 */}
        <div className="projects-row">
          <ProjectCard 
            cat="Bedroom" title="Master Bedroom, Jorhat"
            meta={["2024", "₹2.1 Lakhs"]}
            img="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80"
          />
          <ProjectCard 
            cat="False Ceiling" title="POP Ceiling Design, Tinsukia" delay={0.1}
            meta={["2023", "₹1.8 Lakhs"]}
            img="https://images.unsplash.com/photo-1600607687939-ce8a6d349947?w=600&q=80"
          />
          <ProjectCard 
            cat="Kitchen" title="Compact Kitchen, Sibsagar" delay={0.2}
            meta={["2023", "₹2.8 Lakhs"]}
            img="https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80"
          />
        </div>

        {/* ROW 3 */}
        <div className="projects-row-2">
          <ProjectCard 
            cat="Full Home Interior" title="Full Home Renovation, Assam" badge="Awarded"
            meta={["2023", "₹18 Lakhs", "8 weeks"]}
            img="https://images.unsplash.com/photo-1618219740975-d40978bb7378?w=800&q=80"
          />
          <ProjectCard 
            cat="Office Interior" title="Modern Workspace, Duliajan" delay={0.1}
            meta={["2023", "₹5.5 Lakhs"]}
            img="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=700&q=80"
          />
        </div>
      </div>

      <div className="stats-row">
        <StatItem target={850} suffix="+" label="Projects completed" />
        <StatItem target={25} label="Years of excellence" delay={0.1} />
        <StatItem target={98} suffix="%" label="Client satisfaction" delay={0.2} />
        <StatItem target={12} label="Design awards" delay={0.3} />
      </div>

      <section className="teaser">
        <div className="teaser-inner">
          <div>
            <div style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>Our approach</div>
            <h2 className="teaser-title">Every project, the same meticulous care.</h2>
            <p className="teaser-sub">From first consultation to final handover, our proven five-step process ensures your vision is realised perfectly — on time and within budget.</p>
            <a href="/services" className="btn-blue">Explore All Services</a>
          </div>
          <div className="teaser-steps">
            <div className="t-step">
              <div className="t-step-icon" style={{ background: 'rgba(41,151,255,.1)', color: 'var(--accent)' }}><MessageCircle size={18} /></div>
              <div><div className="t-step-title">01 · Consultation</div><div className="t-step-desc">We understand your vision, space, and budget.</div></div>
            </div>
            <div className="t-step">
              <div className="t-step-icon" style={{ background: 'rgba(48,209,88,.1)', color: 'var(--accent2)' }}><Layout size={18} /></div>
              <div><div className="t-step-title">02 · 3D Design</div><div className="t-step-desc">Photorealistic renders before a single nail.</div></div>
            </div>
            <div className="t-step">
              <div className="t-step-icon" style={{ background: 'rgba(255,159,10,.1)', color: 'var(--accent3)' }}><Check size={18} /></div>
              <div><div className="t-step-title">03 · Execution & Handover</div><div className="t-step-desc">Expert craftsmanship, delivered on time.</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">Your project could be next.</h2>
          <p className="cta-sub">Book a free consultation and let's start planning your transformation.</p>
          <div className="btn-row">
            <a href="#contact" className="btn-blue">Get a Free Quote</a>
            <a href="tel:+919435754461" className="btn-ghost">Call Now</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ProjectsPage
