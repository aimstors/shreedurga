import { motion } from 'framer-motion'
import { 
  ArrowRight, Layout, Home, Award, Plus, 
  MessageCircle, Star, Check, Smartphone, 
  Zap, Settings, Users, PenTool, ClipboardList, Phone
} from 'lucide-react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useState } from 'react'

const ServiceHeroCard = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="svc-hero-card"
    data-cat="residential commercial design"
  >
    <div className="svc-hero-card-body">
      <div className="new-badge"><span className="new-dot"></span> New Service</div>
      <div className="svc-card-num">01 — Flagship</div>
      <h2 className="svc-card-title">Full Interior Design & Styling</h2>
      <p className="svc-card-desc">Our signature end-to-end service. From first consultation to final handover — we manage every detail so you don't have to.</p>
      <ul className="svc-features">
        {[
          "Personalised concept & mood board development",
          "Professional space planning & layout optimisation",
          "Photorealistic 3D visualisation before execution",
          "Material, colour & furniture curation",
          "Full project management & final styling"
        ].map((feat, i) => (
          <li key={i}>
            <div className="svc-feat-icon"><Check size={10} /></div>
            {feat}
          </li>
        ))}
      </ul>
      <a href="#contact" className="svc-cta">Book a consultation <ArrowRight size={16} /></a>
    </div>
    <div className="svc-hero-card-visual" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=700&q=80')" }}></div>
  </motion.div>
)

const BentoCard = ({ num, icon: Icon, title, desc, tags, wide = false, accent = '', delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className={`svc-card ${wide ? 'wide' : ''} ${accent}`}
  >
    <div className="card-num-bg">{num}</div>
    <div className="card-icon-wrap">
      <Icon size={24} />
    </div>
    <h3 className="card-title">{title}</h3>
    <p className="card-desc">{desc}</p>
    {tags && (
      <div className="card-tags">
        {tags.map((tag: string) => <span key={tag} className="card-tag">{tag}</span>)}
      </div>
    )}
    <div className="card-arrow"><ArrowRight size={12} /></div>
  </motion.div>
)

const ProcessStep = ({ num, icon: Icon, title, desc, delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="p-step" 
    data-num={num}
  >
    <div className="p-icon"><Icon size={22} /></div>
    <div className="p-title">{title}</div>
    <div className="p-desc">{desc}</div>
  </motion.div>
)

const ServicesPage = () => {
  const [filter, setFilter] = useState('all')

  return (
    <div className="page-services-dark" style={{ background: '#000', color: '#fff' }}>
      <Nav />
      
      <div className="page-hero">
        <div className="breadcrumb"><a href="/">Home</a><span>›</span><span>Services</span></div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="page-title"
        >
          Everything you need,<br />under one roof.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="page-sub"
        >
          11 services. One trusted team. Transforming spaces across Assam since 1999.
        </motion.p>
      </div>

      <div className="filter-wrap">
        {['All', 'Residential', 'Commercial', 'Structural', 'Design'].map(f => (
          <button 
            key={f}
            className={`filter-btn ${filter === f.toLowerCase() ? 'active' : ''}`}
            onClick={() => setFilter(f.toLowerCase())}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="services-section">
        <ServiceHeroCard />

        <div className="bento bento-2col">
          <BentoCard 
            num="02" icon={Layout} title="Modular Kitchen" accent="accent-blue" wide
            desc="Custom-built cabinets, granite or quartz countertops, smart storage, integrated appliances, and elegant lighting. Your dream kitchen, precisely engineered."
            tags={["Custom Cabinets", "Smart Storage", "Countertops"]}
          />
          <BentoCard 
            num="03" icon={Home} title="Room Interior Design" accent="accent-orange"
            desc="Bedrooms, living rooms, studies — custom furniture, mood lighting, wall treatments, and stylish false ceilings tailored to you."
            tags={["Custom Furniture", "Lighting"]}
          />
        </div>

        <div className="bento">
          <BentoCard 
            num="04" icon={Award} title="Office Interior Design" accent="accent-purple"
            desc="Ergonomic workstations, glass partitions, acoustic solutions, and brand-led spaces that inspire productivity."
          />
          <BentoCard 
            num="05" icon={Zap} title="Custom Furniture Design" accent="accent-green"
            desc="Bespoke sofas, beds, wardrobes, dining sets, workstations — crafted with premium materials to your exact specifications."
          />
          <BentoCard 
            num="06" icon={Plus} title="False Ceiling Installation"
            desc="Designer POP, gypsum, wooden and PVC ceilings with integrated cove and recessed lighting for complete atmosphere control."
          />
        </div>

        <div className="bento bento-2col">
          <BentoCard 
            num="07" icon={Layout} title="2D & 3D Design Visualisation"
            desc="See your space before a single wall changes. We produce professional 2D floor plans and photorealistic 3D renders so you can make decisions with total confidence."
            tags={["Floor Plans", "3D Render"]}
          />
          <BentoCard 
            num="08" icon={Settings} title="Steel Railing & Aluminium Windows" accent="accent-red"
            desc="Rust-resistant, low-maintenance steel railings and premium aluminium windows — customisable for modern or traditional aesthetics."
          />
        </div>
      </div>

      <section className="process-section" style={{ background: '#0a0a0a' }}>
        <div className="process-inner">
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <div style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--accent)' }}>How we work</div>
          </div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, letterSpacing: '-.04em', textAlign: 'center', marginBottom: 0 }}>Our design process.</h2>
          <div className="process-steps">
            <ProcessStep num="01" icon={MessageCircle} title="Consultation" desc="We listen to your vision, goals, and requirements in detail." />
            <ProcessStep num="02" icon={PenTool} title="Design Concept" desc="Our designers craft a bespoke concept tailored to your space." delay={0.1} />
            <ProcessStep num="03" icon={Layout} title="3D Visualisation" desc="Photorealistic renders so you see the result before we build." delay={0.2} />
            <ProcessStep num="04" icon={ClipboardList} title="Execution" desc="Skilled craftsmen bring every detail to life with precision." delay={0.3} />
            <ProcessStep num="05" icon={Check} title="Handover" desc="Your transformed space, delivered on time and styled to perfection." delay={0.4} />
          </div>
        </div>
      </section>

      <div className="cta-strip">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="cta-inner"
        >
          <h2 className="cta-title">Start your project today.</h2>
          <p className="cta-sub">Free consultation, no commitment — just a conversation about your dream space.</p>
          <div className="btn-row">
            <a href="#contact" className="btn-blue">Book Free Consultation</a>
            <a href="tel:+919435754461" className="btn-ghost">Call +91 94357 54461</a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}

export default ServicesPage
