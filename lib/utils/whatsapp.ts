export const getWhatsAppUrl = (phone: string, message: string = "") => {
  // Remove non-numeric characters
  const cleanPhone = phone.replace(/\D/g, "");
  // Add 91 if it's a 10 digit number (assuming India MSME)
  const finalPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  
  return `https://wa.me/${finalPhone}?text=${encodeURIComponent(message)}`;
};

export const openWhatsApp = (phone: string, message: string = "") => {
  const url = getWhatsAppUrl(phone, message);
  window.open(url, "_blank");
};
