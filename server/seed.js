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

  // Utilities for creating local placeholder images and uploads directory
  const fs = require("fs");
  const path = require("path");

  const uploadsDir = path.join(__dirname, "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Small 1x1 PNG (transparent) base64 as a lightweight placeholder
  const PLACEHOLDER_PNG_BASE64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";

  const createPlaceholderImage = (dest) =>
    new Promise((resolve, reject) => {
      const buffer = Buffer.from(PLACEHOLDER_PNG_BASE64, "base64");
      fs.writeFile(dest, buffer, (err) => (err ? reject(err) : resolve()));
    });

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
    console.log(" Admin user created");
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

    // Map sample food names to client asset filenames
    const assetMap = {
      "Chicken Biryani": "chicken-biryani.jpg",
      "Butter Chicken": "wings.jpg",
      "Masala Dosa": "masala-dosa.jpg",
      "Paneer Tikka": "panner-tikka.webp",
      "Dal Makhani": "DAL-MAKHANI.jpg",
      "Aloo Paratha": "alooparatha.jpg",
      "Samosa": "samosa.webp",
      "Vegetable Biryani": "pizza.webp",
    };

    // For each sample food, copy the matching client asset into uploads if available
    for (const item of sampleFoods) {
      try {
        const slug = item.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9\-]/g, "");
        // pick the mapped asset or fallback to placeholder
        const assetFile = assetMap[item.name];
        const filename = `${Date.now()}-${slug}${assetFile ? path.extname(assetFile) : '.png'}`;
        const dest = path.join(uploadsDir, filename);

        if (assetFile) {
          const clientAssetPath = path.join(__dirname, "..", "client", "src", "assets", assetFile);
          if (fs.existsSync(clientAssetPath)) {
            fs.copyFileSync(clientAssetPath, dest);
            item.image = `/uploads/${filename}`;
            continue;
          }
        }

        // fallback: create local placeholder image
        await createPlaceholderImage(dest);
        item.image = `/uploads/${filename}`;
      } catch (err) {
        console.warn("Failed to set image for", item.name, err.message || err);
        item.image = "";
      }
    }

    await Food.insertMany(sampleFoods);
    console.log("✅ Menu items seeded");
  } else {
    console.log("ℹ️  Food items already exist");

    // If foods already exist, ensure they have images by copying from client assets when missing
    try {
      const existingFoods = await Food.find();
      const assetMap = {
        "Chicken Biryani": "chicken-biryani.jpg",
        "Butter Chicken": "wings.jpg",
        "Masala Dosa": "masala-dosa.jpg",
        "Paneer Tikka": "panner-tikka.webp",
        "Dal Makhani": "DAL-MAKHANI.jpg",
        "Aloo Paratha": "alooparatha.jpg",
        "Samosa": "samosa.webp",
        "Vegetable Biryani": "pizza.webp",
      };

      for (const food of existingFoods) {
        if (food.image) continue;
        const assetFile = assetMap[food.name];
        if (!assetFile) continue;
        const clientAssetPath = path.join(__dirname, "..", "client", "src", "assets", assetFile);
        if (!fs.existsSync(clientAssetPath)) continue;
        const slug = food.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
        const filename = `${Date.now()}-${slug}${path.extname(assetFile)}`;
        const dest = path.join(uploadsDir, filename);
        try {
          fs.copyFileSync(clientAssetPath, dest);
          food.image = `/uploads/${filename}`;
          await food.save();
          console.log(`Updated image for: ${food.name}`);
        } catch (err) {
          console.warn(`Failed to update image for ${food.name}:`, err.message || err);
        }
      }
    } catch (err) {
      console.warn("Error updating existing food images:", err.message || err);
    }
  }

  const bannerCount = await Banner.countDocuments();
  if (bannerCount === 0) {
    const sampleBanners = [
      {
        title: "Authentic Indian Cuisine",
        subtitle: "Experience the rich flavors of India at Aangan",
        order: 0,
      },
      {
        title: "Order Online, Enjoy at Home",
        subtitle: "Fresh food delivered to your doorstep",
        order: 1,
      },
    ];

    // map banners to client asset files
    const bannerAssetMap = {
      "Authentic Indian Cuisine": "Aangan.png",
      "Order Online, Enjoy at Home": "Baruwa.png",
    };

    // For each sample banner, copy the client asset if available, otherwise create a placeholder
    for (let i = 0; i < sampleBanners.length; i++) {
      const banner = sampleBanners[i];
      const assetFile = bannerAssetMap[banner.title];
      const slug = `banner-${i}`;
      const ext = assetFile ? path.extname(assetFile) : ".png";
      const filename = `${Date.now()}-${slug}${ext}`;
      const dest = path.join(uploadsDir, filename);

      if (assetFile) {
        const clientAssetPath = path.join(__dirname, "..", "client", "src", "assets", assetFile);
        if (fs.existsSync(clientAssetPath)) {
          try {
            fs.copyFileSync(clientAssetPath, dest);
            banner.image = `/uploads/${filename}`;
            continue;
          } catch (err) {
            console.warn(`Failed copying banner asset ${assetFile}:`, err.message || err);
          }
        }
      }

      // fallback to placeholder
      try {
        await createPlaceholderImage(dest);
        banner.image = `/uploads/${filename}`;
      } catch (err) {
        console.warn("Failed to create local banner placeholder:", err.message || err);
        banner.image = "";
      }
    }

    await Banner.insertMany(sampleBanners);
    console.log("✅ Banners seeded (assets copied when available)");
  }
  else {
    // Update existing banners that lack an image using client assets when possible
    try {
      const bannerAssetMap = {
        "Authentic Indian Cuisine": "Aangan.png",
        "Order Online, Enjoy at Home": "Baruwa.png",
      };
      const existingBanners = await Banner.find();
      for (const b of existingBanners) {
        // overwrite existing banner images to use local client assets when available
        const assetFile = bannerAssetMap[b.title];
        if (!assetFile) continue;
        const clientAssetPath = path.join(__dirname, "..", "client", "src", "assets", assetFile);
        if (!fs.existsSync(clientAssetPath)) continue;
        const slug = b.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
        const filename = `${Date.now()}-${slug}${path.extname(assetFile)}`;
        const dest = path.join(uploadsDir, filename);
        try {
          fs.copyFileSync(clientAssetPath, dest);
          b.image = `/uploads/${filename}`;
          await b.save();
          console.log(`Updated banner image for: ${b.title}`);
        } catch (err) {
          console.warn(`Failed to update banner ${b.title}:`, err.message || err);
        }
      }
    } catch (err) {
      console.warn("Error updating existing banner images:", err.message || err);
    }
  }

  console.log("Seeding complete!");
  process.exit(0);
};

seedAdmin();
