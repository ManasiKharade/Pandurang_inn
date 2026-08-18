import {
  FaTemperatureHigh,
  FaTshirt,
  FaClock,
  FaBed,
  FaSnowflake,
  FaLayerGroup,
  FaCoffee,
  FaParking,
  FaWifi,
} from "react-icons/fa";

const services = [
  {
    id: 1,
    title: "24 Hrs Hot & Cold Water",
    icon: FaTemperatureHigh,
    description:
      "Enjoy uninterrupted hot and cold water throughout your stay for complete comfort.",
  },

  {
    id: 2,
    title: "24 Hrs Check-in / Check-out",
    icon: FaClock,
    description:
      "Flexible check-in and check-out timings for a stress-free stay.",
  },

  {
    id: 3,
    title: "Twin & King Size Beds",
    icon: FaBed,
    description:
      "Choose from spacious twin or king-size beds for ultimate relaxation.",
  },

  {
    id: 4,
    title: "Silent Air Conditioning",
    icon: FaSnowflake,
    description:
      "Experience peaceful comfort with whisper-quiet air conditioning.",
  },

  {
    id: 5,
    title: "High Speed WiFi",
    icon: FaWifi,
    description:
      "Enjoy fast and reliable WiFi throughout your stay.",
  },

  {
    id: 6,
    title: "Tea / Coffee Maker",
    icon: FaCoffee,
    description:
      "Enjoy freshly brewed tea or coffee anytime in your room.",
  },

  {
    id: 7,
    title: "Parking",
    icon: FaParking,
    description:
      "Safe and spacious parking facilities are available for all guests.",
  },

  {
    id: 8,
    title: "Spacious Wardrobe",
    icon: FaTshirt,
    description:
      "Every room includes ample wardrobe space to keep your clothes and belongings neatly organized.",
  },
];

export default services;