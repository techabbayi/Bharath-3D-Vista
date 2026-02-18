'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import MonumentCard from '@/components/MonumentCard';
import { getFeaturedMonuments, states } from '@/data/monuments';
import Typewriter from '@/components/Typewriter';
import ParticleSystem, { FloatingParticles } from '@/components/ParticleSystem';
import { useScrollAnimation } from '@/hooks/useInView';
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations';
import { FAQSection } from '@/components/FAQ';
import NewsletterSignup from '@/components/NewsletterSignup';
import { Button, Card, Badge } from '@/components/ui';
import { ArrowRight, Play, MapPin, Camera, Headphones, Zap, Award, Globe2, Users2 } from 'lucide-react';

export default function Home() {
  const featuredMonuments = getFeaturedMonuments();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);


  const { ref: featuredRef, inView: featuredInView } = useScrollAnimation();
  const { ref: statesRef, inView: statesInView } = useScrollAnimation();

  const heroWords = [
    "Digital Heritage",
    "Cultural Legacy",
    "Historic Innovation",
    "Timeless Stories"
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-primary selection:text-white font-sans overflow-x-hidden">
      {/* MODERN HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Sophisticated Background */}
        <div className="absolute inset-0">
          {/* Primary gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950" />

          {/* Subtle particle system */}
          <ParticleSystem
            particleCount={60}
            color="#FF6B35"
            speed={0.2}
            interactive={true}
            className="opacity-40"
          />

          {/* Geometric overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10"
            style={{ y, opacity }}
          />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-32 pb-24">
          <motion.div
            className="max-w-6xl mx-auto text-center space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Professional Badge */}
            <motion.div variants={staggerItem} className="flex justify-center pt-2">
              <Badge
                variant="outline"
                className="bg-white/10 border-white/20 text-white px-6 py-2 text-xs backdrop-blur-sm font-medium"
              >
                Bharat Vista Digital Heritage Initiative
              </Badge>
            </motion.div>

            {/* Dynamic Heading */}
            <motion.div variants={staggerItem} className="space-y-3">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tight">
                India's
                <br />
                <Typewriter
                  words={heroWords}
                  speed={120}
                  deleteSpeed={80}
                  delayBetweenWords={2500}
                  className="bg-gradient-to-r from-primary via-orange-400 to-yellow-400 bg-clip-text text-transparent"
                />
              </h1>
            </motion.div>

            {/* Professional Subtitle */}
            <motion.p
              variants={staggerItem}
              className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Experience India's architectural masterpieces through advanced 3D modeling,
              immersive virtual reality, and precision digital preservation technology.
            </motion.p>

            {/* Clean CTA Section */}
            <motion.div
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            >
              <Link href="/monument/taj-mahal">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white shadow-2xl hover:shadow-primary/25 hover:scale-105 transition-all duration-300 px-8 py-3 text-base font-semibold"
                  icon={Play}
                >
                  Start Virtual Tour
                </Button>
              </Link>

              <Link href="/states">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3 text-base font-medium"
                  icon={MapPin}
                >
                  Browse Locations
                </Button>
              </Link>
            </motion.div>

            {/* Professional Metrics */}
            <motion.div
              variants={staggerItem}
              className="grid grid-cols-4 gap-4 pt-6 max-w-3xl mx-auto pb-3"
            >
              {[
                { metric: "50+", label: "Monuments Digitized", icon: Camera },
                { metric: "28", label: "States Covered", icon: MapPin },
                { metric: "1M+", label: "Virtual Visitors", icon: Users2 },
                { metric: "4K", label: "Ultra-HD Quality", icon: Award }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="text-center space-y-1.5"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon className="w-5 h-5 text-primary mx-auto" />
                  <div className="space-y-0.5">
                    <div className="text-lg md:text-xl font-bold text-white">
                      {item.metric}
                    </div>
                    <div className="text-[10px] md:text-xs text-slate-400 font-medium">
                      {item.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              variants={staggerItem}
              className="flex justify-center pb-8"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 12, 0] }}
                transition={{
                  opacity: { delay: 1.5, duration: 0.5 },
                  y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <div className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase">Explore More</span>
                  <motion.div
                    className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2"
                    whileHover={{ borderColor: "rgba(255, 255, 255, 0.8)" }}
                  >
                    <motion.div
                      className="w-1.5 h-1.5 bg-white rounded-full"
                      animate={{ y: [0, 12, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* FEATURED MONUMENTS GALLERY */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-6">
          <motion.div
            ref={featuredRef}
            initial="hidden"
            animate={featuredInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="space-y-16"
          >
            <motion.div variants={staggerItem} className="text-center space-y-6">
              <Badge variant="primary" className="px-6 py-2 text-sm font-medium">
                Curated Collection
              </Badge>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
                Featured
                <span className="block bg-gradient-to-r from-primary via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  Monuments
                </span>
              </h2>

              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Discover India's most iconic architectural treasures through our cutting-edge
                3D preservation technology, capturing every detail with millimeter precision.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredMonuments.map((monument, index) => (
                <motion.div
                  key={monument.id}
                  variants={staggerItem}
                  className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer"
                >
                  <Link href={`/monument/${monument.id}`}>
                    <div className="absolute inset-0">
                      <img
                        src={monument.imageUrl}
                        alt={monument.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                    </div>

                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-2 text-orange-400 font-medium tracking-wider text-sm uppercase">
                          <MapPin size={16} />
                          <span>{monument.city}, {monument.state}</span>
                        </div>

                        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                          {monument.name}
                        </h3>

                        <p className="text-slate-300 line-clamp-2 text-sm leading-relaxed max-w-sm">
                          {monument.description}
                        </p>

                        <div className="pt-4 flex items-center gap-4">
                          <Button
                            className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 group-hover:translate-x-2"
                            icon={ArrowRight}
                            iconPosition="right"
                          >
                            Start Tour
                          </Button>

                          <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm">
                            <Camera size={20} />
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute top-6 right-6">
                      <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-white flex items-center gap-2 px-4 py-2">
                        <Zap size={14} className="text-yellow-400" fill="currentColor" />
                        <span>Featured</span>
                      </Badge>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={staggerItem} className="text-center">
              <Link href="/monuments">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-lg font-medium"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Explore Complete Collection
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* REGIONAL EXPLORER SECTION */}
      <section className="py-24 relative overflow-hidden bg-slate-900">
        {/* Sophisticated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary/5 to-slate-800" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          <FloatingParticles className="opacity-20" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            ref={statesRef}
            initial="hidden"
            animate={statesInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="space-y-16"
          >
            <motion.div variants={staggerItem} className="text-center space-y-6">
              <Badge variant="outline" className="px-6 py-2 text-sm font-medium bg-white/10 border-white/20 text-white">
                Geographic Coverage
              </Badge>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white">
                Explore by
                <span className="block bg-gradient-to-r from-orange-400 via-primary to-yellow-400 bg-clip-text text-transparent">
                  Region
                </span>
              </h2>

              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Journey through India's diverse cultural landscapes and architectural heritage,
                from ancient temples to magnificent palaces across every state and territory.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
            >
              {states.slice(0, 12).map((state, index) => (
                <motion.div key={state.slug} variants={staggerItem}>
                  <Link href={`/state/${state.slug}`}>
                    <Card className="group relative h-40 flex flex-col items-center justify-center text-center hover:scale-105 transition-all duration-300 overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10">
                      {/* Animated background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                      />

                      <div className="relative z-10 space-y-3 p-4">
                        <motion.div
                          className="text-2xl font-black text-white group-hover:text-primary transition-colors"
                          whileHover={{ scale: 1.1 }}
                        >
                          {state.monumentCount}
                        </motion.div>

                        <div className="space-y-1">
                          <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                            {state.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {state.monumentCount} sites
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={staggerItem} className="text-center">
              <Link href="/states">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm px-8 py-4 text-lg"
                  icon={Globe2}
                >
                  View All States & Territories
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TECHNOLOGY SHOWCASE */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-16"
          >
            <motion.div variants={staggerItem} className="text-center space-y-6">
              <Badge variant="secondary" className="px-6 py-2 text-sm font-medium">
                Advanced Technology
              </Badge>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
                Powered by
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-blue-600 bg-clip-text text-transparent">
                  Innovation
                </span>
              </h2>

              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Our digital heritage platform leverages cutting-edge technologies to preserve,
                present, and share India's architectural treasures.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Photogrammetry Engine',
                  desc: 'Advanced computer vision algorithms capture millimeter-precise 3D reconstructions from high-resolution photography.',
                  icon: Camera,
                  color: 'from-blue-500 to-cyan-500',
                  bgColor: 'bg-blue-50'
                },
                {
                  title: 'Immersive Audio System',
                  desc: 'AI-powered multilingual narration with spatial audio and natural language processing capabilities.',
                  icon: Headphones,
                  color: 'from-purple-500 to-pink-500',
                  bgColor: 'bg-purple-50'
                },
                {
                  title: 'Cross-Platform VR/AR',
                  desc: 'WebXR technology enables seamless virtual and augmented reality experiences across all devices.',
                  icon: Zap,
                  color: 'from-green-500 to-emerald-500',
                  bgColor: 'bg-green-50'
                }
              ].map((tech, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Card className={`h-full p-8 hover:shadow-2xl transition-all duration-500 border-0 ${tech.bgColor}`}>
                    <div className="space-y-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <tech.icon className="w-8 h-8 text-white" />
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                          {tech.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                          {tech.desc}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <FAQSection />

      {/* NEWSLETTER SECTION */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <NewsletterSignup variant="default" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
