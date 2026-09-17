"use client";

import { Container } from "@/components/ui/container";
import { PhotoCard } from "@/components/home/living-photo";
import { Reveal } from "@/components/home/reveal";

const PHOTOS = [
  {
    src: "/images/embassy-graduation.jpg",
    alt: "Zimbabwean graduates with embassy officials in Algiers",
    caption: "Graduation, Algiers",
    meta: "Class of 2025",
    span: "sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto sm:min-h-[420px]",
  },
  {
    src: "/images/football-team.jpg",
    alt: "AZSA football team holding the Zimbabwean flag",
    caption: "Weekend league",
    meta: "Community",
    span: "aspect-[4/3] sm:min-h-[200px]",
  },
  {
    src: "/images/graduates-2024.jpg",
    alt: "A Zimbabwean student in graduation robes",
    caption: "One more home",
    meta: "Milestones",
    span: "aspect-[4/3] sm:min-h-[200px]",
  },
  {
    src: "/images/cultural-celebration.jpg",
    alt: "Cultural celebration in Zimbabwean dress",
    caption: "Independence Day",
    meta: "Culture",
    span: "aspect-[4/3] sm:min-h-[200px]",
  },
  {
    src: "/images/graduate-engineering.jpg",
    alt: "An engineering graduate holding their cap",
    caption: "Engineering, 2023",
    meta: "Milestones",
    span: "aspect-[4/3] sm:min-h-[200px]",
  },
];

export function CommunityGallery() {
  return (
    <section className="bg-ink-950 py-20">
      <Container>
        <Reveal>
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-500">
              The community, actually
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-offwhite sm:text-4xl">
              Not stock photos. Us.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-platinum">
              Graduations in Algiers, weekend football, Independence Day — the moments this
              community has actually had, in the cities it actually lives in.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid auto-rows-min grid-cols-1 gap-4 sm:grid-cols-4">
          {PHOTOS.map((p, i) => (
            <Reveal key={p.src} delay={i * 0.07} className={p.span}>
              <PhotoCard
                src={p.src}
                alt={p.alt}
                caption={p.caption}
                meta={p.meta}
                className="h-full min-h-[200px]"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
