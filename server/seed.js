/**
 * Seed Script — admin user + Aangan menu items
 * Run from server folder: npm run seed
 */
require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Food = require("./models/Food");
const Banner = require("./models/Banner");
const connectDB = require("./config/db");

const seedAdmin = async () => {
  await connectDB();

  const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

    await User.create({
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });
    console.log("✅ Admin user created");
  } else {
    console.log("ℹ️  Admin user already exists");
  }

  const foodCount = await Food.countDocuments();
  if (foodCount === 0) {
    const sampleFoods = [
      {
        name: "Chicken Biryani",
        description: "Aromatic rice with tender chicken and exotic spices",
        price: 360,
        category: "lunch",
      },
      {
        name: "Butter Chicken",
        description: "Creamy tomato curry with tender chicken",
        price: 280,
        category: "dinner",
      },
      {
        name: "Masala Dosa",
        description: "Crispy crepe with spiced potato filling",
        price: 180,
        category: "breakfast",
      },
      {
        name: "Paneer Tikka",
        description: "Grilled cottage cheese with aromatic spices",
        price: 250,
        category: "snacks",
      },
      {
        name: "Dal Makhani",
        description: "Creamy black lentils slow-cooked to perfection",
        price: 230,
        category: "dinner",
      },
      {
        name: "Aloo Paratha",
        description: "Whole wheat flatbread stuffed with spiced potatoes",
        price: 120,
        category: "breakfast",
      },
      {
        name: "Samosa",
        description: "Crispy pastry with spiced potato filling",
        price: 80,
        category: "snacks",
      },
      {
        name: "Vegetable Biryani",
        description: "Fragrant rice with mixed vegetables",
        price: 280,
        category: "lunch",
      },
    ];

    await Food.insertMany(sampleFoods);
    console.log("✅ Menu items seeded");
  } else {
    console.log("ℹ️  Food items already exist");
  }

  const bannerCount = await Banner.countDocuments();
  if (bannerCount === 0) {
    await Banner.insertMany([
      {
        image: "",
        title: "Authentic Indian Cuisine",
        subtitle: "Experience the rich flavors of India at Aangan",
        order: 0,
      },
      {
        image: "",
        title: "Order Online, Enjoy at Home",
        subtitle: "Fresh food delivered to your doorstep",
        order: 1,
      },
    ]);
    console.log("✅ Banners seeded (add images via admin later)");
  }

  console.log("🎉 Seeding complete!");
  process.exit(0);
};

seedAdmin();
