export const sanitizeDatabaseName = (input: string): string => {
  // Define a pattern for allowed characters in the database name
  // This example allows letters, numbers, and underscores
  const allowedPattern = /^[A-Za-z0-9_]+$/;

  // Trim whitespace and convert to lowercase or any case convention you follow
  let sanitized = input.trim().toLowerCase();

  // Replace all characters not matching the allowed pattern with an underscore
  sanitized = sanitized.replace(/[^A-Za-z0-9_]/g, "_");

  // Check the length of the database name (if there's a specific requirement)
  const minLength = 3; // Minimum length of the database name
  const maxLength = 64; // Maximum length of the database name

  if (sanitized.length < minLength || sanitized.length > maxLength) {
    // If the sanitized name is too short, pad it with underscores
    sanitized = sanitized.padEnd(minLength, "_");

    // If the sanitized name is too long, truncate it
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
};
