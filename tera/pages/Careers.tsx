import React from 'react';
import { PageHero } from '../components/PageHero';
import { Button } from '../components/Button';
import { ArrowUpRight } from 'lucide-react';

export const Careers: React.FC = () => {
  const jobs = [
    { title: 'Head Barista', type: 'Full-time', location: 'Arts District' },
    { title: 'Pastry Assistant', type: 'Part-time', location: 'Arts District' },
    { title: 'Weekend Server', type: 'Part-time', location: 'Arts District' },
  ];

  return (
    <div className="animate-fade-in bg-cream">
      <PageHero 
        title="Join the Tribe" 
        subtitle="Make magic with us." 
        image="https://picsum.photos/1920/1080?random=7"
      />

      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-20">
           <h2 className="font-serif text-4xl md:text-5xl text-terra-900 mb-6">Why work at Terra & Bean?</h2>
           <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            We offer competitive pay, free coffee (obviously), and a supportive environment where creativity is encouraged. 
            Plus, you get to work in the prettiest shop in town.
           </p>
        </div>

        <div className="space-y-6">
          {jobs.map((job, index) => (
            <div key={index} className="group bg-white border border-terra-100 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between hover:shadow-xl hover:border-terra-200 transition-all duration-300">
              <div className="text-left mb-4 md:mb-0">
                <h3 className="font-serif text-3xl text-terra-900 mb-1">{job.title}</h3>
                <p className="text-sm font-bold uppercase tracking-widest text-terra-500 font-sans">{job.type} • {job.location}</p>
              </div>
              <div className="flex items-center gap-4">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-terra-400 font-serif italic text-lg hidden md:block">Apply Now</span>
                  <button className="bg-terra-100 p-3 rounded-full text-terra-900 group-hover:bg-terra-800 group-hover:text-white transition-colors">
                     <ArrowUpRight size={24} />
                  </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};