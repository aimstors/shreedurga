import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { 
  ArrowRight, Layout, Home, Award, Plus, 
  MessageCircle, Star, Check, Smartphone, 
  Zap, Settings, Users, PenTool, ClipboardList, Phone
} from 'lucide-react'

export const Route = createFileRoute('/services')({
  head: () => ({
    meta: [
      { title: 'Our Services | Shree Durga Interior' },
      { name: 'description', content: 'Comprehensive interior design services across Assam — Modular Kitchen, Office Design, and more.' },
    ],
  }),
  component: ServicesPage,
})

const ServiceBento = ({ num, icon: Icon, title, desc, delay = 0, featured = false }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`s-bento-card ${featured ? 'featured' : ''}`}
  >
    <div className="s-num">{num}</div>
    <div className="s-icon"><Icon size={24} /></div>
    <div className="s-title">{title}</div>
    <div className="s-desc">{desc}</div>
    <div className="s-arrow"><ArrowRight size={14} /></div>
  </motion.div>
)

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
          Spaces that inspire.<br />Expertly designed.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="page-sub"
        >
          From residential sanctuaries to high-performance workspaces, we deliver tailored interior solutions across Assam.
        </motion.p>
      </div>

      <div className="services-grid-wrap">
        <div className="services-bento-grid">
          <ServiceBento 
            num="01" icon={Layout} title="Full Home Interior" featured
            desc="Complete end-to-end interior design and styling. We manage everything from concept to final handover."
          />
          <ServiceBento 
            num="02" icon={Home} title="Modular Kitchen" delay={0.1}
            desc="Premium modular kitchens with intelligent storage, high-end finishes, and durable materials."
          />
          <ServiceBento 
            num="03" icon={Award} title="Corporate Office" delay={0.2}
            desc="Professional, ergonomic office spaces designed to boost productivity and reflect your brand."
          />
          <ServiceBento 
            num="04" icon={Plus} title="3D Visualisation" delay={0.3}
            desc="Photorealistic 3D renders that allow you to see and perfect your space before execution begins."
          />
          <ServiceBento 
            num="05" icon={Zap} title="False Ceiling" delay={0.4}
            desc="Designer POP and PVC ceilings with integrated mood lighting and acoustic properties."
          />
        </div>
      </div>
    </div>
  )
}
