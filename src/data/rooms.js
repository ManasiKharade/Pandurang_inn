/* AC Double Bed Room Images */
import ac1 from "../assets/images/rooms/ACroom/AC1.jpeg";
import ac2 from "../assets/images/rooms/ACroom/AC2.jpeg";
import ac3 from "../assets/images/rooms/ACroom/AC3.jpeg";
import ac4 from "../assets/images/rooms/ACroom/AC4.jpeg";
import ac5 from "../assets/images/rooms/ACroom/AC5.jpeg";
import ac6 from "../assets/images/rooms/ACroom/AC6.jpeg";
import ac7 from "../assets/images/rooms/ACroom/AC7.jpeg";
import ac8 from "../assets/images/rooms/ACroom/AC8.jpeg";
import ac9 from "../assets/images/rooms/ACroom/AC9.jpeg";
import ac10 from "../assets/images/rooms/ACroom/AC10.jpeg";
import ac12 from "../assets/images/rooms/ACroom/AC12.jpeg";

/* AC Family Room Images */
import f1 from "../assets/images/rooms/family/F1.jpeg";
import f2 from "../assets/images/rooms/family/F2.jpeg";
import f3 from "../assets/images/rooms/family/F3.jpeg";
import f4 from "../assets/images/rooms/family/F4.jpeg";
import f5 from "../assets/images/rooms/family/F5.jpeg";
import f6 from "../assets/images/rooms/family/F6.jpeg";
import f7 from "../assets/images/rooms/family/F7.jpeg";
import f8 from "../assets/images/rooms/family/F8.jpeg";
import f9 from "../assets/images/rooms/family/F9.jpeg";

import d1 from "../assets/images/rooms/Dormitory/d1.jpeg";

const rooms = [
  {
    id: 1,
    name: "AC Double Bed Room",
    category: "AC Double",
    price: "Best Rate Guaranteed",
    size: "220 sq.ft",
    occupancy: "1–2 Guests",
    bed: "1 Double Bed",
    bestFor: "Couples / 1–2 guests",

    description:
      "A comfortable air-conditioned room thoughtfully designed for couples and small families. Enjoy a relaxing stay with modern amenities, a cozy atmosphere and all the essential comforts you need in Pandharpur.",

    amenities: [
      "Air Conditioning",
      "Double Bed",
      "Attached Bathroom",
      "TV",
      "Wi-Fi",
      "Drinking Water",
      "Daily Housekeeping",
      "Spacious Wardrobe",
    ],

    images: [ac1, ac2, ac3, ac4, ac5, ac6, ac7, ac8, ac9, ac10, ac12],
  },

  {
    id: 2,
    name: "AC Family Room",
    category: "AC Family",
    price: "Best Rate Guaranteed",
    size: "350 sq.ft",
    occupancy: "3–4 Guests",
    bed: "Multiple Beds",
    bestFor: "Families / 3–4 guests",

    description:
      "A spacious and comfortable room designed for families travelling together. With convenient amenities, comfortable bedding and a welcoming atmosphere, it provides everything you need for a pleasant family stay in Pandharpur.",

    amenities: [
      "Air Conditioning",
      "Multiple Beds",
      "Attached Bathroom",
      "TV",
      "Wi-Fi",
      "Drinking Water",
      "Spacious for Family Stay",
      "Daily Housekeeping",
    ],

    images: [f1, f2, f3, f4, f5, f6, f7, f8, f9],
  },
  {
    id: 3,
    name: "Dormitory",
    category: "Dormitory",
    price: "Best Rate Guaranteed",
    size: "Shared Space",
    occupancy: "10–20 Guests",
    bed: "Single Beds (Shared)",
    bestFor: "Pilgrims / Groups / Budget Travelers",

    description:
      "Our spacious dormitory offers affordable shared accommodation for pilgrims, groups, and budget-conscious travelers. Clean, well-maintained, and equipped with all essential amenities, it's the perfect choice for those seeking comfort without compromise during their visit to Pandharpur.",

    amenities: [
      "Single Beds",
      "Shared Bathroom",
      "Locker Facility",
      "Fan / Ventilation",
      "Drinking Water",
      "Daily Housekeeping",
      "24/7 Security",
      "Budget Friendly",
    ],

    images: [d1],
  },
];

export default rooms;