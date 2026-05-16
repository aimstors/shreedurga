import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'Our Story | Shree Durga Interior' },
      { name: 'description', content: 'Crafting beautiful interiors for over two decades in Duliajan, Assam.' },
    ],
  }),
  component: AboutPage,
})

function AboutPage() {
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
            <Link 
              to="/contact" 
              className="btn-primary" 
              style={{ display: 'inline-block' }}
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
