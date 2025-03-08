export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-Us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
