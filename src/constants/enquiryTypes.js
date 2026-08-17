// Central list of enquiry types. The "type" query param (e.g. /?type=room#contact)
// drives which one the Contact form pre-selects, and the admin dashboard
// filters/tags enquiries using these same keys.

export const ENQUIRY_TYPES = {
  GENERAL: "general",
  STAY: "stay",
  EVENT: "event",
  DORMITORY: "dormitory",
};

export const ENQUIRY_TYPE_LABELS = {
  [ENQUIRY_TYPES.GENERAL]: "General Enquiry",
  [ENQUIRY_TYPES.STAY]: "Book Your Stay",
  [ENQUIRY_TYPES.EVENT]: "Event Enquiry",
  [ENQUIRY_TYPES.DORMITORY]: "Book Your Dormitory",
};

export const ENQUIRY_TYPE_LIST = Object.values(ENQUIRY_TYPES);

export function isValidEnquiryType(type) {
  return ENQUIRY_TYPE_LIST.includes(type);
}