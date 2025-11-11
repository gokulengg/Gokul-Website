import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExpandableCard } from "@/components/ui/expandable-card";
import { ProjectCard } from "@/components/ui/project-card";
import { Building2, Cog, Users, ArrowRight, Zap, Factory, Cpu, Package, FileText, Quote, Check, Flame, Wrench, BarChart3, ChevronLeft, ChevronRight, Handshake, TrendingUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "@/assets/hero-engineering.jpg";
// Background videos from public folder
const heroVideo = "/videos/heropage.mp4";
// use public images for featured projects
import HeroStatItem from "@/components/HeroStatItem";
import ServicesCard from "@/components/ServicesCard";

// Store hero image in a variable for CSS

const Home = () => {
  const services = [
    {
      icon: Building2,
      title: "Heavy & Aerospace-Grade Machining",
      description: "Transform challenging designs into flawless components with CNC & Conventional Turning, Vertical & Horizontal Boring, Precision Grinding, and Milling.",
    },
    {
      icon: Cog,
      title: "Advanced Structural Fabrication",
  description: "Mission-critical structures built to international codes, Heavy Equipment Frames, Custom Skids, Storage Tanks, and Complex Weldments.",
    },
    {
      icon: Users,
      title: "Integrated Tool Room Solutions",
      description: "High-performance Jigs, Fixtures, Press Tools, and Dies ensuring unmatched repeatability and accuracy for bespoke and high-volume production.",
    },
  ];

  const projects = [
    {
      image: "/images/projects/Carbon Phenolic Shells.png",
      title: "Carbon Phenolic Shells",
      category: "Aerospace & Defence",
      description: "Specialized carbon phenolic components for aerospace applications.",
    },
    {
      image: "/images/projects/Rocket Motor Preforms.jpg",
      title: "Rocket Motor Preforms",
      category: "Aerospace & Defence",
      description: "Precision-engineered preforms for rocket motor manufacturing.",
    },
    {
      image: "/images/projects/INTEGRATION JIG.png",
      title: "Missile Integration Jigs",
      category: "Aerospace & Defence",
      description: "Custom precision fixtures for missile assembly and integration.",
    },
  ];

  const clients = [
    { name: "BHEL", logo: "/images/clients/bhel.png" },
    { name: "HAL", logo: "/images/clients/hal.png" },
    { name: "BDL", logo: "/images/clients/bdl.png" },
    { name: "ALSTOM", logo: "/images/clients/ALSTOM.jpeg" },
    { name: "TOSHIBA", logo: "/images/clients/toshiba.png" },
    { name: "SANDVIK", logo: "/images/clients/sandvik.png" },
    { name: "ASL DRDO", logo: "/images/clients/asldrdo.jpeg" },
    { name: "Bharat Electronics", logo: "/images/clients/bharat electronics.jpeg" },
    { name: "BrahMos", logo: "/images/clients/bhramos.png" },
    { name: "ISRO", logo: "/images/clients/isro.png" },
    { name: "ITW Signode", logo: "/images/clients/ITW SIGNODE.jpg" },
    { name: "Mega", logo: "/images/clients/Mega.png" },
    { name: "NSTL DRDO", logo: "/images/clients/ntsldrdo.jpeg" },
    { name: "Ordnance Factory", logo: "/images/clients/ORDINANCE FACTORY.png" },
    { name: "Puzzolana", logo: "/images/clients/PUZZLONA.png" },
    { name: "RCI DRDO", logo: "/images/clients/rcidrdo.jpeg" },
    { name: "DRDO", logo: "/images/clients/drdo.png" },
  ];

  const testimonials = [
    {
      quote: "Sri Gokul Engineering's commitment to precision and on-time delivery has been instrumental in the success of our most critical national defence projects. Their technical expertise is world-class.",
      author: "Senior Program Director",
      organization: "Defence Research & Development Organisation (DRDO)",
    },
    {
      quote: "For large, complex components requiring heavy machining, Sri Gokul is our go-to partner. Their reliability and the quality of their work are unmatched in the industry.",
      author: "Head of Manufacturing",
      organization: "Global Power & Energy Conglomerate",
    },
    {
      quote: "Their fabrication team delivered complex assemblies ahead of schedule with zero rework — exceptional project management and technical skill.",
      author: "Project Manager",
      organization: "Major Chemical Plant Contractor",
    },
    {
      quote: "We partnered with Sri Gokul for a high-precision tooling program; the results exceeded expectations in durability and dimensional accuracy.",
      author: "Lead Engineer",
      organization: "Aerospace Systems Integrator",
    },
  ];

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isMd, setIsMd] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);
  const marqueeContainerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const check = () => setIsMd(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const visibleCount = isMd ? 2 : 1;
  const maxStartIndex = Math.max(0, testimonials.length - visibleCount);

  // Clamp testimonialIndex when visibleCount (or window size) changes
  useEffect(() => {
    if (testimonialIndex > maxStartIndex) {
      setTestimonialIndex(maxStartIndex);
    }
  }, [visibleCount, maxStartIndex]);

  const goPrev = () => {
    setTestimonialIndex((i) => Math.max(0, i - 1));
  };

  const goNext = () => {
    setTestimonialIndex((i) => Math.min(maxStartIndex, i + 1));
  };

  // Smooth auto-scroll marquee effect using requestAnimationFrame
  useEffect(() => {
    const animate = () => {
      if (marqueeContainerRef.current && !isHovering) {
        const container = marqueeContainerRef.current;
        container.scrollLeft += 1.2; // Increased speed: 1.2px per frame
        
        // Reset to beginning when reaching 1/3 of total width (seamless loop)
        if (container.scrollLeft >= container.scrollWidth / 3) {
          container.scrollLeft = 0;
        }
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovering]);

  const handleMarqueeScroll = (direction: 'left' | 'right') => {
    if (marqueeContainerRef.current) {
      const scrollAmount = 400;
      const currentScroll = marqueeContainerRef.current.scrollLeft;
      const targetScroll = direction === 'right' 
        ? currentScroll + scrollAmount 
        : currentScroll - scrollAmount;
      
      marqueeContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-between overflow-hidden">
        {/* Background video (covers entire hero) */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={heroVideo}
          poster={heroImage}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-gradient-hero" />

        {/* Center Content */}
        <div className="container relative z-10 mx-auto px-4 text-center flex-1 flex items-center justify-center">
          <div className="w-full max-w-4xl">
            <div className="mb-6 sm:mb-8 inline-block px-4 py-2 rounded-full border-2 border-white/30 bg-[#CC5500]/80 backdrop-blur-md shadow-2xl shadow-[#FF6F00]/40 relative overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />
              <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
              <span className="relative text-white text-xs sm:text-sm md:text-base font-bold">Perfection through Precision • Since 1987</span>
            </div>
            <h1 className="mb-6 sm:mb-8 font-bold text-primary dark:text-[#FF6F00] leading-tight sm:leading-snug md:leading-snug lg:leading-tight text-[clamp(2rem,4.5vw,3.5rem)] drop-shadow-lg">
              Engineering the Future
            </h1>
            <p className="mb-8 sm:mb-10 md:mb-12 text-primary/90 dark:text-[#FF6F00]/90 max-w-3xl mx-auto leading-relaxed text-[clamp(0.95rem,2.2vw,1.125rem)] font-semibold drop-shadow-md">
              Mission-critical engineering • ISO 9001:2015
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center pt-2">
              <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 text-sm sm:text-base md:text-base lg:text-lg">
                <Link to="/services">Our Capabilities</Link>
              </Button>
              <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 text-sm sm:text-base md:text-base lg:text-lg">
                <Link to="/contact">Start Your Project</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Row - Bottom of Hero */}
        <div className="relative z-10 w-full pb-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 items-end">
              <HeroStatItem value="35+" label="Years" />
              <HeroStatItem value="500+" label="Projects" />
              <HeroStatItem value="50+" label="Clients" />
              <HeroStatItem value="100%" label="Quality" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">Our Clients</h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              A legacy of trust and partnership with industry leaders
            </p>
          </div>
          <div 
            className="relative px-8 sm:px-10 md:px-12"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Left Control Button - Always Visible */}
            <button
              onClick={() => handleMarqueeScroll('left')}
              aria-label="Scroll left"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 flex items-center justify-center rounded-full bg-background border-2 border-border shadow-lg hover:bg-primary hover:border-primary hover:text-primary-foreground hover:scale-110 active:scale-95 transition-all duration-200"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </button>

            {/* Right Control Button - Always Visible */}
            <button
              onClick={() => handleMarqueeScroll('right')}
              aria-label="Scroll right"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 flex items-center justify-center rounded-full bg-background border-2 border-border shadow-lg hover:bg-primary hover:border-primary hover:text-primary-foreground hover:scale-110 active:scale-95 transition-all duration-200"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </button>

            {/* Scrollable Marquee Container */}
            <div 
              ref={marqueeContainerRef}
              className="overflow-x-auto scrollbar-hide scroll-smooth"
            >
              <div className="flex gap-3 sm:gap-4 items-center py-3 min-w-max">
                {clients.concat(clients).concat(clients).map((client, index) => (
                  <div
                    key={index}
                    className="shrink-0 bg-white rounded-lg shadow-sm w-32 sm:w-40 md:w-48 h-20 sm:h-24 md:h-28 overflow-hidden p-2 sm:p-3 md:p-4"
                  >
                    <img src={client.logo} alt={client.name} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 md:py-28 bg-background px-4 md:px-8">
        <div className="container mx-auto px-0">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left Column: Text Content */}
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Engineering the Future,
                <br />
                <span className="text-primary">Forging a Legacy</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
                For over three decades, Sri Gokul Engineering Works has forged the critical components at the heart of progress in the world's most demanding industries. We set the standard for precision and reliability.
              </p>
              <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
                Our strength lies in the seamless fusion of human expertise and technological power. At our core is an elite team of engineers, master machinists, and certified technicians the human engine driving our technological capabilities. This combination allows us to deliver absolute confidence and certainty with every project.
              </p>
              <div className="flex">
                <Button asChild size="lg">
                  <Link to="/about">
                    Explore More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column: Key Points/Cards */}
            <div className="space-y-6">
              <Card className="border border-[hsl(var(--card-border))] dark:border-[rgba(255,255,255,0.14)] bg-[hsl(var(--card))] backdrop-blur-sm rounded-lg">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">ISO 9001:2015 Certified</h3>
                    <p className="text-sm text-muted-foreground">Upholding the highest international standards of quality and performance.</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-[hsl(var(--card-border))] dark:border-[rgba(255,255,255,0.14)] bg-[hsl(var(--card))] backdrop-blur-sm rounded-lg">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">Mission-Critical Precision</h3>
                    <p className="text-sm text-muted-foreground">Engineering solutions for industries where failure is not an option.</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-[hsl(var(--card-border))] dark:border-[rgba(255,255,255,0.14)] bg-[hsl(var(--card))] backdrop-blur-sm rounded-lg">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">Elite Team</h3>
                    <p className="text-sm text-muted-foreground">Master engineers, machinists, and certified technicians driving excellence.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <ProcessSection />

      {/* Services Overview */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">Mastery in Three Dimensions of Engineering</h2>
            <p className="text-base sm:text-lg md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive and integrated suite of services delivering world-class results across three core disciplines
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <ServicesCard
                  key={index}
                  index={index + 1}
                  icon={Icon}
                  title={service.title}
                  description={service.description}
                />
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link to="/services">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Project Showcase */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">Engineering in Action</h2>
            <p className="text-base sm:text-lg md:text-lg text-muted-foreground max-w-2xl mx-auto">
              A portfolio of precision and performance across critical sectors
            </p>
          </div>

          <div className="grid gap-6 sm:gap-7 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                image={project.image}
                category={project.category}
                description={project.description}
              />
            ))}
            
            {/* View All Projects Card */}
            <Link to="/projects" className="group relative flex flex-col rounded-2xl border-2 border-border bg-gradient-to-br from-muted/50 to-background shadow-lg overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300 h-full">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_3s_ease-in-out_infinite]" />
              </div>
              
              {/* Content */}
              <div className="relative flex-1 flex flex-col p-6">
                {/* Icon and Text - centered */}
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                  {/* Icon */}
                  <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 group-hover:bg-primary/15 group-hover:scale-105 transition-all duration-300">
                    <Package className="h-10 w-10 text-primary" />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Precision in Action
                    </h3>
                  </div>
                </div>

                {/* CTA Button - at bottom */}
                <div className="pt-4">
                  <Button size="lg" className="w-full">
                    View All Projects <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Facilities Glimpse Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Facilities</h2>
            <p className="text-base sm:text-lg md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive infrastructure for precision engineering
            </p>
          </div>

          {/* Stats removed — showing facility highlights directly below */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            <Card className="border-border shadow-medium hover:shadow-large transition-all duration-200 overflow-hidden">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 flex-shrink-0">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">Heavy Machining</h3>
                    <p className="text-sm text-primary/80 font-medium">Precision at Scale</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">5-axis CNC centers, boring machines & heavy-duty lathes capable of ±0.01mm tolerances.</p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-medium hover:shadow-large transition-all duration-200 overflow-hidden">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 flex-shrink-0">
                    <Flame className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">Fabrication</h3>
                    <p className="text-sm text-primary/80 font-medium">Complex Assemblies</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">TIG, MIG & Arc welding with pressure vessel & structural steel fabrication expertise.</p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-medium hover:shadow-large transition-all duration-200 overflow-hidden">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 flex-shrink-0">
                    <Wrench className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">Tool Room</h3>
                    <p className="text-sm text-primary/80 font-medium">Precision Tooling</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">Custom jigs, fixtures, dies & specialized tools for production repeatability.</p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-medium hover:shadow-large transition-all duration-200 overflow-hidden">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 flex-shrink-0">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">QC Lab</h3>
                    <p className="text-sm text-primary/80 font-medium">Certified Excellence</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">ISO 9001:2015 certified with CMM, NDT & material analysis capabilities.</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/facilities">
                Explore Our Facilities <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Strategic Partnerships Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-muted/40 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">Strategic Partnerships & Joint Ventures</h2>
            </div>

            {/* Partnership Categories Grid - Bento Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 max-w-7xl mx-auto auto-rows-fr">
              {[
                { icon: Handshake, title: "Joint Ventures", description: "Collaborate on precision manufacturing initiatives with shared expertise and resources", span: "lg:col-span-2" },
                { icon: Factory, title: "Production Partnerships", description: "Long-term contract manufacturing for specialized aerospace and defense components", span: "lg:col-span-2" },
                { icon: Cpu, title: "Technology Collaboration", description: "Co-development of advanced manufacturing solutions and process innovations", span: "lg:col-span-2" },
                { icon: TrendingUp, title: "Capacity Expansion", description: "Strategic partnerships to scale production capabilities and market reach", span: "lg:col-span-3" },
              ].map((partnership, idx) => {
                const IconComponent = partnership.icon;
                return (
                  <Card
                    key={idx}
                    className={`group relative overflow-hidden border border-[hsl(var(--card-border))] bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-primary/40 hover:-translate-y-1 flex flex-col ${partnership.span}`}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardContent className="pt-6 pb-6 flex flex-col items-center text-center h-full justify-between relative z-10">
                      <div className="flex flex-col items-center w-full">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">{partnership.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{partnership.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* View in Detail Card - Larger bento box */}
              <Link to="/projects" className="group relative flex flex-col rounded-xl border-2 border-border bg-gradient-to-br from-muted/50 to-background shadow-lg overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300 h-full lg:col-span-3">
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_3s_ease-in-out_infinite]" />
                </div>
                
                {/* Content */}
                <div className="relative flex-1 flex flex-col p-6 justify-center">
                  {/* Text - centered */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        View Details
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Explore all partnership opportunities
                      </p>
                      <Button size="default" className="w-full">
                        Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">Industries We Empower</h2>
            <p className="text-base md:text-base text-muted-foreground max-w-2xl mx-auto">Driving progress across critical sectors</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            <ExpandableCard
              title="Military & Defence"
              src="/images/industries/defence and military.jpeg"
              imageFit="cover"
              description="Mission-critical components for defense applications"
              classNameExpanded="[&_h4]:text-black dark:[&_h4]:text-white [&_h4]:font-semibold"
              cardClassName="min-h-[220px]"
              animate
            >
              <h4 className="font-semibold mb-2">What We Deliver</h4>
              <ul className="list-disc ml-5 mb-3 text-sm space-y-1">
                <li>Missile system integration jigs</li>
                <li>Missile Handling Trolleys</li>
                <li>Navy torpedo testing tanks</li>
                <li>Armored vehicle components</li>
                <li>Precision parts for radar and communication systems</li>
                <li><em>And many more components and solutions specially tailored</em></li>
              </ul>
              <p className="text-xs text-muted-foreground">Trusted by leading defense organizations like DRDO, DRDL, ASL, RCI, BDL, HAL, BEL, NSTL, and Ordinance Factory for zero-defect manufacturing and mission assurance.</p>
            </ExpandableCard>

            <ExpandableCard
              title="Aerospace"
              src="/images/industries/aerospace.jpeg"
              imageFit="cover"
              description="Precision parts for aviation and air-systems"
              classNameExpanded="[&_h4]:text-black dark:[&_h4]:text-white [&_h4]:font-semibold"
              cardClassName="min-h-[220px]"
              animate
            >
              <h4 className="font-semibold mb-2">What We Deliver</h4>
              <ul className="list-disc ml-5 mb-3 text-sm space-y-1">
                <li>High-precision integration jigs and fixtures</li>
                <li>Critical airframe and engine components</li>
                <li>Custom tooling and ground support equipment (GSE)</li>
                <li>Spool Holders for specialized applications</li>
                <li><em>And many more components and solutions specially tailored</em></li>
              </ul>
              <p className="text-xs text-muted-foreground">Delivering certified components for demanding applications, supporting partners like HAL in advancing India's aerospace capabilities.</p>
            </ExpandableCard>

            <ExpandableCard
              title="Space"
              src="/images/industries/space.jpeg"
              imageFit="cover"
              description="High-precision manufacturing for space exploration"
              classNameExpanded="[&_h4]:text-black dark:[&_h4]:text-white [&_h4]:font-semibold"
              cardClassName="min-h-[220px]"
              animate
            >
              <h4 className="font-semibold mb-2">What We Deliver</h4>
              <ul className="list-disc ml-5 mb-3 text-sm space-y-1">
                <li>Rocket Motor preforms</li>
                <li>Carbon phenolic shells and composites</li>
                <li>Launch vehicle integration jigs and fixtures</li>
                <li>Satellite and payload structural components</li>
                <li><em>And many more components and solutions specially tailored</em></li>
              </ul>
              <p className="text-xs text-muted-foreground">Proudly contributing to India's space program, supplying critical components for launch systems in partnership with organizations like DRDO and its associated labs.</p>
            </ExpandableCard>

            <ExpandableCard
              title="Energy"
              src="/images/industries/energy.jpeg"
              imageFit="cover"
              description="Power generation and transmission components"
              classNameExpanded="[&_h4]:text-black dark:[&_h4]:text-white [&_h4]:font-semibold"
              cardClassName="min-h-[220px]"
              animate
            >
              <h4 className="font-semibold mb-2">What We Deliver</h4>
              <ul className="list-disc ml-5 mb-3 text-sm space-y-1">
                <li>Spares and precision components for turbines and pumps</li>
                <li>Heavy-duty components for power transmission systems</li>
                <li>Custom fabrication for power plant equipment and fixtures</li>
                <li><em>And many more components and solutions specially tailored</em></li>
              </ul>
              <p className="text-xs text-muted-foreground">Ensuring reliability and efficiency for the nation's power grid, trusted by industry leaders like BHEL and Toshiba.</p>
            </ExpandableCard>

            <ExpandableCard
              title="Railways"
              src="/images/industries/railways.jpeg"
              imageFit="cover"
              description="Heavy-duty components for rail infrastructure"
              classNameExpanded="[&_h4]:text-black dark:[&_h4]:text-white [&_h4]:font-semibold"
              cardClassName="min-h-[220px]"
              animate
            >
              <h4 className="font-semibold mb-2">What We Deliver</h4>
              <ul className="list-disc ml-5 mb-3 text-sm space-y-1">
                <li>Railway wheels and axle components</li>
                <li>Custom jigs and fixtures for rolling stock manufacturing</li>
                <li>Heavy-duty components for signaling and track systems</li>
                <li><em>And many more components and solutions specially tailored</em></li>
              </ul>
              <p className="text-xs text-muted-foreground">Keeping the wheels of progress moving with durable, high-endurance parts for major rail operators and manufacturers like Alstom, Omega Rail, and BHEL.</p>
            </ExpandableCard>

            <ExpandableCard
              title="Mining"
              src="/images/industries/mining.jpeg"
              imageFit="cover"
              description="Robust machinery parts for mineral extraction"
              classNameExpanded="[&_h4]:text-black dark:[&_h4]:text-white [&_h4]:font-semibold"
              cardClassName="min-h-[220px]"
              animate
            >
              <h4 className="font-semibold mb-2">What We Deliver</h4>
              <ul className="list-disc ml-5 mb-3 text-sm space-y-1">
                <li>Crusher loaders and heavy components</li>
                <li>Wear-resistant spares for extraction and processing machinery</li>
                <li>Heavy chemical tanks for mineral processing</li>
                <li><em>And many more components and solutions specially tailored</em></li>
              </ul>
              <p className="text-xs text-muted-foreground">Manufacturing rugged components built to withstand the harshest environments, supplying key players like Sandvik and Puzzlona.</p>
            </ExpandableCard>
          </div>
        </div>
      </section>

      {/* Testimonials (What Our Partners Say) - carousel */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="relative text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">What Our Partners Say</h2>
            {/* Controls - placed below heading for mobile friendliness */}
            <div className="mt-4 flex justify-center gap-2">
              <button
                aria-label="Previous testimonial"
                className={`inline-flex items-center justify-center h-9 w-9 rounded-md border border-border shadow-sm transition-all ${testimonialIndex === 0 ? 'bg-muted/20 text-muted-foreground cursor-not-allowed' : 'bg-white/90 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10'}`}
                onClick={goPrev}
                disabled={testimonialIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 text-foreground" />
              </button>
              <button
                aria-label="Next testimonial"
                className={`inline-flex items-center justify-center h-9 w-9 rounded-md border border-border shadow-sm transition-all ${testimonialIndex >= maxStartIndex ? 'bg-muted/20 text-muted-foreground cursor-not-allowed' : 'bg-white/90 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10'}`}
                onClick={goNext}
                disabled={testimonialIndex >= maxStartIndex}
              >
                <ChevronRight className="h-4 w-4 text-foreground" />
              </button>
            </div>
          </div>
          <div
            className="max-w-6xl mx-auto"
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current == null) return;
              const dx = e.changedTouches[0].clientX - touchStartX.current;
              const threshold = 50; // px
              if (dx < -threshold && testimonialIndex < maxStartIndex) {
                setTestimonialIndex((i) => Math.min(maxStartIndex, i + 1));
              } else if (dx > threshold && testimonialIndex > 0) {
                setTestimonialIndex((i) => Math.max(0, i - 1));
              }
              touchStartX.current = null;
            }}
          >
            <div className={`grid ${isMd ? 'md:grid-cols-2' : 'grid-cols-1'} gap-8`}>
              {Array.from({ length: visibleCount }).map((_, offset) => {
                const idx = (testimonialIndex + offset) % testimonials.length;
                const t = testimonials[idx];
                return (
                  <Card key={idx} className="border-border shadow-large">
                    <CardContent className="pt-6">
                      <Quote className="h-8 w-8 text-primary/20 mb-4" />
                      <p className="text-muted-foreground leading-relaxed mb-6 italic">{t.quote}</p>
                      <div className="border-t border-border pt-4">
                        <p className="font-semibold text-foreground">{t.author}</p>
                        <p className="text-sm text-primary">{t.organization}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">Get In Touch</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Ready to start your next project? Contact us today and let's discuss how we can deliver precision and excellence to your engineering needs.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="border-border shadow-medium hover:shadow-lg transition-all duration-200">
                <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <Building2 className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Visit Us</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Sri Gokul Engineering Works<br />
                    Precision Manufacturing Facility<br />
                    India
                  </p>
                  <div className="mt-4">
                    <Button asChild size="sm">
                      <a href={`https://www.google.com/maps?q=17.5027538,78.3063271`} target="_blank" rel="noopener noreferrer">
                        View in Map
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-medium hover:shadow-lg transition-all duration-200">
                <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <FileText className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Email Us</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    For project inquiries and quotes<br />
                    <a href="mailto:gokulengg@yahoo.com" className="text-primary hover:underline">gokulengg@yahoo.com</a>
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border shadow-medium hover:shadow-lg transition-all duration-200">
                <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <Zap className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Call Us</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Dedicated support team<br />
                    <a href="tel:+919347091100" className="text-primary hover:underline">+91 93470 91100</a>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-all duration-200">
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Send Us a Message <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-primary rounded-t-[2rem] overflow-hidden">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4 md:mb-6">
            Let's Build the Future Together
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/90 mb-8 md:mb-10">
            Contact us to discuss how Sri Gokul Engineering Works can bring precision, reliability, and excellence to your next project.
          </p>
          <div className="mt-4">
            <Button asChild size="lg" variant="hero">
              <Link to="/contact">Start Your Project</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Process Section Component with GSAP animations
const ProcessSection = () => {
  const processRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  const processes = [
    {
      step: 1,
      title: "Listen",
      description: "We understand your unique requirements and challenges",
    },
    {
      step: 2,
      title: "Design",
      description: "Our engineers craft optimal solutions tailored to your needs",
    },
    {
      step: 3,
      title: "Manufacture",
      description: "Precision execution with state-of-the-art equipment",
    },
    {
      step: 4,
      title: "Deliver",
      description: "On-time delivery with comprehensive quality documentation",
    },
    {
      step: 5,
      title: "Support",
      description: "Post-delivery assistance and continuous partnership",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate cards with stagger
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: processRef.current,
            start: "top center+=100",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Animate connector lines
    if (linesRef.current.length > 0) {
      linesRef.current.forEach((line, index) => {
        if (line) {
          gsap.fromTo(
            line,
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              duration: 0.8,
              delay: 0.15 + index * 0.1,
              scrollTrigger: {
                trigger: processRef.current,
                start: "top center+=100",
                toggleActions: "play none none none",
              },
              transformOrigin: "left center",
            }
          );
        }
      });
    }
  }, []);

  return (
    <section ref={processRef} className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Process</h2>
          <p className="text-base sm:text-lg md:text-lg text-muted-foreground max-w-3xl mx-auto">
            A structured approach to deliver excellence at every step
          </p>
        </div>

        <div className="relative">
          {/* Connector lines container for desktop */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 pointer-events-none">
            {processes.map((_, index) => (
              index < processes.length - 1 && (
                <div
                  key={`line-${index}`}
                  ref={(el) => {
                    if (el) linesRef.current[index] = el;
                  }}
                  className={`absolute top-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 line-${index}`}
                  data-line-index={index}
                />
              )
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-5">
            {processes.map((process, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="relative flex flex-col items-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300 relative z-10">
                  {process.step}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 text-center">{process.title}</h3>
                <p className="text-sm text-muted-foreground text-center leading-relaxed">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
