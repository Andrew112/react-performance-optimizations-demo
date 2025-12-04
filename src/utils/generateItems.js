 export const generateItems = () => {
  return Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    description: "This is a description",
    category: i % 2 === 0 ? "even" : "odd",
    image: "https://via.placeholder.com/100"
  }));
};
