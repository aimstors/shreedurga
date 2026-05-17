import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'


export const Route = createFileRoute('/projects')({
  head: () => ({
    meta: [
      { title: 'Portfolio | Shree Durga Interior' },
      { name: 'description', content: 'Explore our curated selection of 850+ transformed spaces across Assam.' },
    ],
  }),
  component: ProjectsPage,
})

const ProjectCard = ({ cat, title, meta, badge, img, delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="p-card"
  >
    <div className="p-card-bg" style={{ backgroundImage: `url('${img}')` }}></div>
    <div className="p-card-overlay"></div>
    <div className="p-card-top">
      <span className="p-card-cat">{cat}</span>
      {badge && <span className="p-card-badge">{badge}</span>}
    </div>
    <div className="p-card-info">
      <div className="p-title">{title}</div>
      <div className="p-meta">
        {meta.map((m: string, i: number) => (
          <span key={i}>
            {i > 0 && <span className="p-meta-dot"></span>}
            {m}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
)

function ProjectsPage() {
  return (
    <div className="page-projects-dark" style={{ background: '#000', color: '#fff' }}>
      <div className="page-hero">
        <div className="breadcrumb"><Link to="/">Home</Link><span>›</span><span>Projects</span></div>
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

      <div className="projects-section">
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
      </div>
    </div>
  )
}
