import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "Thoughts, ideas, and insights.",
};

const BLUR_FADE_DELAY = 0.04;

export default function BlogPage() {
  return (
    <main className="blog-section flex flex-col min-h-[100dvh] pb-24">
      <section className="pt-8 pb-12">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground mt-2">
            Coming soon...
          </p>
        </BlurFade>
      </section>

      <section className="pb-12">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <p className="text-muted-foreground leading-relaxed">
            I&apos;ll be sharing my thoughts on design, development, and everything in between.
          </p>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <Link
            href="/"
            className="inline-block mt-6 text-blue-500 hover:underline"
          >
            ← Back to home
          </Link>
        </BlurFade>
      </section>
    </main>
  );
}
