export const site = {
  name: "Cynthia Chan",
  shortName: "Cynthia",
  title: "Cynthia Chan — Product Designer",
  description:
    "NYC-based product designer from Carnegie Mellon. UX, strategy, and AI-forward products.",
  email: "Cxchan97@gmail.com",
  linkedIn: "https://www.linkedin.com/in/cxchan",
  resume:
    "https://drive.google.com/file/d/1qigemt4vYMXcC4SxHIZS1GGX2K0q7-OV/view?usp=drive_link",
  location: "New York, NY",
  timezone: "America/New_York",
} as const;

export const navLinks = [
  { label: "Projects", href: "/#projects" },
  { label: "Play", href: "/play" },
  { label: "About", href: "/about" },
  { label: "Resume", href: site.resume, external: true },
] as const;
