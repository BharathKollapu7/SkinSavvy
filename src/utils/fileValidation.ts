
export const validateImageFile = (file: File): string | null => {
  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return 'Please select a valid image file (JPG, PNG, or WebP)';
  }

  // Validate file size (5MB limit)
  if (file.size > 5 * 1024 * 1024) {
    return 'File size must be less than 5MB';
  }

  return null;
};
