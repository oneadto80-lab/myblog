import ProjectsBallpitBackground from "@/components/projects/ProjectsBallpitBackground";

export default function ProjectsLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <ProjectsBallpitBackground />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
