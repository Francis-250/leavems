export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const calculateDuration = (startDate, endDate) => {
  const days =
    Math.abs(new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
  return Math.ceil(days);
};
