import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap, Wrench, Flame, Factory, BarChart3, Shield } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";

// Move static data out of the component so it isn't recreated on every render.
const stats = [
  { value: "30,000+", label: "Sq. Ft. Facility" },
  { value: "50+", label: "Advanced Machines" },
  { value: "100+", label: "Skilled Professionals" },
  { value: "24/7", label: "Production Capacity" },
];

const facilities = [
  {
    icon: Zap,
    title: "Heavy Machining Center",
    tagline: "Precision at Scale",
    badge: "Machining",
    description: "State-of-the-art CNC machining centers capable of handling large-scale components with precision tolerances up to ±0.01mm.",
    features: [
      "5-axis CNC machining centers",
      "Vertical & horizontal boring machines",
      "Heavy-duty lathes (up to 5m swing)",
      "Surface & cylindrical grinding machines",
    ],
  },
  {
    icon: Flame,
    title: "Fabrication Workshop",
    tagline: "Complex Assemblies Built Right",
    badge: "Fabrication",
    description: "Comprehensive structural fabrication facility with advanced welding and assembly capabilities for complex assemblies.",
    features: [
      "TIG, MIG, Arc & Submerged Arc welding",
      "Pressure vessel fabrication",
      "Structural steel fabrication",
      "Shot blasting & surface treatment",
    ],
  },
  {
    icon: Wrench,
    title: "Tool Room",
    tagline: "Precision Tooling Excellence",
    badge: "Tooling",
    description: "Precision tool room equipped for custom jigs, fixtures, and specialized tooling design and manufacturing.",
    features: [
      "Custom jig & fixture design",
      "Precision grinding & lapping",
      "Tool & die manufacturing",
      "Inspection gauges & measuring tools",
    ],
  },
  {
    icon: BarChart3,
    title: "Quality Control Lab",
    tagline: "Certified Excellence",
    badge: "Quality Control",
    description: "ISO 9001:2015 certified quality control laboratory with advanced metrology equipment for comprehensive inspection.",
    features: [
      "CMM (Coordinate Measuring Machine)",
      "Spectroscopy for material analysis",
      "NDT testing (UT, MT, PT)",
      "Hardness & tensile testing",
    ],
  },
];

const certifications = [
  { title: "ISO 9001:2015 Certified", icon: Shield },
  { title: "MSME Registered", icon: Factory },
  { title: "Aerospace Grade Standards", icon: Zap },
];

const Facilities = () => {
  return (
    <div>
      {/* Page Header */}
  <section className="bg-gradient-primary py-16 md:py-24 rounded-b-[3rem] overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h1 className="w-full text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-3 leading-tight">
            World-Class Manufacturing Facilities
          </h1>
          <p className="w-full text-sm sm:text-base md:text-lg text-primary-foreground/85 max-w-full mx-auto leading-relaxed">
            Over 30,000 sq. ft. of state-of-the-art manufacturing space equipped with cutting-edge technology and operated by highly skilled professionals.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="border-border shadow-medium hover:shadow-large transition-all duration-200">
                <CardContent className="pt-6 pb-6 text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Our Facilities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Comprehensive infrastructure for precision engineering</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <div key={index} className="hidden md:block">
                  <GlowCard className="p-6" customSize={true}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-2 text-xs font-semibold">{facility.badge}</Badge>
                        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-0.5">{facility.title}</h3>
                        <p className="text-sm text-primary/80 font-medium">{facility.tagline}</p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{facility.description}</p>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-foreground uppercase tracking-wide mb-3">Equipment & Services:</h4>
                      {facility.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </GlowCard>
                </div>
              );
            })}

            {/* Mobile: Simple Cards without glow effect */}
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <div key={index} className="md:hidden">
                  <Card className="p-6 border-border shadow-sm hover:shadow-md transition-all duration-200 h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex-shrink-0 shadow-sm">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-2 text-xs font-semibold">{facility.badge}</Badge>
                        <h3 className="text-base font-bold text-foreground mb-0.5">{facility.title}</h3>
                        <p className="text-xs text-primary/80 font-medium">{facility.tagline}</p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{facility.description}</p>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-foreground uppercase tracking-wide mb-3">Equipment & Services:</h4>
                      {facility.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Certifications & Standards</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Meeting and exceeding international standards</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <Card
                  key={index}
                  className="border-2 border-muted shadow-sm hover:shadow-medium transition-all duration-200 hover:-translate-y-1"
                >
                  <CardContent className="pt-6 pb-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-foreground">{cert.title}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section (match other pages) */}
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

export default memo(Facilities);
