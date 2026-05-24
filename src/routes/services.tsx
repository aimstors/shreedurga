import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { serviceCategories } from '@/lib/services'

const PALETTE = {
  bg: '#f5f3ee',
  surface: '#e8e4dd',
  ink: '#2d2d2d',
  deep: '#0d0d0d',
  border: '#dcd8cf',
}

const serif = { fontFamily: "'DM Serif Display', serif" }
const sans = { fontFamily: "'Fira Sans', sans-serif" }

export const Route = createFileRoute('/services')({
  head: () => ({
    meta: [
      { title: 'Interior Design Services in Tinsukia & Dibrugarh | Shree Durga Interior' },
      { name: 'description', content: 'Modular kitchen, false ceiling, PVC panels, uPVC & aluminium windows, ACP, epoxy flooring and full home/commercial interiors across Upper Assam & Arunachal Pradesh.' },
      { property: 'og:title', content: 'Interior Design Services | Shree Durga Interior' },
      { property: 'og:description', content: 'Complete interior solutions — residential, commercial, modular kitchens, ceilings, windows, flooring and more.' },
    ],
    links: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Fira+Sans:wght@300;400;500;600&display=swap' },
    ],
  }),
  component: ServicesPage,
})

function findCat(id: string) {
  return serviceCategories.find((c) => c.id === id)!
}

function CategoryEyebrow({ num, label }: { num: string; label: string }) {
  return (
    <span className="uppercase tracking-widest text-xs mb-4 block opacity-60" style={sans}>
      {num} / {label}
    </span>
  )
}

function ServicesPage() {
  const interiors = findCat('interiors')
  const design = findCat('design')
  const ceiling = findCat('ceiling-walls')
  const kitchen = findCat('interiors').services.filter((s) =>
    ['modular-kitchen', 'wardrobe', 'tv-unit', 'bed-bedroom'].includes(s.slug),
  )
  const windows = findCat('windows-glass')
  const metal = findCat('metal-exterior')
  const flooring = findCat('flooring')

  const tile =
    'p-8 flex flex-col justify-between transition-all duration-500'

  return (
    <div
      id="services-top"
      className="w-full py-20 px-6 md:px-12 lg:px-24"
      style={{ background: PALETTE.bg, color: PALETTE.ink, ...sans }}
    >
      {/* Hero */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="text-xs uppercase tracking-[0.2em] mb-6 opacity-60">
          <Link to="/" style={{ color: PALETTE.ink }}>Home</Link>
          <span className="mx-2 opacity-40">/</span>
          <span>Services</span>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-8xl mb-8 tracking-tight leading-none"
          style={{ ...serif, color: PALETTE.deep }}
        >
          Our Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl text-xl md:text-2xl font-light leading-relaxed opacity-90"
        >
          From the tea estates of Tinsukia to the hills of Arunachal, we craft
          premium spaces that balance structural integrity with high-end
          aesthetic precision.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">

        {/* 01 Interiors — featured */}
        <motion.div
          id="interiors"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`md:col-span-2 lg:col-span-3 row-span-2 group cursor-pointer hover:bg-[${PALETTE.deep}] hover:text-[${PALETTE.bg}] ${tile}`}
          style={{ background: PALETTE.surface }}
        >
          <div>
            <CategoryEyebrow num="01" label="Interiors" />
            <h3 className="text-4xl mb-4 leading-tight" style={{ ...serif, color: PALETTE.deep }}>
              Residential & Commercial Design
            </h3>
          </div>
          <div className="space-y-2 opacity-80 text-base">
            {interiors.services.slice(0, 2).map((s) => (
              <p key={s.slug}>{s.title}</p>
            ))}
            <p>Retail & Hospitality Fit-outs</p>
          </div>
        </motion.div>

        {/* 02 Ceiling */}
        <motion.div
          id="ceiling-walls"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`md:col-span-2 lg:col-span-2 hover:bg-[${PALETTE.ink}] hover:text-white ${tile}`}
          style={{ background: PALETTE.surface }}
        >
          <CategoryEyebrow num="02" label="Ceiling & Walls" />
          <div className="space-y-1">
            {ceiling.services.map((s) => (
              <p key={s.slug} className="text-xl" style={serif}>{s.title}</p>
            ))}
          </div>
        </motion.div>

        {/* Decorative deep tile */}
        <div
          className="hidden lg:flex items-center justify-center p-8"
          style={{ background: PALETTE.deep }}
        >
          <div className="w-px h-full opacity-20" style={{ background: PALETTE.bg }} />
        </div>

        {/* 03 Kitchen & Storage */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`md:col-span-2 lg:col-span-3 hover:ring-1 hover:ring-[${PALETTE.deep}] ${tile}`}
          style={{ background: PALETTE.surface }}
        >
          <CategoryEyebrow num="03" label="Kitchen & Storage" />
          <div className="grid grid-cols-2 gap-4">
            <h3 className="text-2xl leading-tight" style={{ ...serif, color: PALETTE.deep }}>
              Modular Kitchens
            </h3>
            <p className="text-sm self-end opacity-80">
              {kitchen.filter((k) => k.slug !== 'modular-kitchen').map((k) => k.title).join(' · ')}
            </p>
          </div>
        </motion.div>

        {/* 04 Windows */}
        <motion.div
          id="windows-glass"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`md:col-span-2 lg:col-span-2 row-span-2 ${tile}`}
          style={{
            background: PALETTE.surface,
            borderLeft: `1px solid ${PALETTE.border}`,
            borderTop: `1px solid ${PALETTE.border}`,
          }}
        >
          <CategoryEyebrow num="04" label="Windows & Glass" />
          <div className="space-y-6">
            {windows.services.map((s) => (
              <div key={s.slug}>
                <p className="text-2xl mb-1" style={{ ...serif, color: PALETTE.deep }}>{s.title}</p>
                <p className="text-sm opacity-70">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 05 Metalwork */}
        <motion.div
          id="metal-exterior"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`md:col-span-1 ${tile}`}
          style={{ background: PALETTE.ink, color: PALETTE.bg }}
        >
          <span className="uppercase tracking-widest text-[10px] mb-2 block opacity-50">05 / Metal</span>
          <p className="text-lg leading-tight" style={serif}>
            {metal.services.map((s) => s.title).join(' & ')}
          </p>
        </motion.div>

        {/* 06 Flooring */}
        <motion.div
          id="flooring"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`md:col-span-3 lg:col-span-1 flex flex-col justify-center p-8`}
          style={{
            background: PALETTE.surface,
            borderBottom: `1px solid ${PALETTE.border}`,
            borderRight: `1px solid ${PALETTE.border}`,
          }}
        >
          <CategoryEyebrow num="06" label="Flooring" />
          {flooring.services.map((s) => (
            <p key={s.slug} className="text-base opacity-80">{s.title}</p>
          ))}
        </motion.div>

        {/* Design & Drawing + extras */}
        <motion.div
          id="design"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`md:col-span-2 lg:col-span-2 hover:bg-[${PALETTE.deep}] hover:text-white group ${tile}`}
          style={{ background: PALETTE.surface }}
        >
          <CategoryEyebrow num="07" label="Design & Drawing" />
          <ul className="space-y-2 text-lg italic" style={serif}>
            {design.services.map((s) => (
              <li key={s.slug}>{s.title}</li>
            ))}
            <li>Custom Wallpaper Styling</li>
          </ul>
        </motion.div>
      </div>

      {/* CTA */}
      <div
        className="max-w-7xl mx-auto mt-24 pt-20 flex flex-col md:flex-row items-baseline justify-between"
        style={{ borderTop: `1px solid ${PALETTE.ink}1a` }}
      >
        <div className="max-w-xl mb-12 md:mb-0">
          <h2
            className="text-4xl md:text-5xl leading-none mb-6"
            style={{ ...serif, color: PALETTE.deep }}
          >
            Start your transformation.
          </h2>
          <p className="text-lg opacity-80">
            Serving Tinsukia, Dibrugarh, Pasighat and 9 more districts within 200 km.
          </p>
        </div>
        <Link to="/contact" className="inline-flex items-center group">
          <span
            className="px-10 py-5 text-lg font-medium tracking-wide flex items-center transition-transform group-hover:-translate-y-1"
            style={{ background: PALETTE.deep, color: PALETTE.bg }}
          >
            Book a Consultation
            <ArrowRight className="ml-4 w-5 h-5 transition-transform group-hover:translate-x-2" />
          </span>
        </Link>
      </div>
    </div>
  )
}
