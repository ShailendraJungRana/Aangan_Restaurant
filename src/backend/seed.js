/**
 * Seed Script
 * Creates the default admin user if it doesn't already exist.
 * Run with: node seed.js
 */
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Food = require("./models/Food");
const connectDB = require("./config/db");

const seedAdmin = async () => {
  await connectDB();

  // --- Seed Admin ---
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
    console.log("✅ Admin user created successfully");
  } else {
    console.log("ℹ️  Admin user already exists");
  }

  // --- Seed Sample Foods ---
  const foodCount = await Food.countDocuments();
  if (foodCount === 0) {
    const sampleFoods = [
      {
        name: "Margherita Pizza",
        description: "Classic delight with 100% real mozzarella cheese on a hand-tossed crust with our signature tomato basil sauce.",
        price: 12.99,
        category: "Pizza",
        image: "",
      },
      {
        name: "Pepperoni Pizza",
        description: "Loaded with spicy pepperoni slices, gooey mozzarella, and our house-made marinara sauce.",
        price: 14.99,
        category: "Pizza",
        image: "",
      },
      {
        name: "Classic Cheeseburger",
        description: "Juicy beef patty topped with melted cheddar, fresh lettuce, tomato, and our special burger sauce.",
        price: 9.99,
        category: "Burger",
        image: "",
      },
      {
        name: "Smoky BBQ Burger",
        description: "Double smashed patty with crispy bacon, caramelized onions, and smoky barbecue glaze.",
        price: 13.49,
        category: "Burger",
        image: "",
      },
      {
        name: "Caesar Salad",
        description: "Crisp romaine lettuce, parmesan shavings, croutons, and creamy Caesar dressing.",
        price: 8.49,
        category: "Salad",
        image: "",
      },
      {
        name: "Chicken Tikka Masala",
        description: "Tender chicken chunks simmered in a rich, creamy tomato-spice curry. Served with basmati rice.",
        price: 15.99,
        category: "Indian",
        image: "",
      },
      {
        name: "Pad Thai Noodles",
        description: "Stir-fried rice noodles with shrimp, peanuts, bean sprouts, and tamarind sauce.",
        price: 13.99,
        category: "Asian",
        image: "",
      },
      {
        name: "Chocolate Lava Cake",
        description: "Warm, rich chocolate cake with a molten center, served with vanilla ice cream.",
        price: 7.99,
        category: "Dessert",
        image: "",
      },
      {
        name: "Mango Smoothie",
        description: "Fresh tropical mango blended with yogurt and a hint of honey.",
        price: 5.49,
        category: "Drinks",
        image: "",
      },
      {
        name: "Iced Caramel Latte",
        description: "Espresso blended with milk and caramel syrup over ice. Rich and refreshing.",
        price: 4.99,
        category: "Drinks",
        image: "",
      },
    ];

    await Food.insertMany(sampleFoods);
    console.log("✅ Sample food items seeded successfully");
  } else {
    console.log("ℹ️  Food items already exist, skipping seed");
  }

  console.log("🎉 Seeding complete!");
  process.exit(0);
};

seedAdmin();
