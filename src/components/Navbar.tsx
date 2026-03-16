import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGarageCount } from '@/hooks/useGarage';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/cars', label: 'Browse Cars' },
  { to: '/sell-your-car', label: 'Sell Your Car' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const garageCount = useGarageCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/70 backdrop-blur-xl shadow-luxury border-b border-border/50' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl md:text-2xl font-heading font-bold tracking-tight">
            <span className="text-primary">BLAZIN</span>{' '}
            <span className="text-gradient-gold">BONNETS</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 text-sm font-heading font-medium transition-colors rounded-md hover:text-primary ${
                location.pathname === link.to ? 'text-primary' : 'text-secondary-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+447436624578" className="flex items-center gap-2 text-sm text-accent font-heading font-semibold">
            <Phone className="w-4 h-4" />
            07436 624 578
          </a>
          <a
            href="https://wa.me/447436624578?text=Hi%2C%20I%27m%20interested%20in%20one%20of%20your%20cars."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-primary text-primary-foreground font-heading font-semibold text-sm rounded-md hover:glow-red transition-all"
          >
            WhatsApp Us
          </a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-foreground p-2">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/98 backdrop-blur-md border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3 text-sm font-heading font-medium rounded-md transition-colors ${
                    location.pathname === link.to ? 'text-primary bg-muted' : 'text-secondary-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a href="tel:+447436624578" className="mt-3 flex items-center justify-center gap-2 px-5 py-3 bg-accent text-accent-foreground font-heading font-semibold text-sm rounded-md">
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
