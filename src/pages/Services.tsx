import { Card, CardContent } from "@/components/ui/card";
import { Cog, Wrench, Settings, Target, FileCheck, Handshake, CheckCircle2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CardsStackDemo from "@/components/blocks/cards-stack-demo";
import QuoteModalWithArrow from "@/components/QuoteModalWithArrow";

const Services = () => {
  const coreServices = [
    {
      icon: Cog,
      title: "Heavy & Aerospace-Grade Machining",
      tagline: "Transform the most challenging designs into flawless, intricate components.",
      description: "Transform the most challenging designs into flawless, intricate components. Our state-of-the-art machine shop handles specialized alloys with superior finishes and dimensional accuracy.",
      features: [
        "CNC & Conventional Turning",
        "Vertical & Horizontal Boring",
        "Precision Grinding",
        "Advanced Milling Operations",
      ],
    },
    {
      icon: Wrench,
      title: "Advanced Structural Fabrication",
      tagline: "Build robust, mission-critical structures and equipment.",
      description: "Build robust, mission-critical structures and equipment from initial design to final assembly. Our certified welders work in adherence with the most stringent international codes.",
      features: [
        "Heavy Equipment Frames",
        "Custom Skids & Assemblies",
        "Storage Tanks",
        "Complex Weldments",
      ],
    },
    {
      icon: Settings,
      title: "Integrated Tool Room Solutions",
      tagline: "Precision manufacturing begins with perfect tooling.",
      description: "Precision manufacturing begins with perfect tooling. Our dedicated tool room develops high-performance Jigs, Fixtures, Press Tools, and Dies for unmatched repeatability.",
      features: [
        "Jigs & Fixtures Design",
        "Integration Jigs",
        "Strain Ageing Fixtures",
        "Custom Press Tools",
      ],
    },
  ];

  const gokulBlueprint = [
    {
      number: "01",
      title: "Listen",
      description: "We take time to understand your unique requirements, constraints, and success criteria. We engage stakeholders early to capture technical specs and project goals so the solution aligns with your outcomes.",
      icon: Target,
    },
    {
      number: "02",
      title: "Design",
      description: "Our engineers craft optimal solutions tailored to your needs. We validate manufacturability, select appropriate materials and processes, and produce detailed drawings ready for production.",
      icon: FileCheck,
    },
    {
      number: "03",
      title: "Manufacture",
      description: "Precision execution using certified operators and state-of-the-art equipment. Robust process controls, in-process inspection, and traceability ensure components meet specified tolerances and quality.",
      icon: Cog,
    },
    {
      number: "04",
      title: "Deliver",
      description: "On-time delivery supported by comprehensive quality documentation. Shipments include QA reports, certifications and traceability to ensure smooth integration at your end.",
      icon: CheckCircle2,
    },
    {
      number: "05",
      title: "Support",
      description: "Post-delivery assistance and ongoing partnership to keep systems performing. We provide technical support, maintenance guidance, and continuous improvement collaboration.",
      icon: Handshake,
    },
  ];

  const whyChooseUs = [
    {
      title: "Single Point of Accountability",
      description: "We provide end-to-end accountability for the entire project lifecycle, ensuring a flawless journey from concept to deployment.",
    },
    {
      title: "Versatility at Scale",
      description: "Our operational agility allows us to masterfully handle both bespoke, one-off projects and sustained, high-volume production with the same precision.",
    },
    {
      title: "ISO 9001:2015 Certified",
      description: "We uphold the highest international standards of quality and performance in every project we undertake.",
    },
    {
      title: "Advanced Technology Arsenal",
      description: "World-class machinery from Germany, Russia, and India, operated by highly skilled certified technicians.",
    },
  ];

  return (
    <div>
      {/* Page Header (match About header UI) */}
  <section className="bg-gradient-primary py-16 md:py-24 rounded-b-[3rem] overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h1 className="w-full text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-3 leading-tight">
            A Spectrum of Capability
          </h1>

          <p className="w-full text-sm sm:text-base md:text-lg text-primary-foreground/85 max-w-full mx-auto leading-relaxed">
            Mastery in Three Dimensions of Engineering
          </p>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-3 sm:px-4 lg:px-4">
          <div className="mb-8 sm:mb-10 lg:mb-12 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-3">Our Core Services</h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-2">Precision engineering excellence across three dimensions of capability</p>
          </div>
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {coreServices.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              // select service demo video from public/videos
              const videoSrc = index === 0 ? "/videos/service1.mp4" : index === 1 ? "/videos/service2.mp4" : "/videos/service3.mp4";

              const contentColumn = (
                <div className={`lg:col-span-1 flex flex-col justify-center h-full px-2 sm:px-4 lg:px-0 py-6 sm:py-8 lg:py-0 ${isEven ? 'lg:pr-8' : 'lg:pl-8'} ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex h-12 sm:h-16 w-12 sm:w-16 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex-shrink-0 shadow-md">
                      <Icon className="h-6 sm:h-8 w-6 sm:w-8 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Badge variant="secondary" className="mb-1 sm:mb-2 text-xs font-semibold">Core Service {index + 1}</Badge>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-0.5 sm:mb-1 leading-tight">{service.title}</h3>
                      <p className="text-xs sm:text-sm text-primary/80 font-medium line-clamp-2">{service.tagline}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm mb-4 sm:mb-6">
                    {service.description}
                  </p>

                  <div className="mt-2 sm:mt-4">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground mb-3 sm:mb-4 uppercase tracking-wide">Key Capabilities:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                          <CheckCircle2 className="h-4 sm:h-5 w-4 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-muted-foreground font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 sm:mt-6">
                      <QuoteModalWithArrow />
                    </div>
                  </div>
                </div>
              );

              const videoColumn = (
                <div className={`lg:col-span-1 flex items-stretch w-full h-48 sm:h-56 md:h-64 lg:h-[380px] ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="w-full h-full overflow-hidden rounded-xl sm:rounded-2xl shadow-lg border border-border/50 hover:shadow-xl transition-shadow duration-300">
                    <video
                      src={videoSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover block"
                      aria-label={`${service.title} demonstration video`}
                    />
                  </div>
                </div>
              );

              return (
                <div key={index} className="max-w-6xl mx-auto w-full px-2 sm:px-0">
                  <div className="w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-stretch lg:min-h-[380px] animate-fade-in">
                      {/* Mobile: Always stack content first, then video. Desktop: Alternate */}
                      {contentColumn}
                      {videoColumn}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Gokul Blueprint - cards stack demo (now using real blueprint data) */}
      <section className="py-20 bg-muted/50">
        <CardsStackDemo phases={gokulBlueprint} offsetTop={88} />
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Why Choose Sri Gokul Engineering Works?
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {whyChooseUs.map((item, index) => {
                const icons = [CheckCircle2, Cog, ShieldCheck, Settings]
                const Icon = icons[index] ?? CheckCircle2

                return (
                  <Card
                    key={index}
                    className="border-border shadow-medium hover:shadow-large transition-transform transform-gpu hover:-translate-y-1 overflow-hidden"
                  >
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary grid place-items-center">
                            <Icon className="h-6 w-6" />
                          </div>
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-primary rounded-t-[2rem] overflow-hidden">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Engineer Your Success?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-xl mx-auto mb-6">
            Let's discuss how Sri Gokul Engineering Works can bring precision, reliability, and excellence to your next project.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary-foreground text-primary px-8 py-3 text-sm font-medium shadow-large hover:bg-primary-foreground/90 transition-colors"
          >
            Contact Us Today
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;
