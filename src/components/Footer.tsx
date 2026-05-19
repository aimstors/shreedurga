import { Facebook, MessageCircle } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { serviceAreas } from '@/lib/service-areas'

const Footer = () => {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">Shree Durga Interior</div>
            <p className="footer-tagline">Premium interior design studio transforming spaces across Upper Assam & Arunachal Pradesh since 1999.</p>
            <div className="footer-socials">
              <a href="https://facebook.com/shreedurgainterior" className="fsoc" target="_blank" rel="noopener noreferrer">
                <Facebook size={15} />
              </a>
              <a href="https://wa.me/+919435754461" className="fsoc" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={15} />
              </a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Studio</div>
            <ul className="footer-links">
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/projects">Recent Projects</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              <li><Link to="/services" hash="interiors">Full Home & Commercial</Link></li>
              <li><Link to="/services" hash="interiors">Modular Kitchen & Wardrobe</Link></li>
              <li><Link to="/services" hash="ceiling-walls">False / PVC Ceiling</Link></li>
              <li><Link to="/services" hash="windows-glass">uPVC / Aluminium Window</Link></li>
              <li><Link to="/services" hash="metal-exterior">ACP & Steel Railing</Link></li>
              <li><Link to="/services" hash="flooring">Wooden & 3D Epoxy Flooring</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Service Areas</div>
            <ul className="footer-links" style={{ columnCount: 2, columnGap: 16 }}>
              {serviceAreas.map((d) => (
                <li key={d.name} style={{ breakInside: 'avoid' }}>{d.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} Shree Durga Interior. All rights reserved.</p>
          <p className="footer-made">Made with ♥ in Assam</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
