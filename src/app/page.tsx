import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { SparklesCore } from "@/components/ui/sparkles";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TimeDisplay } from "@/components/ui/time-display";
import { SpotifyStatus } from "@/components/spotify-status";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="blog-section flex flex-col min-h-[100dvh] pb-24 relative">

      {/* Header Section */}
      <section className="pt-8 pb-12">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">{DATA.name}</h1>
          <div className="text-muted-foreground mt-1 flex items-center gap-1">
            21,{" "}
            <TypewriterEffect
              words={[
                { text: "Software Developer" },
                { text: "Indie Hacker" },
                { text: "Design Engineer" },
              ]}
            />
          </div>
          <div className="text-muted-foreground mt-1 flex items-center gap-2">
            <span>India</span>
            <div className="h-1 w-1 bg-muted-foreground rounded-full" />
            <TimeDisplay />
          </div>
        </BlurFade>
      </section>

      {/* Intro Section */}
      <section className="pb-12 space-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <p className="text-muted-foreground leading-relaxed">
            I’m an engineer who likes building things that actually work in the real world.
          </p>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <p className="text-muted-foreground leading-relaxed">
            Most days I’m coding, breaking things, fixing them, and turning random ideas into usable products. I’m especially into web apps, AI tools, and systems that actually solve problems instead of just looking cool.          </p>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <p className="text-muted-foreground leading-relaxed">
            I enjoy going deep, understanding things properly, and learning by building. Still experimenting, still improving, always working on something new.          </p>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <p className="text-muted-foreground leading-relaxed">
            You&apos;ll find me shitposting on{" "}
            <Link href={DATA.contact.social.X.url} className="text-blue-500 hover:underline">
              X
            </Link>
            , check out my{" "}
            <Link href="https://store.kshv.me" className="text-blue-500 hover:underline">
              digital store
            </Link>
            , or you can always reach me at{" "}
            <Link href={`mailto:${DATA.contact.email}`} className="text-blue-500 hover:underline">
              {DATA.contact.email}
            </Link>
            .
          </p>
        </BlurFade>
      </section>

      <section className="pb-12">
        <BlurFade delay={BLUR_FADE_DELAY * 5.5}>
          <SpotifyStatus />
        </BlurFade>
      </section>

      {/* Skills Section */}
      <section className="pb-12">
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <h2 className="text-lg font-semibold mb-4 text-foreground">Skills</h2>
          <p className="text-sm text-muted-foreground mb-6">Technologies and tools I work with.</p>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {DATA.skills.map((skill, index) => (
              <div key={skill} className="text-sm text-muted-foreground">
                {skill}
              </div>
            ))}
          </div>
        </BlurFade>
      </section>

      {/* Career Section */}
      <section className="pb-12">
        <BlurFade delay={BLUR_FADE_DELAY * 8}>
          <h2 className="text-lg font-semibold mb-4 text-foreground">Career</h2>
          <p className="text-sm text-muted-foreground mb-8">Work experiences and roles.</p>
        </BlurFade>

        {/* Work Experience */}
        <div className="space-y-8">
          {DATA.work.map((job, id) => (
            <BlurFade key={job.company} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <Link href={job.href || "#"} className="flex items-center gap-2 group hover:underline">
                        <h4 className="font-medium text-foreground">{job.company}</h4>
                        <ArrowUpRight className="size-3 opacity-65 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex-1 flex flex-col gap-1 pb-2">
                        <span className="font-medium text-sm">{job.title}</span>
                        <span className="text-sm text-muted-foreground">{job.start} - {job.end ?? "Present"}</span>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          {job.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="pb-12">
        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <h2 className="text-lg font-semibold mb-4 text-foreground">Education</h2>
          <p className="text-sm text-muted-foreground mb-8">Academic background.</p>
        </BlurFade>

        <div className="space-y-8">
          {DATA.education.map((edu, id) => (
            <BlurFade key={edu.school} delay={BLUR_FADE_DELAY * 15 + id * 0.05}>
              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <Link href={edu.href || "#"} className="flex items-center gap-2 group hover:underline">
                        <h4 className="font-medium text-foreground">{edu.school}</h4>
                        <ArrowUpRight className="size-3 opacity-65 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex-1 flex flex-col gap-1 pb-2">
                        <span className="font-medium text-sm">{edu.degree}</span>
                        <span className="text-sm text-muted-foreground">{edu.start} - {edu.end}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>



      {/* Projects Built Section */}
      <section className="pb-12">
        <BlurFade delay={BLUR_FADE_DELAY * 18}>
          <h2 className="text-lg font-semibold mb-4 text-foreground">Projects I Built</h2>
          <p className="text-sm text-muted-foreground mb-8">Personal projects and experiments.</p>
        </BlurFade>

        <div className="space-y-8">
          {DATA.projects.map((project, id) => (
            <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 19 + id * 0.05}>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground">{project.title}</h3>
                  <Link href={project.href} className="text-muted-foreground hover:text-foreground">
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {/* Summary Line */}
                  <div className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </div>

                  {/* Timeline (if exists) */}
                  {project.timeline && project.timeline.length > 0 && (
                    <div className="mt-4 flex flex-col">
                      {project.timeline.map((desc, i) => (
                        <div key={i} className="flex gap-4 group">
                          {/* Dot and Line Container */}
                          <div className="relative flex w-6 flex-shrink-0 flex-col items-center pt-1.5">
                            <div className="w-1.5 h-1.5 bg-secondary-foreground rounded-full shrink-0" />
                            {/* Render line for all but the last item, or all if we want it to bleed. 
                                User spec: "-mb-[calc(1.5rem+9px)] extends it downwards to overlap the gap"
                                This suggests it should connect even if it's the last one? 
                                Usually last item doesn't have a line going down unless it connects to next project.
                                But let's assume standard timeline behavior: line connects items *within* the list.
                                If I look at the user request "vertical line between points", it implies connection.
                                I'll render it for all except the last one to define the group clearly. 
                            */}
                            {i !== project.timeline.length - 1 && (
                              <div className="w-[1.5px] bg-muted-foreground/80 flex-1 -mt-[3px] -mb-[calc(1.5rem+9px)]" />
                            )}
                          </div>

                          {/* Content */}
                          <div className="pb-6 text-muted-foreground text-sm leading-relaxed">
                            {desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* OSS Contributions Section */}
      <section className="pb-12">
        <BlurFade delay={BLUR_FADE_DELAY * 22}>
          <h2 className="text-lg font-semibold mb-4 text-foreground">OSS Contributions</h2>
          <p className="text-sm text-muted-foreground mb-8">Open source projects I&apos;ve contributed to</p>
        </BlurFade>

        <div className="space-y-4">
          {DATA.hackathons.map((hackathon, id) => (
            <div key={hackathon.title} className="flex flex-col gap-4">
              <BlurFade delay={BLUR_FADE_DELAY * 23}>
                <div className="flex flex-col gap-1 group w-full">
                  <Link
                    href={hackathon.links[0]?.href || "#"}
                    className="group flex items-center gap-2 text-sm font-medium"
                  >
                    {hackathon.title}
                    <ArrowUpRight className="size-3 text-muted-foreground group-hover:text-foreground" />
                  </Link>
                  <div className="text-muted-foreground text-sm">
                    <span className="block">{hackathon.dates}</span>
                  </div>
                </div>
              </BlurFade>
              <div className="pl-4 border-l">
                {hackathon.links.map((link, i) => (
                  <BlurFade key={link.title} delay={BLUR_FADE_DELAY * 24 + i * 0.05}>
                    <div className="flex items-start gap-4 py-2">
                      <div className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <Link href={link.href} target="_blank" className="text-sm font-medium flex items-center gap-2 text-foreground hover:underline">
                          {link.title}
                          <ArrowUpRight className="size-3 text-muted-foreground" />
                        </Link>
                        <p className="text-xs text-muted-foreground mt-1">
                          {link.title.includes("CMS") ? "Redesigned major parts of the 100xDevs CMS UI — improving hierarchy, spacing, consistency, and overall usability." : "Delivered a significant UI overhaul for the Daily Code repository, enhancing both aesthetics and developer experience."}
                        </p>
                      </div>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Large Footer Logo */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <BlurFade delay={BLUR_FADE_DELAY * 26}>
          <div className="relative flex flex-col items-center justify-center">
            <h2 className="text-[12rem] sm:text-[16rem] md:text-[20rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-t from-blue-600/80 via-purple-500/50 to-transparent select-none leading-none z-10">
              YASH
            </h2>
            <div className="w-[40rem] h-40 relative">
              {/* Gradients */}
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

              {/* Core component */}
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />

              {/* Radial Gradient to prevent sharp edges */}
              <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
          </div>
        </BlurFade>
      </section>
    </main>
  );
}

