export const generateSlug = (label: string) => {
  // Remove all non-alphanumeric characters except hyphens and convert to lowercase
  if (typeof label !== "string") {
    return ""; // Handle non-string input gracefully
  }

  return label
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters except - and word chars
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens};
};

export const capitalizeFirstLetter = (str: string) => {
  if (typeof str !== "string") {
    return ""; // Handle non-string input gracefully
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};
