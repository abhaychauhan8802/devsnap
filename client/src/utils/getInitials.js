export const getInitials = (name) => {
  if (!name) return "";
  return name.trim().substring(0, 2);
};
