// ===============================
// Lantern Restaurant Images
// ===============================

import lantern1 from "../assets/images/dining/Lantern Multicuisine Restaurant1.png";
import lantern2 from "../assets/images/dining/Lantern Multicuisine Restaurant2.png";
import lantern3 from "../assets/images/dining/Lantern Multicuisine Restaurant3.png";
import lantern4 from "../assets/images/dining/Lantern Multicuisine Restaurant4.png";
import lantern5 from "../assets/images/dining/Lantern Multicuisine Restaurant5.png";

// ===============================
// Moonwalk Bar Images
// ===============================

import moon1 from "../assets/images/dining/Moonwalk Bar1.png";
import moon2 from "../assets/images/dining/Moonwalk Bar2.png";
import moon3 from "../assets/images/dining/Moonwalk Bar3.png";
import moon4 from "../assets/images/dining/Moonwalk Bar4.png";
import moon5 from "../assets/images/dining/Moonwalk Bar5.png";
import moon6 from "../assets/images/dining/Moonwalk Bar6.png";

// ===============================
// Dining Data
// ===============================

const dining = [
  {
    id: 1,

    name: "Lantern Multi Cuisine Restaurant",

    tagline: "Authentic Taste. Elegant Dining.",

    description:
      "Experience an exceptional dining journey at Lantern Multi Cuisine Restaurant. From authentic South Indian delicacies to North Indian, Chinese and Continental favourites, every dish is freshly prepared by our experienced chefs in an elegant and comfortable ambience.",

    button: "Explore Restaurant",

    images: [
      lantern1,
      lantern2,
      lantern3,
      lantern4,
      lantern5,
    ],

   features: [
  "Multi Cuisine",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Air Conditioned",
  "Family Friendly"
]
  },

  {
    id: 2,

    name: "Moonwalk Bar",

    tagline: "Premium Drinks. Relaxed Evenings.",

    description:
      "Relax and unwind at Moonwalk Bar with premium spirits, refreshing cocktails and a stylish atmosphere. Whether you're celebrating or simply enjoying a quiet evening, our bar offers the perfect setting with excellent service and quality beverages.",

    button: "Reserve Table",

    images: [
      moon1,
      moon2,
      moon3,
      moon4,
      moon5,
      moon6,
    ],

    features: [
  "Premium Cocktails",
  "Fine Spirits",
  "Mocktails",
  "Live Music",
  "Outdoor Seating",
  "Late Night"
]
  },
];

export default dining;