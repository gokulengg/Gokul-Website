import { Card, CardContent } from "@/components/ui/card";
import projects from "@/lib/projectsData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ProjectCard } from "@/components/ui/project-card";
import { useEffect } from "react";
// Use public images for projects (placed in public/images/projects)
// Example paths: /images/projects/<filename>
import { ArrowRight, CheckCircle2, Handshake, Factory, Cpu, TrendingUp } from "lucide-react";

const Projects = () => {
  // Preload all project images for instant loading
  useEffect(() => {
    projects.forEach((project) => {
      const img = new Image();
      img.src = project.image;
    });
  }, []);

  return (
    <div>
      {/* Page Header */}
  <section className="bg-gradient-primary py-16 md:py-24 rounded-b-[3rem] overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h1 className="w-full text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-3 leading-tight">
            Engineering in Action
          </h1>

          <p className="w-full text-sm sm:text-base md:text-lg text-primary-foreground/85 max-w-full mx-auto leading-relaxed">
            A Portfolio of Precision and Performance Across Critical Industries
          </p>
        </div>
      </section>

      {/* Stats Section removed as requested */}

      {/* Projects Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:gap-7 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                image={project.image}
                category={project.category}
                description={project.description}
                loading={index < 8 ? "eager" : "lazy"}
              />
            ))}
          </div>
        </div>
      </section>


      {/* Strategic Partnerships Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background via-background to-muted/40">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Strategic Partnerships & Joint Ventures</h2>
            </div>

            {/* Partnership Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { icon: Handshake, title: "Joint Ventures", description: "Collaborate on precision manufacturing initiatives with shared expertise and resources" },
                { icon: Factory, title: "Production Partnerships", description: "Long-term contract manufacturing for specialized aerospace and defense components" },
                { icon: Cpu, title: "Technology Collaboration", description: "Co-development of advanced manufacturing solutions and process innovations" },
                { icon: TrendingUp, title: "Capacity Expansion", description: "Strategic partnerships to scale production capabilities and market reach" },
              ].map((partnership, idx) => {
                const IconComponent = partnership.icon;
                return (
                  <Card
                    key={idx}
                    className="group relative overflow-hidden border border-muted/20 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-primary/40 hover:-translate-y-1 flex flex-col"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardContent className="pt-8 pb-8 flex flex-col items-center text-center h-full justify-between relative z-10">
                      <div className="flex flex-col items-center w-full">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-3">{partnership.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{partnership.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Why Partner Section */}
            <div className="rounded-2xl p-6 md:p-8 border border-[hsl(var(--card-border))] bg-[hsl(var(--card))]/60 shadow-soft">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-5">Why Partner with Sri Gokul?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {[
                  "ISO 9001:2015 certified facility with stringent quality protocols",
                  "Over 30 years of proven manufacturing excellence",
                  "Elite engineering team with aerospace & defense expertise",
                  "Trusted partner to DRDO, HAL, BHEL & premier institutions",
                  "State-of-the-art CNC machining and fabrication capabilities",
                  "Flexible production capacity for complex projects",
                  "Comprehensive tool room and custom fixture design",
                  "Track record in mission-critical applications",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-lg border border-border/50 bg-background/40 px-3 py-2.5 hover:border-primary/30 transition-colors">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 text-primary" />
                    <p className="text-sm md:text-base text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 md:mt-8 text-center">
                <Button asChild size="default" className="shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
                  <Link to="/contact" className="inline-flex items-center gap-2">
                    Discuss Partnership
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials section removed as requested */}

      {/* CTA Section */}
      <section className="py-12 bg-gradient-primary rounded-t-[2rem] overflow-hidden">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Let's Build the Future Together
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-xl mx-auto mb-6">
            Contact us to discuss how Sri Gokul Engineering Works can bring precision, reliability, and excellence to your next project.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary-foreground text-primary px-8 py-3 text-sm font-medium shadow-large hover:bg-primary-foreground/90 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default Projects;
