/**
 * Seed the database with Labour Chowk's realistic demo data.
 * Run with:  npm run db:seed   (after `npm run db:push`)
 */
import { PrismaClient } from "@prisma/client";
import { SERVICES } from "../src/data/services";
import { CITIES } from "../src/data/cities";
import { WORKERS } from "../src/data/workers";
import { REVIEWS } from "../src/data/reviews";
import { BOOKINGS } from "../src/data/bookings";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Labour Chowk database…");

  // Order matters for FK relations. Clear existing rows first.
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.complaint.deleteMany();
  await prisma.worker.deleteMany();
  await prisma.service.deleteMany();
  await prisma.city.deleteMany();

  // Services
  await prisma.service.createMany({
    data: SERVICES.map((s) => ({
      slug: s.slug,
      name: s.name,
      tagline: s.tagline,
      description: s.description,
      icon: s.icon,
      priceFrom: s.priceFrom,
      priceModel: s.priceModel,
      popular: s.popular,
    })),
  });
  console.log(`  ✓ ${SERVICES.length} services`);

  // Cities
  await prisma.city.createMany({
    data: CITIES.map((c) => ({
      slug: c.slug,
      name: c.name,
      state: c.state,
      workerCount: c.workerCount,
    })),
  });
  console.log(`  ✓ ${CITIES.length} cities`);

  // Workers
  for (const w of WORKERS) {
    await prisma.worker.create({
      data: {
        id: w.id,
        name: w.name,
        photo: w.photo,
        profession: w.profession,
        serviceSlug: w.serviceSlug,
        skills: w.skills,
        about: w.about,
        rating: w.rating,
        reviewCount: w.reviewCount,
        experienceYears: w.experienceYears,
        price: w.price,
        priceModel: w.priceModel,
        city: w.city,
        area: w.area,
        distanceKm: w.distanceKm,
        availability: w.availability,
        verification: w.verification,
        jobsDone: w.jobsDone,
        workPhotos: w.workPhotos,
        serviceAreas: w.serviceAreas,
        languages: w.languages,
        responseTime: w.responseTime,
        joinedYear: w.joinedYear,
      },
    });
  }
  console.log(`  ✓ ${WORKERS.length} workers`);

  // Bookings
  for (const b of BOOKINGS) {
    await prisma.booking.create({
      data: {
        id: b.id,
        workerId: b.workerId,
        workerName: b.workerName,
        workerPhoto: b.workerPhoto,
        service: b.service,
        customerName: b.customerName,
        status: b.status,
        date: b.date,
        timeSlot: b.timeSlot,
        address: b.address,
        city: b.city,
        estimatedPrice: b.estimatedPrice,
        priceModel: b.priceModel,
        notes: b.notes,
      },
    });
  }
  console.log(`  ✓ ${BOOKINGS.length} bookings`);

  // Reviews
  for (const r of REVIEWS) {
    await prisma.review.create({
      data: {
        id: r.id,
        workerId: r.workerId,
        customerName: r.customerName,
        customerCity: r.customerCity,
        rating: r.rating,
        text: r.text,
        service: r.service,
        status: r.status ?? "published",
      },
    });
  }
  console.log(`  ✓ ${REVIEWS.length} reviews`);

  console.log("Done ✔");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
