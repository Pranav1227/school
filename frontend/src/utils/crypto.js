/**
 * Utility functions for password encryption and verification
 * Uses Base64 encoding/decryption to simulate encrypted passwords in static dataset
 */

// Encrypt plain text password to encrypted string
export function encryptPassword(plainPassword) {
  try {
    return btoa(plainPassword);
  } catch {
    // Fallback if special unicode characters occur
    return btoa(encodeURIComponent(plainPassword));
  }
}

// Decrypt encrypted string back to plain text
export function decryptPassword(encryptedPassword) {
  try {
    return atob(encryptedPassword);
  } catch {
    try {
      return decodeURIComponent(atob(encryptedPassword));
    } catch {
      return encryptedPassword;
    }
  }
}

// Verify if entered password matches the stored encrypted password
export function verifyPassword(enteredPassword, storedEncryptedPassword) {
  if (!enteredPassword || !storedEncryptedPassword) return false;
  // Match direct encryption or decrypt comparison
  return encryptPassword(enteredPassword) === storedEncryptedPassword ||
         enteredPassword === decryptPassword(storedEncryptedPassword);
}
