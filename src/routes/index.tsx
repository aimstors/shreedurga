import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Check, ArrowRight, MapPin } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { allServices } from '@/lib/services'
import { serviceAreas, serviceAreaIntro } from '@/lib/service-areas'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Home | Shree Durga Interior' },
      { name: 'description', content: 'Assam’s Premier Interior Studio — Beautiful spaces, crafted with care.' },
    ],
  }),
  component: HomePage,
})

function Hero() {
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
            <Link to="/contact" className="btn-primary">Book Free Consultation</Link>
            <Link to="/services" className="btn-secondary">Explore Services</Link>
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

function StatCounter({ target, suffix = '', label, delay = 0 }: any) {
  const [count, setCount] = useState(0)
  const nodeRef = useRef<HTMLDivElement>(null)

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

function HomePage() {
  return (
    <div className="page-home">
      <Hero />
      <div className="stats">
        <div className="stats-inner">
          <StatCounter target={25} label="Years of excellence" />
          <StatCounter target={850} suffix="+" label="Projects completed" delay={0.1} />
          <StatCounter target={98} suffix="%" label="Client satisfaction" delay={0.2} />
          <StatCounter target={12} label="Design awards won" delay={0.3} />
        </div>
      </div>
      {/* ... Other sections would go here ... */}
    </div>
  )
}
