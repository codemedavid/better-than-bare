import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Shield, FlaskConical, Award } from 'lucide-react';

interface HeroProps {
  onShopAll: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopAll }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-[85vh] lg:min-h-[90vh] overflow-hidden grain-overlay">

      {/* Soft Blush Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FADADD] via-[#FDF5F7] to-white" />

      {/* Subtle Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large soft blob - top right */}
        <div
          className="absolute -top-20 -right-20 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(248,200,216,0.6) 0%, rgba(248,200,216,0) 70%)',
          }}
        />
        {/* Medium blob - bottom left */}
        <div
          className="absolute -bottom-32 -left-32 w-[350px] h-[350px] lg:w-[500px] lg:h-[500px] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(232,164,184,0.5) 0%, rgba(232,164,184,0) 70%)',
          }}
        />
        {/* Small accent blob - center */}
        <div
          className="absolute top-1/2 left-1/3 w-[200px] h-[200px] rounded-full opacity-20 hidden lg:block"
          style={{
            background: 'radial-gradient(circle, rgba(248,200,216,0.4) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Main Content - Centered */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">

          {/* Logo */}
          <div
            className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <img
              src="/btb-logo.png"
              alt="Better Than Bare"
              className="h-20 sm:h-24 md:h-28 w-auto mx-auto object-contain"
            />
          </div>

          {/* Elegant Badge */}
          <div
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-blush-200 shadow-soft mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <FlaskConical className="w-4 h-4 text-rose-500" />
            <span className="text-xs font-medium text-charcoal-700 uppercase tracking-widest">Research-Grade Peptides</span>
          </div>

          {/* Subheadline */}
          <p
            className={`font-sans text-lg sm:text-xl text-charcoal-600 font-light tracking-wide mb-4 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Premium Peptide Solutions
          </p>

          {/* Supporting Line */}
          <p
            className={`text-base sm:text-lg text-charcoal-500 max-w-lg mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Elevate your wellness journey with lab-tested, high-purity peptides you can trust.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Primary CTA */}
            <button
              onClick={onShopAll}
              className="w-full sm:w-auto group px-10 py-4 bg-blush-500 text-white font-semibold rounded-2xl shadow-luxury hover:bg-blush-600 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary CTA */}
            <a
              href="/faq"
              className="w-full sm:w-auto px-10 py-4 bg-transparent text-rose-600 font-semibold rounded-2xl border-2 border-rose-300 hover:bg-rose-50 hover:border-rose-400 transition-all duration-300 text-center"
            >
              Learn More
            </a>
          </div>

          {/* Brand Summary */}
          <p
            className={`text-sm text-charcoal-400 italic font-serif transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            Quality peptides, exceptional results.
          </p>

        </div>
      </div>

      {/* Trust Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-blush-100 py-5 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12">
            {[
              { icon: FlaskConical, label: 'Lab Tested' },
              { icon: Shield, label: 'High Purity' },
              { icon: Sparkles, label: 'Premium Quality' },
              { icon: Award, label: 'Trusted' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-charcoal-600">
                <item.icon className="w-4 h-4 text-rose-400" />
                <span className="text-xs sm:text-sm font-medium tracking-wide">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
