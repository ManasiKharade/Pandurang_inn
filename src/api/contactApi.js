import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../firebase/firebase";
import { ENQUIRY_TYPES, isValidEnquiryType } from "../constants/enquiryTypes";

const ENQUIRIES_COLLECTION = "enquiries";
const MOCK_ENQUIRIES_KEY = "pandurang_inn_mock_enquiries";

// Helper to calculate mock dates relative to current time
function getSeedDate(daysAgo, hoursAgo = 0) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
}

// Default seed data is empty for production - only real user enquiries will be displayed
const SEED_DATA = [];

// Load and parse local enquiries, wrapping dates in Firestore-like Timestamp interface
function getMockEnquiries() {
  const localData = localStorage.getItem(MOCK_ENQUIRIES_KEY);
  if (!localData) {
    localStorage.setItem(MOCK_ENQUIRIES_KEY, JSON.stringify([]));
    return [];
  }
  try {
    const parsed = JSON.parse(localData);
    // If old demo items exist (id starts with 'enq-1'..'enq-10'), filter them out
    const realOnly = parsed.filter((item) => !/^enq-\d+$/.test(item.id));
    if (realOnly.length !== parsed.length) {
      localStorage.setItem(MOCK_ENQUIRIES_KEY, JSON.stringify(realOnly));
    }
    return parseMockItems(realOnly);
  } catch (e) {
    localStorage.setItem(MOCK_ENQUIRIES_KEY, JSON.stringify([]));
    return [];
  }
}

function parseMockItems(items) {
  // Sort newest first
  return items.map((item) => {
    let rawDate = new Date();
    if (item.createdAt) {
      if (typeof item.createdAt === "string") {
        rawDate = new Date(item.createdAt);
      } else if (item.createdAt.seconds) {
        rawDate = new Date(item.createdAt.seconds * 1000);
      } else {
        rawDate = new Date(item.createdAt);
      }
    }
    return {
      ...item,
      createdAt: {
        toDate: () => rawDate,
        seconds: Math.floor(rawDate.getTime() / 1000),
        nanoseconds: 0,
      },
    };
  }).sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
}

function saveMockEnquiries(enquiries) {
  // Strip off the toDate() function to make clean JSON
  const clean = enquiries.map(({ id, name, email, phone, message, type, status, createdAt }) => {
    let dateStr = new Date().toISOString();
    if (createdAt) {
      if (typeof createdAt.toDate === "function") {
        dateStr = createdAt.toDate().toISOString();
      } else {
        dateStr = new Date(createdAt).toISOString();
      }
    }
    return { id, name, email, phone, message, type, status, createdAt: dateStr };
  });
  localStorage.setItem(MOCK_ENQUIRIES_KEY, JSON.stringify(clean));
}

function requireDb() {
  if (!isFirebaseConfigured || !db) {
    throw new Error(
      "Firebase isn't connected yet. Add your project's values to .env (see .env.example) to enable this."
    );
  }
  return db;
}

function saveLocalEnquiry(cleanData) {
  const items = getMockEnquiries();
  const newEnquiry = {
    id: "enq-" + Math.random().toString(36).substr(2, 9),
    ...cleanData,
    createdAt: new Date().toISOString(),
  };
  const updated = [newEnquiry, ...items];
  saveMockEnquiries(updated);
  return newEnquiry.id;
}

/**
 * Called from the public Contact form or manual admin addition.
 * Saves a new enquiry to Firestore (or LocalStorage fallback) with status "new".
 */
export async function submitEnquiry({ name, email, phone, message, type }) {
  const cleanData = {
    name,
    email,
    phone,
    message,
    type: isValidEnquiryType(type) ? type : ENQUIRY_TYPES.GENERAL,
    status: "new",
  };

  if (!isFirebaseConfigured || !db) {
    return saveLocalEnquiry(cleanData);
  }

  try {
    const docRef = await addDoc(collection(db, ENQUIRIES_COLLECTION), {
      ...cleanData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    return saveLocalEnquiry(cleanData);
  }
}

/**
 * Called from the Admin dashboard.
 * Returns enquiries newest-first.
 */
export async function getEnquiries() {
  if (!isFirebaseConfigured || !db) {
    return getMockEnquiries();
  }

  try {
    const q = query(collection(db, ENQUIRIES_COLLECTION), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    return getMockEnquiries();
  }
}

/**
 * Update an enquiry's status, e.g. "new" -> "read" -> "resolved".
 */
export async function updateEnquiryStatus(id, status) {
  if (!isFirebaseConfigured || !db) {
    const items = getMockEnquiries();
    const updated = items.map((e) => (e.id === id ? { ...e, status } : e));
    saveMockEnquiries(updated);
    return;
  }

  try {
    const enquiryRef = doc(db, ENQUIRIES_COLLECTION, id);
    await updateDoc(enquiryRef, { status });
  } catch (error) {
    const items = getMockEnquiries();
    const updated = items.map((e) => (e.id === id ? { ...e, status } : e));
    saveMockEnquiries(updated);
  }
}

/**
 * Permanently delete an enquiry.
 */
export async function deleteEnquiry(id) {
  if (!isFirebaseConfigured || !db) {
    const items = getMockEnquiries();
    const updated = items.filter((e) => e.id !== id);
    saveMockEnquiries(updated);
    return;
  }

  try {
    const enquiryRef = doc(db, ENQUIRIES_COLLECTION, id);
    await deleteDoc(enquiryRef);
  } catch (error) {
    const items = getMockEnquiries();
    const updated = items.filter((e) => e.id !== id);
    saveMockEnquiries(updated);
  }
}