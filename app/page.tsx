import Link from 'next/link';
import MonumentCard from '@/components/MonumentCard';
import { getFeaturedMonuments, states } from '@/data/monuments';

export default function Home() {
  const featuredMonuments = getFeaturedMonuments();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-primary selection:text-white font-sans">
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Abstract Motion Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[160px] animate-pulse pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-secondary/20 rounded-full blur-[160px] animate-pulse delay-1000 pointer-events-none" />
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center space-y-12">
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-4 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.4em]">Bharat Vista Digital Initiative</span>
            </div>

            <h1 className="text-7xl md:text-[12vw] font-black text-white leading-[0.8] tracking-tighter font-display uppercase italic">
              Heritage <br />
              <span className="bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent">Reimagined</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/40 max-w-3xl mx-auto font-medium leading-relaxed">
              Step into the future of history. High-fidelity 3D archives and immersive VR narratives of India's eternal architectural masterpieces.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Link href="/monument/taj-mahal" className="group px-12 py-6 bg-white text-slate-950 rounded-full text-sm font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl hover:scale-105 active:scale-95">
              Start Exploration
            </Link>
            <Link href="/state/telangana" className="group px-12 py-6 bg-white/5 border border-white/10 text-white rounded-full text-sm font-black uppercase tracking-widest hover:bg-white/10 transition-all duration-500 backdrop-blur-md">
              Explore Regions
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
          <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Dive Records</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* 2. LIVE ARCHIVE COUNTER */}
      <section className="relative z-20 container mx-auto px-6 -mt-32">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 bg-white p-12 md:p-16 rounded-[80px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100">
          {[
            { label: '3D Monuments', value: '50+', icon: '🏛️' },
            { label: 'State Archives', value: '28+', icon: '🇮🇳' },
            { label: 'VR Narrative', value: '100%', icon: '🥽' },
            { label: 'Data Fidelity', value: '4K', icon: '💎' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-3 group">
              <span className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-500 block">{stat.icon}</span>
              <span className="text-5xl font-black text-slate-900 tracking-tighter">{stat.value}</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED EXHIBITION */}
      <section className="py-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-24">
            <div className="space-y-6 max-w-2xl">
              <span className="text-[11px] font-black text-primary uppercase tracking-[0.5em] block">Curated Selection</span>
              <h2 className="text-7xl font-black font-display tracking-tighter italic">Featured Wonders</h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">Highly detailed digital twins of India's most iconic architectural achievements, preserved forever.</p>
            </div>
            <Link href="/" className="px-10 py-5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-xl shadow-slate-900/10">
              Browse Entire Archive
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredMonuments.map((monument) => (
              <div key={monument.id} className="group hover:-translate-y-4 transition-all duration-700">
                <MonumentCard monument={monument} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. REGIONAL EXPLORER */}
      <section className="py-40 bg-slate-950 relative overflow-hidden">
        {/* Background Visuals */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-7xl md:text-8xl font-black text-white font-display tracking-tighter">Explore by State</h2>
            <p className="text-xl text-white/40 max-w-2xl mx-auto font-medium leading-relaxed">Navigate the diverse cultural landscapes of India through our regional state archives.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {states.map((state) => (
              <Link
                key={state.slug}
                href={`/state/${state.slug}`}
                className="group relative h-64 bg-white/5 border border-white/10 rounded-[40px] flex flex-col items-center justify-center p-8 transition-all duration-500 hover:bg-white/10 hover:-translate-y-4 hover:border-primary/50 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
                <span className="text-4xl font-black text-white mb-3 tracking-tighter group-hover:text-primary transition-colors">{state.monumentCount}</span>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] group-hover:text-white transition-colors">{state.name.split(' ')[0]}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TECH ECOSYSTEM */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { title: 'Spatial Engine', desc: 'Photogrammetry data optimized for real-time web interaction.', color: 'bg-primary' },
              { title: 'Neural Audio', desc: 'AI-driven multilingual narration for every heritage site.', color: 'bg-secondary' },
              { title: 'WebXR Flow', desc: 'Native VR and AR support for truly immersive education.', color: 'bg-accent' }
            ].map((item, i) => (
              <div key={i} className="group p-10 bg-slate-50/50 rounded-[50px] border border-slate-100 space-y-6 hover:bg-white transition-all duration-700 hover:shadow-2xl hover:shadow-slate-200/50">
                <div className={`w-16 h-16 ${item.color} rounded-[24px] shadow-lg shadow-black/5 flex items-center justify-center text-white`}>
                  <span className="font-black text-lg">0{i + 1}</span>
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">{item.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
