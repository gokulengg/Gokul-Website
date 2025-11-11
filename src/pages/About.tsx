import { Card, CardContent } from "@/components/ui/card";
import { Target, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Timeline } from "@/components/ui/timeline";
import { CountUpStat } from "@/components/CountUpStat";

const About = () => {
  const values = [
    "Excellence in every project we undertake",
    "Innovation through cutting-edge technology",
    "Integrity and transparency in all relationships",
    "Precision and reliability without compromise",
  ];

  return (
    <div>
      {/* Page Header */}
  <section className="bg-gradient-primary py-16 md:py-24 rounded-b-[3rem] overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <Badge
            variant="secondary"
            className="inline-flex items-center px-3 py-1 rounded-full bg-primary/8 text-white font-semibold border border-border shadow-sm mb-4 dark:text-foreground dark:border-white"
          >
            ISO 9001:2015 Certified
          </Badge>

          <h1 className="w-full text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-3 leading-tight">
            Over Three Decades of Engineering Mastery
          </h1>

          <p className="w-full text-sm sm:text-base md:text-lg text-primary-foreground/85 max-w-full mx-auto leading-relaxed">
            Engineering the Future, Forging a Legacy of Excellence Since 1987
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-3">
                Perfection through Precision
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
                Your Strategic Partner for Mission-Critical Engineering
              </p>
            </div>
            
            <Card className="border-border shadow-large bg-gradient-to-br from-muted/30 to-background overflow-hidden">
              <CardContent className="pt-8 pb-8">
                <div className="space-y-6">
                  <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                    For over three decades, Sri Gokul Engineering Works has forged the critical components at the heart of progress in the world's most demanding industries. We set the standard for precision and reliability. We are more than a manufacturer; we are a dedicated solution architect, engineering success for industries where there is no margin for error, from aerospace and defence to global energy.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                    Our strength lies in the seamless fusion of human expertise and technological power. At our core is an elite team of engineers, master machinists, and certified technicians, the human engine driving our technological capabilities. Their collective expertise and dedication to a culture of perfection are our greatest assets. This combination of talent and advanced technology allows us to deliver absolute confidence and certainty with every project.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-muted/30 to-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <CountUpStat value="35+" label="Years of Excellence" description="Three decades of precision engineering" />
            <CountUpStat value="500+" label="Projects Delivered" description="Mission-critical solutions worldwide" />
            <CountUpStat value="50+" label="Esteemed Clients" description="Industry leaders trust us" />
            <CountUpStat value="100%" label="Quality Commitment" description="Zero-defect manufacturing standards" />
          </div>
        </div>
      </section>

      {/* Heritage & Vision */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            <Card
              className="shadow-large bg-gradient-to-br from-background to-muted/20 hover:shadow-2xl transition-transform transform hover:-translate-y-1 overflow-hidden h-full"
              style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <CardContent className="pt-6 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
                    <History className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground">Our Heritage</h3>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed flex-1">
                  <p>
                    Our journey began in <strong className="text-foreground">1987</strong> with a singular vision: to establish a world-class engineering firm driven by the pursuit of perfection. Founded by a technocrat, Sri Gokul Engineering Works was built on a culture of innovation, technical superiority, and an uncompromising commitment to our clients' success.
                  </p>
                  <p>
                    From our origins as a registered small-scale industry, we have evolved into a vital partner for national and international leaders across the most demanding sectors. Our history is measured in the successful projects, pioneering solutions, and lasting partnerships we have built.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card
              className="shadow-large bg-gradient-to-br from-background to-muted/20 hover:shadow-2xl transition-transform transform hover:-translate-y-1 overflow-hidden h-full"
              style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <CardContent className="pt-6 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
                    <Target className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground">Our Vision</h3>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed flex-1">
                  <p>
                    Our vision is to continue pushing the boundaries of what is possible, cementing our legacy as a global leader in precision engineering. We are committed to being at the forefront of technological advancement while maintaining the highest standards of quality and craftsmanship.
                  </p>
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Our Core Values:</h4>
                    <ul className="space-y-2">
                      {values.map((value, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-sm">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Changelog / Timeline */}
      <section className="bg-background">
        <div className="container mx-auto px-4">
          {/* Timeline heading moved into the Timeline component */}
          <Timeline
            data={[
              {
                title: "1987",
                content: (
                  <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base mb-4">
                      Sri Gokul Engineering Works founded — beginning of our pursuit for precision engineering.
                    </p>
                  </div>
                ),
              },
              {
                title: "2005",
                content: (
                  <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base mb-4">
                      Expansion of heavy machining facilities and investments in large-format CNC capacity.
                    </p>
                  </div>
                ),
              },
              {
                title: "2015",
                content: (
                  <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base mb-4">
                      Adoption of advanced inspection and process controls; deepened partnerships with defence and energy sectors.
                    </p>
                  </div>
                ),
              },
              {
                title: "2022",
                content: (
                  <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base mb-4">
                      Delivered multiple mission-critical projects and strengthened ISO-compliant quality systems.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
};

export default About;
