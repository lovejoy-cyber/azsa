/**
 * AZSA seed script.
 *
 * All names, posts, and figures below are synthetic demo data written for
 * this prototype -- they are not real people or verified statistics. Run
 * with: npm run db:seed
 */
import bcrypt from "bcryptjs";
import { eq, sql } from "drizzle-orm";
import { db, schema } from "./index";
import { slugify } from "@/lib/utils";

async function main() {
  console.log("Seeding AZSA demo data...");

  const passwordHash = await bcrypt.hash("Password123!", 10);

  // ---- Cities ----------------------------------------------------------
  const [oran, algiers, constantine, annaba] = await db
    .insert(schema.cities)
    .values([
      {
        name: "Oran",
        wilaya: "Oran Wilaya",
        description:
          "Algeria's second-largest city and a major hub for Zimbabwean engineering students, home to USTO-MB.",
        studentPopulationEstimate: 140,
      },
      {
        name: "Algiers",
        wilaya: "Algiers Wilaya",
        description: "The capital, host to several national universities and the embassy itself.",
        studentPopulationEstimate: 95,
      },
      {
        name: "Constantine",
        wilaya: "Constantine Wilaya",
        description: "Known as the 'City of Bridges', with a strong medical and sciences faculty presence.",
        studentPopulationEstimate: 40,
      },
      {
        name: "Annaba",
        wilaya: "Annaba Wilaya",
        description: "A coastal city with a growing group of postgraduate engineering students.",
        studentPopulationEstimate: 22,
      },
    ])
    .returning();

  // ---- Universities ------------------------------------------------------
  const [usto, usthb, uconstantine, uannaba] = await db
    .insert(schema.universities)
    .values([
      {
        name: "Université des Sciences et de la Technologie d'Oran Mohamed Boudiaf",
        shortName: "USTO-MB",
        cityId: oran.id,
        website: "https://www.univ-usto.dz",
        description: "Leading science and technology university, strong in aeronautical and mechanical engineering.",
      },
      {
        name: "Université des Sciences et de la Technologie Houari Boumediene",
        shortName: "USTHB",
        cityId: algiers.id,
        website: "https://www.usthb.dz",
        description: "Algeria's largest science and technology university, based in Algiers.",
      },
      {
        name: "Université Constantine 3 Salah Boubnider",
        shortName: "Constantine 3",
        cityId: constantine.id,
        description: "Strong programs in architecture, medicine, and urban planning.",
      },
      {
        name: "Université Badji Mokhtar Annaba",
        shortName: "Annaba University",
        cityId: annaba.id,
        description: "Known for metallurgy, mining, and industrial engineering programs.",
      },
    ])
    .returning();

  // ---- Users + profiles ---------------------------------------------------
  const usersData = [
    { email: "admin@azsa.dz", role: "super_admin" as const, fullName: "AZSA Platform Team", displayName: "AZSA Admin" },
    { email: "embassy@azsa.dz", role: "embassy_admin" as const, fullName: "Embassy Student Affairs Office", displayName: "Embassy Desk" },
    { email: "tanaka.moyo@azsa.dz", role: "student" as const, fullName: "Tanaka Moyo", displayName: "Tanaka M." },
    { email: "rutendo.chikafu@azsa.dz", role: "student" as const, fullName: "Rutendo Chikafu", displayName: "Rutendo C." },
    { email: "farai.ndlovu@azsa.dz", role: "moderator" as const, fullName: "Farai Ndlovu", displayName: "Farai N." },
    { email: "chiedza.mutasa@azsa.dz", role: "student" as const, fullName: "Chiedza Mutasa", displayName: "Chiedza" },
    { email: "tinashe.gwenzi@azsa.dz", role: "student" as const, fullName: "Tinashe Gwenzi", displayName: "Tinashe G." },
  ];

  const insertedUsers = await db
    .insert(schema.users)
    .values(
      usersData.map((u) => ({
        email: u.email,
        passwordHash,
        role: u.role,
        status: "active" as const,
        emailVerifiedAt: new Date(),
      }))
    )
    .returning();

  const byEmail = (email: string) => insertedUsers.find((u) => u.email === email)!;

  await db.insert(schema.profiles).values([
    {
      userId: byEmail("admin@azsa.dz").id,
      fullName: "AZSA Platform Team",
      displayName: "AZSA Admin",
      bio: "Keeping the platform running for the whole community.",
      isPublic: false,
    },
    {
      userId: byEmail("embassy@azsa.dz").id,
      fullName: "Embassy Student Affairs Office",
      displayName: "Embassy Desk",
      bio: "Official channel for the Zimbabwe Embassy's student affairs office in Algeria.",
      isPublic: false,
    },
    {
      userId: byEmail("tanaka.moyo@azsa.dz").id,
      fullName: "Tanaka Moyo",
      displayName: "Tanaka M.",
      bio: "4th-year Aeronautical Engineering. From Mutare, based in Oran since 2022.",
      homeProvinceZw: "Manicaland",
      cityId: oran.id,
      universityId: usto.id,
      fieldOfStudy: "Aeronautical Engineering",
      yearOfStudy: 4,
      arrivalYear: 2022,
    },
    {
      userId: byEmail("rutendo.chikafu@azsa.dz").id,
      fullName: "Rutendo Chikafu",
      displayName: "Rutendo C.",
      bio: "Studying medicine in Constantine. Loves organising study groups.",
      homeProvinceZw: "Harare",
      cityId: constantine.id,
      universityId: uconstantine.id,
      fieldOfStudy: "Medicine",
      yearOfStudy: 3,
      arrivalYear: 2023,
    },
    {
      userId: byEmail("farai.ndlovu@azsa.dz").id,
      fullName: "Farai Ndlovu",
      displayName: "Farai N.",
      bio: "Postgrad in Computer Science, USTHB. Community moderator.",
      homeProvinceZw: "Bulawayo",
      cityId: algiers.id,
      universityId: usthb.id,
      fieldOfStudy: "Computer Science",
      yearOfStudy: 1,
      arrivalYear: 2021,
    },
    {
      userId: byEmail("chiedza.mutasa@azsa.dz").id,
      fullName: "Chiedza Mutasa",
      displayName: "Chiedza",
      bio: "Second-year Architecture student finding her feet in Constantine.",
      homeProvinceZw: "Masvingo",
      cityId: constantine.id,
      universityId: uconstantine.id,
      fieldOfStudy: "Architecture",
      yearOfStudy: 2,
      arrivalYear: 2024,
    },
    {
      userId: byEmail("tinashe.gwenzi@azsa.dz").id,
      fullName: "Tinashe Gwenzi",
      displayName: "Tinashe G.",
      bio: "Metallurgical Engineering student in Annaba. Football on weekends.",
      homeProvinceZw: "Midlands",
      cityId: annaba.id,
      universityId: uannaba.id,
      fieldOfStudy: "Metallurgical Engineering",
      yearOfStudy: 3,
      arrivalYear: 2023,
    },
  ]);

  // ---- News articles -------------------------------------------------------
  const newsData = [
    {
      title: "Embassy opens 2026 scholarship renewal window for continuing students",
      excerpt:
        "Continuing students on government scholarships have until the end of September to submit renewal documents through the embassy's student affairs desk.",
      content:
        "The Zimbabwe Embassy's student affairs office has opened the annual renewal window for students on continuing government scholarships. Students are asked to submit updated transcripts, a certificate of enrolment, and proof of accommodation before the deadline. The office has said it will hold two walk-in sessions this month for students who have questions about their documents. Students who miss the window should contact the embassy desk directly rather than waiting for the next cycle.",
      category: "embassy",
      featured: true,
    },
    {
      title: "USTO-MB engineering faculty extends library hours for exam season",
      excerpt:
        "The central library at USTO-MB will stay open until midnight through the December exam period, following requests from student associations.",
      content:
        "Following a request submitted jointly by several student associations, including AZSA members, USTO-MB's central library will extend its opening hours until midnight for the duration of the December exam period. The extension applies to the main reading rooms and the group study annex. Students are reminded that ID cards are required for late entry after 8pm.",
      category: "academic",
      featured: false,
    },
    {
      title: "New direct coach service links Oran and Algiers student neighbourhoods",
      excerpt:
        "A weekend coach service now connects student housing areas in Oran with Algiers, cutting a common multi-transfer trip down to one leg.",
      content:
        "Students travelling between Oran and Algiers for embassy appointments or weekend visits now have a more direct option. A new weekend coach route connects the two cities' main student housing areas without the transfers previously required. Several students in the AZSA community have already used the service and shared their experience in the community feed.",
      category: "community",
      featured: false,
    },
  ];

  await db.insert(schema.newsArticles).values(
    newsData.map((n) => ({
      title: n.title,
      slug: slugify(n.title),
      excerpt: n.excerpt,
      content: n.content,
      category: n.category,
      authorId: byEmail("admin@azsa.dz").id,
      status: "published" as const,
      featured: n.featured,
      publishedAt: new Date(),
    }))
  );

  // ---- Announcements ---------------------------------------------------
  await db.insert(schema.announcements).values([
    {
      title: "Passport renewal appointments now bookable online",
      content:
        "Students needing passport renewal can now book an appointment slot online instead of queueing in person. Links and instructions were sent to registered emails.",
      audience: "students",
      pinned: true,
      publishedById: byEmail("embassy@azsa.dz").id,
    },
    {
      title: "Emergency contact list updated for 2026/2027 academic year",
      content:
        "The embassy's emergency contact list has been refreshed. Please make sure your profile has an up-to-date phone number so the office can reach you if needed.",
      audience: "all",
      pinned: false,
      publishedById: byEmail("embassy@azsa.dz").id,
    },
  ]);

  // ---- Opportunities ----------------------------------------------------
  await db.insert(schema.opportunities).values([
    {
      title: "TU Delft Excellence Scholarship — Aerospace Engineering MSc",
      type: "scholarship" as const,
      description:
        "Fully funded master's scholarship for outstanding international applicants to TU Delft's Aerospace Engineering programme. Covers tuition and a living stipend.",
      deadline: new Date("2026-12-01"),
      link: "https://www.tudelft.nl/onderwijs/praktische-zaken/scholarships",
      postedById: byEmail("admin@azsa.dz").id,
      status: "published" as const,
    },
    {
      title: "Summer research internship — Faculty of Mechanical Engineering, USTO-MB",
      type: "internship" as const,
      description:
        "Paid summer research placement supporting a composite-materials testing project. Open to 3rd and 4th-year engineering students.",
      deadline: new Date("2027-03-15"),
      postedById: byEmail("admin@azsa.dz").id,
      status: "published" as const,
    },
  ]);

  // ---- Resources ----------------------------------------------------------
  await db.insert(schema.resources).values([
    {
      title: "Renewing your Algerian residence permit (carte de séjour)",
      category: "visa",
      description:
        "Step-by-step guide covering required documents, where to submit them in each wilaya, and typical processing times.",
      createdById: byEmail("embassy@azsa.dz").id,
    },
    {
      title: "Finding student housing in Oran and Algiers",
      category: "housing",
      description:
        "Community-sourced list of trusted landlords and agencies, plus a checklist of what to check before signing a lease.",
      createdById: byEmail("farai.ndlovu@azsa.dz").id,
    },
    {
      title: "Registering with a local clinic for routine healthcare",
      category: "healthcare",
      description: "How to register with a conventionné clinic near your university and what it typically costs.",
      createdById: byEmail("embassy@azsa.dz").id,
    },
  ]);

  // ---- Events ---------------------------------------------------------
  const eventsData = [
    {
      title: "AZSA Welcome Mixer — New Arrivals 2026",
      description:
        "An informal evening to welcome students who arrived this year, meet current AZSA members, and get the practical questions out of the way.",
      category: "social",
      cityId: oran.id,
      location: "Community Hall, Oran",
      organizerName: "AZSA Community Team",
      capacity: 80,
      startAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12),
      status: "published" as const,
    },
    {
      title: "Study Skills Workshop: Surviving Exam Season in French",
      description:
        "A practical workshop on note-taking, exam vocabulary, and time management for students studying in their third language.",
      category: "academic",
      cityId: constantine.id,
      location: "Faculty of Sciences, Room B2",
      organizerName: "Rutendo Chikafu",
      capacity: 40,
      startAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20),
      status: "published" as const,
    },
    {
      title: "Zimbabwe Independence Day Gathering",
      description: "A community celebration with food, music, and short reflections from students across different cities.",
      category: "cultural",
      cityId: algiers.id,
      location: "Embassy grounds, Algiers",
      organizerName: "Embassy Student Affairs Office",
      capacity: 150,
      startAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60),
      status: "published" as const,
    },
  ];

  const insertedEvents = await db
    .insert(schema.events)
    .values(
      eventsData.map((e) => ({
        title: e.title,
        slug: slugify(e.title),
        description: e.description,
        category: e.category,
        cityId: e.cityId,
        location: e.location,
        organizerName: e.organizerName,
        capacity: e.capacity,
        startAt: e.startAt,
        status: e.status,
        createdById: byEmail("admin@azsa.dz").id,
      }))
    )
    .returning();

  await db.insert(schema.eventRegistrations).values([
    { eventId: insertedEvents[0].id, userId: byEmail("chiedza.mutasa@azsa.dz").id },
    { eventId: insertedEvents[0].id, userId: byEmail("tinashe.gwenzi@azsa.dz").id },
    { eventId: insertedEvents[1].id, userId: byEmail("chiedza.mutasa@azsa.dz").id },
  ]);

  // ---- Community posts, comments, likes ------------------------------------
  const postsData = [
    {
      author: "tanaka.moyo@azsa.dz",
      topic: "academic",
      content:
        "Does anyone have last year's fluid mechanics past papers from Prof. Benali's section? Happy to share my thermodynamics notes in exchange.",
    },
    {
      author: "chiedza.mutasa@azsa.dz",
      topic: "housing",
      content:
        "Just signed a lease near the Constantine campus after 3 weeks of searching — happy to share the checklist I used if it helps anyone else house-hunting right now.",
    },
    {
      author: "tinashe.gwenzi@azsa.dz",
      topic: "social",
      content:
        "We're putting together a 5-a-side team in Annaba for the weekend league. Need 2 more players, all levels welcome!",
    },
  ];

  const insertedPosts = await db
    .insert(schema.posts)
    .values(
      postsData.map((p) => ({
        authorId: byEmail(p.author).id,
        content: p.content,
        topic: p.topic,
      }))
    )
    .returning();

  await db.insert(schema.comments).values([
    {
      postId: insertedPosts[0].id,
      authorId: byEmail("rutendo.chikafu@azsa.dz").id,
      content: "I have the 2024 set, will DM you.",
    },
    {
      postId: insertedPosts[1].id,
      authorId: byEmail("tanaka.moyo@azsa.dz").id,
      content: "Yes please, could really use that checklist.",
    },
  ]);

  await db.insert(schema.likes).values([
    { postId: insertedPosts[0].id, userId: byEmail("rutendo.chikafu@azsa.dz").id },
    { postId: insertedPosts[1].id, userId: byEmail("tanaka.moyo@azsa.dz").id },
    { postId: insertedPosts[1].id, userId: byEmail("farai.ndlovu@azsa.dz").id },
    { postId: insertedPosts[2].id, userId: byEmail("chiedza.mutasa@azsa.dz").id },
  ]);

  // Keep denormalised like/comment counters in sync with what we just inserted.
  for (const post of insertedPosts) {
    const [{ count: likeCount }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(schema.likes)
      .where(eq(schema.likes.postId, post.id));
    const [{ count: commentCount }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(schema.comments)
      .where(eq(schema.comments.postId, post.id));

    await db
      .update(schema.posts)
      .set({ likeCount, commentCount })
      .where(eq(schema.posts.id, post.id));
  }

  console.log("Seed complete.");
  console.log("Demo login: admin@azsa.dz / embassy@azsa.dz / tanaka.moyo@azsa.dz — password: Password123!");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
