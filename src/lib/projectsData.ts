// Auto-generated projects data from public/images/projects

function titleFromFilename(name: string) {
  const withoutExt = name.replace(/\.[^/.]+$/, "");
  // replace underscores and multiple spaces with single space
  const cleaned = withoutExt.replace(/[_]+/g, " ").replace(/\s+/g, " ").trim();
  // make nicer capitalization (title case)
  return cleaned
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function inferCategory(name: string) {
  const n = name.toLowerCase();
  if (/missile|rocket|avionics|canister|drill|sh\b|integration/i.test(n) || n.includes("avionics")) return "Aerospace & Defence";
  if (n.includes("rail") || n.includes("wheel")) return "Railways & Transportation";
  if (n.includes("gear") || n.includes("shaft")) return "Heavy Machining";
  if (n.includes("tank") || n.includes("chemical") || n.includes("plant")) return "Fabrication & Storage";
  if (n.includes("mandrel") || n.includes("composite") || n.includes("winding")) return "Composite & Mandrel";
  if (n.includes("fixture") || n.includes("jig") || n.includes("trolley") || n.includes("fixture")) return "Tooling & Fixtures";
  if (n.includes("press") || n.includes("tool")) return "Tool Room";
  return "Precision Manufacturing";
}

function inferDescription(category: string) {
  switch (category) {
    case "Aerospace & Defence":
      return "Aerospace-grade component produced to meet strict defence specifications.";
    case "Railways & Transportation":
      return "Durable, high-reliability components for rail and transportation applications.";
    case "Heavy Machining":
      return "Large-scale precision machining for heavy industry and power sectors.";
    case "Fabrication & Storage":
      return "Custom fabricated assemblies and storage tanks built to specification.";
    case "Composite & Mandrel":
      return "Specialized mandrels and composite tooling for advanced manufacturing processes.";
    case "Tooling & Fixtures":
      return "Custom jigs, fixtures and assembly tooling for efficient production.";
    case "Tool Room":
      return "Precision tool room assemblies, press tools and dies for repeatable results.";
    default:
      return "High-precision manufactured component for industrial applications.";
  }
}

// List of images in public/images/projects (kept in the public folder)
const filenames = [
  "AVIONICS INTEGRATION FIXTURE 2.png",
  "AVIONICS INTEGRATION FIXTURE.png",
  "Canister MANDREL ASSY.png",
  "Carbon Phenolic Shells.png",
  "CE Mandrel.png",
  "Fixture for Pipes.png",
  "gear wheels assembly.png",
  "MANDREL ADAPTOR.png",
  "Railway WHEELS.png",
  "Rocket Motor Preforms.jpg",
  "BRACKET FINS.png",
  "AKASH MANDREL.png",
  "CANISTER HANDLING TROLLEY.png",
  "CASING SUCTION DISCHARGE.png",
  "Chemical Plant Tank.png",
  "CHEMICAL Tanks.png",
  "Component Integration trolleys.png",
  "EXCERCISE HEAD SHELLS.png",
  "Fixture.png",
  "Flow Forming Mandrel.png",
  "GANTRY.png",
  "GEAR WHEELS.png",
  "Head gear assy.png",
  "INTEGRATION JIG.png",
  "LIFITNG BEAM for Defence Components.png",
  "Mandrel for Missile Winding.png",
  "MAST.png",
  "MISSILE DRILLING FIXTURE.png",
  "Missile HEAUV LEAK TANK.png",
  "Press toolASSY FIXTURES.png",
  "Riveting fixture.png",
  "SPOOL HOLDER ATTACHMENT.png",
  "Strain agening fixtures.png",
];
// Optional: provide a small override map for custom titles when the filename
// doesn't produce the desired display title. Use the exact filename as the key.
const customTitles: Record<string, string> = {
  // Examples - add your custom titles here:
  "Chemical Plant Tank.png": "Chemical Storage Tank Assembly",
  "Component Integration trolleys.png": "Component Trolleys",
  "LIFITNG BEAM for Defence Components.png": "Lifting Beam for Defence Components",
  "EXCERCISE HEAD SHELLS.png": "Exercise Head Shells",
  "Missile HEAUV LEAK TANK.png": "Missile Heavy Leak Tank",
  "Press toolASSY FIXTURES.png": "Press Tool Assembly Fixtures",
  "Strain agening fixtures.png": "Strain Ageing Fixtures",
  "Head gear assy.png": "Head Gear Assembly",
};

export const projects = filenames.map((f) => {
  // prefer a custom title when provided, otherwise infer from filename
  const inferred = titleFromFilename(f);
  const title = customTitles[f] ?? inferred;
  const category = inferCategory(f);
  const description = inferDescription(category);
  return {
    image: `/images/projects/${f}`,
    title,
    category,
    description,
  };
});

export default projects;
