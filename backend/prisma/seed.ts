import prisma from "../src/config/db.js";

const products = [
  // ==================== Living Room ====================
  {
    title: "Modern Sofa",
    price: 25000,
    stock: 10,
    description: "A comfortable modern sofa with a stylish design, perfect for contemporary living rooms.",
    imageURL:
      "https://res.cloudinary.com/vaqxa9ir/image/upload/v1788999693/ecommerce/products/living-room/iahwyktw73tyvhijsjnz.jpg",
    category: "Living Room",
  },
  {
    title: "Coffee Table",
    price: 6500,
    stock: 15,
    description: "A modern coffee table with a simple elegant design for your living room.",
    imageURL:
      "https://res.cloudinary.com/vaqxa9ir/image/upload/v1788999695/ecommerce/products/living-room/c26gmic0cxfe0apfaqgr.jpg",
    category: "Living Room",
  },
  {
    title: "TV Stand",
    price: 8500,
    stock: 8,
    description: "A modern TV stand providing stylish storage and organization for your entertainment area.",
    imageURL:
      "https://res.cloudinary.com/vaqxa9ir/image/upload/v1788999696/ecommerce/products/living-room/cttpsho2cpdveuruwg0e.jpg",
    category: "Living Room",
  },

  // ==================== Bedroom ====================
  {
    title: "King Bed",
    price: 30000,
    stock: 6,
    description: "A spacious king-size bed with a modern design for a comfortable bedroom.",
    imageURL:
      "https://res.cloudinary.com/vaqxa9ir/image/upload/v1788999680/ecommerce/products/Bedroom/leoqsh2xebl5b8d6wvrg.jpg",
    category: "Bedroom",
  },
  {
    title: "Nightstand",
    price: 4500,
    stock: 12,
    description: "A compact modern nightstand with convenient storage for your bedroom essentials.",
    imageURL:
      "https://res.cloudinary.com/vaqxa9ir/image/upload/v1788999682/ecommerce/products/Bedroom/j8quxmv1jlc806qslfqn.jpg",
    category: "Bedroom",
  },
  {
    title: "Wardrobe",
    price: 18000,
    stock: 7,
    description: "A spacious modern wardrobe designed to keep your clothes organized.",
    imageURL:
      "https://res.cloudinary.com/vaqxa9ir/image/upload/v1788999684/ecommerce/products/Bedroom/uhqbwlqwextiqx52u4vk.jpg",
    category: "Bedroom",
  },

  // ==================== Office ====================
  {
    title: "Office Desk",
    price: 9000,
    stock: 10,
    description: "A modern office desk with a clean design, suitable for work and study.",
    imageURL:
      "https://res.cloudinary.com/vaqxa9ir/image/upload/v1788999703/ecommerce/products/Office/jz7ivmtig1tyicdd7bjx.jpg",
    category: "Office",
  },
  {
    title: "Office Chair",
    price: 7500,
    stock: 12,
    description: "An ergonomic office chair designed for comfortable long working sessions.",
    imageURL:
      "https://res.cloudinary.com/vaqxa9ir/image/upload/v1788999705/ecommerce/products/Office/iy0znubj9agc9fed3hjt.jpg",
    category: "Office",
  },
  {
    title: "Bookshelf",
    price: 6000,
    stock: 9,
    description: "A modern bookshelf offering practical storage for books and decorative items.",
    imageURL:
      "https://res.cloudinary.com/vaqxa9ir/image/upload/v1788999707/ecommerce/products/Office/d4q2vvenuva1yethyds3.jpg",
    category: "Office",
  },

  // ==================== Outdoor ====================
  {
    title: "Patio Sofa",
    price: 14000,
    stock: 5,
    description: "A comfortable outdoor patio sofa designed for relaxing in outdoor spaces.",
    imageURL:
      "https://res.cloudinary.com/vaqxa9ir/image/upload/v1788999710/ecommerce/products/Outdoor/bfszinbatfjtzsgsn52b.jpg",
    category: "Outdoor",
  },
  {
    title: "Outdoor Chair",
    price: 4000,
    stock: 15,
    description: "A durable and stylish outdoor chair suitable for patios and gardens.",
    imageURL:
      "https://res.cloudinary.com/vaqxa9ir/image/upload/v1788999711/ecommerce/products/Outdoor/ar12kplavf6o2acy6lqf.webp",
    category: "Outdoor",
  },
  {
    title: "Garden Table",
    price: 7000,
    stock: 8,
    description: "A practical garden table perfect for outdoor dining and gatherings.",
    imageURL:
      "https://res.cloudinary.com/vaqxa9ir/image/upload/v1788999714/ecommerce/products/Outdoor/hvxvnei3zabvqymqomyt.jpg",
    category: "Outdoor",
  },

  // ==================== Kitchen ====================
  {
    title: "Dining Table",
    price: 12000,
    stock: 7,
    description: "A modern dining table with a stylish design suitable for family meals.",
    imageURL:
      "https://res.cloudinary.com/vaqxa9ir/image/upload/v1788999687/ecommerce/products/Kitchen/iaa1v29yxicioxlbyq2j.jpg",
    category: "Kitchen",
  },
  {
    title: "Kitchen Cabinet",
    price: 16000,
    stock: 6,
    description: "A modern kitchen cabinet offering practical storage and a clean contemporary look.",
    imageURL:
      "https://res.cloudinary.com/vaqxa9ir/image/upload/v1788999689/ecommerce/products/Kitchen/gcd1pz2tz8izauqyrska.jpg",
    category: "Kitchen",
  },
  {
    title: "Bar Stool",
    price: 3500,
    stock: 14,
    description: "A modern bar stool with a comfortable design, perfect for kitchen counters.",
    imageURL:
      "https://res.cloudinary.com/vaqxa9ir/image/upload/v1788999692/ecommerce/products/Kitchen/u03a3vjuz2ileqwssx7i.jpg",
    category: "Kitchen",
  },
];

const categories = [
  "Living Room",
  "Bedroom",
  "Office",
  "Outdoor",
  "Kitchen",
];

async function main() {
  console.log("Seeding database...");

  // Create categories
  const categoryMap = new Map<string, string>();

  for (const name of categories) {
    const category = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });

    categoryMap.set(name, category.id);
  }

  // Create products
  for (const product of products) {
    const categoryId = categoryMap.get(product.category);

    if (!categoryId) {
      throw new Error(`Category not found: ${product.category}`);
    }

    await prisma.product.create({
      data: {
        title: product.title,
        price: product.price,
        stock: product.stock,
        description: product.description,
        imageURL: product.imageURL,
        categoryId,
        isAvailable: true,
      },
    });
  }

  console.log("Database seeded successfully!");
  console.log(`Created ${categories.length} categories`);
  console.log(`Created ${products.length} products`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });