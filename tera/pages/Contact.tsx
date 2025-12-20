import React from 'react';
import { PageHero } from '../components/PageHero';
import { Button } from '../components/Button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="animate-fade-in bg-terra-50">
      <PageHero 
        title="Say Hello" 
        subtitle="We'd love to hear from you." 
        image="https://picsum.photos/1920/1080?random=6"
        height="small"
      />

      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Contact Info */}
        <div className="space-y-12">
          <div>
            <h2 className="font-serif text-5xl text-terra-900 mb-8">Visit Our Shop</h2>
            <p className="font-sans text-xl text-gray-600 mb-12 font-light">
              Located in the heart of the Arts District, surrounded by galleries and good vibes.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="bg-white p-4 rounded-full shadow-sm text-terra-600 group-hover:bg-terra-600 group-hover:text-white transition-colors">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-2xl text-terra-800 mb-1">Location</h4>
                  <p className="font-sans text-gray-600">123 Bohemian Grove<br/>Arts District, CA 90210</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="bg-white p-4 rounded-full shadow-sm text-terra-600 group-hover:bg-terra-600 group-hover:text-white transition-colors">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-2xl text-terra-800 mb-1">Hours</h4>
                  <p className="font-sans text-gray-600">Mon - Fri: 7am - 7pm</p>
                  <p className="font-sans text-gray-600">Sat - Sun: 8am - 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="bg-white p-4 rounded-full shadow-sm text-terra-600 group-hover:bg-terra-600 group-hover:text-white transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-2xl text-terra-800 mb-1">Email</h4>
                  <p className="font-sans text-gray-600">hello@terraandbean.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-10 md:p-14 rounded-[2rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sage-500/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
          
          <h3 className="font-serif text-3xl text-terra-800 mb-8 relative z-10">Send a Message</h3>
          <form className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-terra-500 mb-2 font-sans">Name</label>
                <input type="text" className="w-full bg-terra-50 border-0 border-b-2 border-terra-100 rounded-none px-0 py-3 focus:outline-none focus:border-terra-400 transition-colors placeholder-terra-300" placeholder="Jane Doe" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-terra-500 mb-2 font-sans">Email</label>
                <input type="email" className="w-full bg-terra-50 border-0 border-b-2 border-terra-100 rounded-none px-0 py-3 focus:outline-none focus:border-terra-400 transition-colors placeholder-terra-300" placeholder="jane@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-terra-500 mb-2 font-sans">Subject</label>
              <select className="w-full bg-terra-50 border-0 border-b-2 border-terra-100 rounded-none px-0 py-3 focus:outline-none focus:border-terra-400 transition-colors text-terra-800">
                <option>General Inquiry</option>
                <option>Events & Catering</option>
                <option>Feedback</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-terra-500 mb-2 font-sans">Message</label>
              <textarea rows={4} className="w-full bg-terra-50 border-0 border-b-2 border-terra-100 rounded-none px-0 py-3 focus:outline-none focus:border-terra-400 transition-colors placeholder-terra-300" placeholder="Tell us something good..."></textarea>
            </div>
            <Button className="w-full mt-4" size="lg">Send Message</Button>
          </form>
        </div>

      </div>
    </div>
  );
};