import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, FileText, X } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // Use precise coordinates for marker
  const mapLat = 17.5027538;
  const mapLng = 78.3063271;
  // Google Maps embed with marker at Sri Gokul Engineering Works
  const mapSrc = `https://www.google.com/maps?q=${mapLat},${mapLng}&z=17&hl=en&output=embed`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitStatus === "loading") return;
    setSubmitStatus("loading");

    // Build FormData manually to properly handle file uploads
    const formDataObj = new FormData();

    // Basic client-side validation
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const details = formData.message.trim();

    if (!name || name.length < 2) {
      setSubmitStatus("idle");
      toast({ title: "Invalid name", description: "Please enter your full name." });
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitStatus("idle");
      toast({ title: "Invalid email", description: "Please enter a valid email address." });
      return;
    }
    if (!details || details.length < 1) {
      setSubmitStatus("idle");
      toast({ title: "Message required", description: "Please provide a message." });
      return;
    }

    // Add form fields to FormData
    formDataObj.set("name", name);
    formDataObj.set("email", email);
    formDataObj.set("phone", phone || "Not provided");
    formDataObj.set("details", details);

    // Add file if selected
    if (selectedFile) {
      formDataObj.set("drawing", selectedFile);
    }

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        body: formDataObj,
      });
      if (!res.ok) {
        const errText = await res.text().catch(() => "Request failed");
        throw new Error(errText || "Request failed");
      }
      setSubmitStatus("success");
      toast({
        title: "Message Sent! ✓",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSelectedFile(null);
      const input = document.getElementById("drawing") as HTMLInputElement;
      if (input) input.value = "";
      
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
      });
      setTimeout(() => setSubmitStatus("idle"), 2200);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-primary py-16 md:py-24 rounded-b-[3rem] overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            Let's Build the Future Together
          </h1>

          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Have a question or ready to start your next project? We're here to help. Reach out and let's discuss how we can deliver precision and excellence.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-3 max-w-7xl mx-auto">
            {/* Quick Contact Cards - Column 1 */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">Contact Information</h3>
              </div>

              <Card className="border-border shadow-medium hover:shadow-lg transition-all duration-200 overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                      <p className="text-sm text-muted-foreground">
                        <a href="tel:+914023020624" className="hover:text-primary transition-colors">
                          +91 40 23020624
                        </a>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <a href="tel:+919347091100" className="hover:text-primary transition-colors">
                          +91 93470 91100
                        </a>
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">Available 9 AM - 6 PM IST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-medium hover:shadow-lg transition-all duration-200 overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">Email</h4>
                      <p className="text-sm text-muted-foreground">
                        <a href="mailto:gokulengg@yahoo.com" className="hover:text-primary transition-colors">
                          gokulengg@yahoo.com
                        </a>
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">We reply within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-medium hover:shadow-lg transition-all duration-200 overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">Address</h4>
                      <p className="text-sm text-muted-foreground">
                        Sri Gokul Engineering Works<br />
                        B-38/A, BHEL-AIE, Ramachandra Puram,<br />
                        Hyderabad, Telangana 500032
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-medium hover:shadow-lg transition-all duration-200 overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">Hours</h4>
                      <p className="text-sm text-muted-foreground">
                        Mon - Fri: 8 AM - 6 PM<br />
                        Sat: 9 AM - 2 PM<br />
                        Sun: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form - Columns 2-3 */}
            <div className="md:col-span-2">
              <Card className="border-border shadow-xl dark:border-white/10 overflow-hidden">
                <CardContent className="pt-8 md:pt-12 pb-8 md:pb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 leading-tight">Send Us a Message</h2>
                  <p className="text-muted-foreground mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-semibold">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="h-11 border-2 border-border dark:border-white/8 focus:border-primary dark:focus:border-primary focus:ring-0 focus:outline-none transition-colors"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-semibold">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          required
                          className="h-11 border-2 border-border dark:border-white/8 focus:border-primary dark:focus:border-primary focus:ring-0 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-semibold">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="h-11 border-2 border-border dark:border-white/8 focus:border-primary dark:focus:border-primary focus:ring-0 focus:outline-none transition-colors"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-semibold">Project Description *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project, requirements, and timeline..."
                        rows={7}
                        required
                        className="border-2 border-border dark:border-white/8 focus:border-primary dark:focus:border-primary focus:ring-0 focus:outline-none resize-none transition-colors"
                      />
                    </div>

                    <div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border/40">
                      <Label htmlFor="drawing" className="text-base font-semibold flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Upload Technical Drawing or Attachment
                      </Label>
                      
                      {!selectedFile ? (
                        <input 
                          id="drawing" 
                          name="drawing" 
                          type="file" 
                          accept=".pdf,.dwg,.dxf,.doc,.docx,image/*" 
                          title="Upload Technical Drawing" 
                          aria-label="Upload Technical Drawing" 
                          className="mt-2 w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:cursor-pointer"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 10 * 1024 * 1024) {
                                toast({ title: "File too large", description: "Please select a file smaller than 10MB." });
                                e.target.value = "";
                                return;
                              }
                              setSelectedFile(file);
                            }
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/20">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 text-primary flex-shrink-0">
                              <FileText className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {(() => {
                                  const name = selectedFile.name;
                                  const lastDot = name.lastIndexOf('.');
                                  if (lastDot === -1) return name.length > 25 ? name.substring(0, 25) + '...' : name;
                                  const nameWithoutExt = name.substring(0, lastDot);
                                  const ext = name.substring(lastDot);
                                  if (nameWithoutExt.length > 20) {
                                    return nameWithoutExt.substring(0, 20) + '...' + ext;
                                  }
                                  return name;
                                })()}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedFile(null);
                              const input = document.getElementById("drawing") as HTMLInputElement;
                              if (input) input.value = "";
                            }}
                            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive flex-shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      
                      <p className="text-xs text-muted-foreground">PDF, DWG, DXF, DOC, DOCX, or image files (max 10MB)</p>
                      

                    </div>

                    {/* Submit Status Messages */}
                    {submitStatus === "success" && (
                      <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-green-600 dark:text-green-400">Message sent successfully!</p>
                          <p className="text-sm text-green-600 dark:text-green-400/80">We'll get back to you within 24 hours.</p>
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={submitStatus !== "idle"}
                      className="w-full h-12 text-base font-semibold gap-2 transition-all duration-300"
                    >
                      {submitStatus === "idle" && (
                        <>
                          <Send className="h-5 w-5" />
                          Send Message
                        </>
                      )}
                      {submitStatus === "loading" && (
                        <>
                          <span className="animate-pulse">Sending</span>
                          <span className="inline-block animate-pulse">·</span>
                          <span className="inline-block animate-pulse">·</span>
                          <span className="inline-block animate-pulse">·</span>
                        </>
                      )}
                      {submitStatus === "success" && (
                        <>
                          <CheckCircle2 className="h-5 w-5" />
                          Sent Successfully
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Find Us on the Map</h2>
            <p className="text-muted-foreground">Visit our facility or schedule a meeting</p>
          </div>

          <Card className="border-border shadow-large overflow-hidden rounded-xl dark:border-white/16">
            <div className="w-full flex items-center justify-center p-8 bg-gradient-to-br from-muted to-muted/50">
              <div className="w-full max-w-3xl">
                <div className="mb-4 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">Sri Gokul Engineering Works</h3>
                  <p className="text-sm text-muted-foreground">B-38/A, BHEL-AIE, Ramachandra Puram, Hyderabad, Telangana 500032</p>
                </div>

                <div className="w-full h-56 md:h-72 rounded-lg overflow-hidden border border-border">
                  <iframe
                    title="Sri Gokul Engineering Works - Map"
                    src={mapSrc}
                    width="100%"
                    height="100%"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block"
                  />
                </div>

                <div className="text-center mt-4">
                  <Button asChild size="sm" className="mt-2">
                    <a href="https://www.google.com/maps/search/?api=1&query=Sri+Gokul+Engineering+Works+Hyderabad" target="_blank" rel="noopener noreferrer">
                      Open in Google Maps
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;
