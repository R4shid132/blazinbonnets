import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-heading font-bold mb-4">
              <span className="text-primary">BLAZIN</span>{' '}
              <span className="text-gradient-gold">BONNETS</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium hand-picked vehicles inspected for quality and performance. Serving Walsall, West Midlands and beyond.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-foreground">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: '/cars', label: 'Browse Cars' },
                { to: '/sell-your-car', label: 'Sell Your Car' },
                { to: '/about', label: 'About Us' },
                { to: '/reviews', label: 'Customer Reviews' },
                { to: '/contact', label: 'Contact Us' },
              ].map(link => (
                <Link key={link.to} to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-foreground">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="tel:+441234567890" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" /> 01234 567 890
              </a>
              <a href="mailto:info@blazinbonnets.co.uk" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" /> info@blazinbonnets.co.uk
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>Walsall, West Midlands</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-foreground">Opening Hours</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Mon - Fri: 9:00 - 18:00</p>
              <p>Saturday: 10:00 - 16:00</p>
              <p>Sunday: By appointment</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Blazin Bonnets LTD. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Used car dealer in Walsall, West Midlands
          </p>
        </div>
      </div>
    </footer>
  );
}
