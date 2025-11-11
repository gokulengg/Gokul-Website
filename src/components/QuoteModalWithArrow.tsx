import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, Check, X, FileText, ArrowRight } from "lucide-react";

const QuoteModalWithArrow: React.FC = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) setStatus("idle"); }}>
      <DialogTrigger asChild>
        <Button
          size="default"
          className="shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2"
        >
          Get Quote
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-lg hover:bg-white/30 transition-all duration-200">
            <ArrowRight className="h-3 w-3" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[92%] sm:max-w-3xl max-h-[90vh] flex flex-col p-0 rounded-lg">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pr-12 sm:pr-16 pb-4 sm:pb-6 border-b border-border">
          <DialogTitle>Request a Detailed Project Quote</DialogTitle>
          <DialogDescription className="mt-2 text-xs sm:text-sm">
            Share your project specifications and technical drawings for a comprehensive quote. We typically respond within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (status === "loading") return;
            setStatus("loading");
            const form = e.currentTarget as HTMLFormElement;
            const formData = new FormData(form);

            // Basic client-side validation
            const name = formData.get("name") as string;
            const email = formData.get("email") as string;
            const phone = formData.get("phone") as string;
            const details = formData.get("details") as string;

            if (!name || name.trim().length < 2) {
              setStatus("idle");
              toast({ title: "Invalid name", description: "Please enter your full name." });
              return;
            }
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              setStatus("idle");
              toast({ title: "Invalid email", description: "Please enter a valid email address." });
              return;
            }
            if (!phone || phone.replace(/\D/g, "").length < 6) {
              setStatus("idle");
              toast({ title: "Invalid phone", description: "Please enter a valid phone number." });
              return;
            }
            if (!details || details.trim().length < 1) {
              setStatus("idle");
              toast({ title: "Details required", description: "Please provide project details." });
              return;
            }

            try {
              const res = await fetch("/api/quote", {
                method: "POST",
                body: formData, // Send as FormData to support file uploads
              });
              if (!res.ok) {
                const errText = await res.text().catch(() => "Request failed");
                throw new Error(errText || "Request failed");
              }
              setStatus("success");
              toast({ title: "Quote request submitted ✓", description: "We'll respond within 24 hours with a detailed quote." });
              setTimeout(() => {
                setOpen(false);
                setStatus("idle");
              }, 1400);
            } catch (err) {
              console.error(err);
              setStatus("error");
              toast({ title: "Something went wrong", description: "Please try again or contact us directly." });
              setTimeout(() => setStatus("idle"), 2200);
            }
          }}
          id="quote-form"
          className="grid gap-3 sm:gap-5 md:grid-cols-2 mt-3 px-4 sm:px-6 pb-4 sm:pb-6 overflow-auto flex-1"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="qm-name" className="text-xs sm:text-sm font-semibold">Full name *</Label>
              <Input id="qm-name" name="name" required className="mt-1.5 h-9 sm:h-10" />
            </div>
            <div>
              <Label htmlFor="qm-email" className="text-xs sm:text-sm font-semibold">Email *</Label>
              <Input id="qm-email" name="email" type="email" required className="mt-1.5 h-9 sm:h-10" />
            </div>
            <div>
              <Label htmlFor="qm-phone" className="text-xs sm:text-sm font-semibold">Phone *</Label>
              <Input id="qm-phone" name="phone" type="tel" required className="mt-1.5 h-9 sm:h-10" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="qm-details" className="text-xs sm:text-sm font-semibold">Project details *</Label>
              <Textarea id="qm-details" name="details" rows={4} required className="mt-1.5 min-h-20 sm:min-h-24 resize-y" placeholder="Describe your project requirements, specifications, materials, quantities, timeline, etc." />
            </div>

            <div className="rounded-xl border-2 border-dashed border-border/40 bg-muted/20 hover:bg-muted/30 transition-colors p-3 sm:p-4">
              {!selectedFile ? (
                <label
                  htmlFor="qm-drawing"
                  className="group flex flex-col items-center justify-center gap-2 sm:gap-3 text-center cursor-pointer min-h-24 sm:min-h-32 rounded-lg"
                >
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm group-hover:shadow-md transition-shadow">
                    <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="px-2">
                    <span className="block text-xs sm:text-sm font-semibold">Click to upload your file</span>
                    <span className="block text-[10px] sm:text-xs text-muted-foreground">(PDF, DWG, DXF, images)</span>
                  </div>
                </label>
              ) : (
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 text-primary">
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
                      const input = document.getElementById("qm-drawing") as HTMLInputElement;
                      if (input) input.value = "";
                    }}
                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <input
                id="qm-drawing"
                name="drawing"
                type="file"
                accept=".pdf,.dwg,.dxf,image/*"
                title="Upload technical drawing"
                aria-label="Upload technical drawing"
                className="sr-only"
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
              <p className="mt-2 text-[10px] sm:text-xs text-muted-foreground">Max file size: 10MB</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="sm:hidden text-xs text-muted-foreground">
              {status === "loading" && "Sending..."}
              {status === "success" && <span className="text-green-600">✓ Submitted</span>}
              {status === "error" && <span className="text-red-600">✗ Failed</span>}
            </div>
          </div>
        </form>

        {/* Fixed footer at bottom */}
        <div className="border-t border-border bg-background py-2 sm:py-3 px-4 sm:px-6 flex items-center gap-2 justify-between sm:justify-end">
          <DialogClose asChild>
            <Button variant="ghost" size="sm" className="w-1/2 sm:w-auto px-3 py-2">Cancel</Button>
          </DialogClose>

          <Button form="quote-form" type="submit" size="sm" className="w-1/2 sm:w-auto px-3 py-2 flex items-center gap-2 justify-center" disabled={status === "loading"}>
            {status === "success" ? <Check className="h-4 w-4" /> : status === "error" ? <X className="h-4 w-4" /> : <Send className="h-4 w-4" />}
            {status === "loading" ? "Sending" : "Request Quote"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModalWithArrow;
