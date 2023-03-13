export const PostDate = ({ dateString }: { dateString: string }) => {
  const date = new Date(dateString).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return <span className="text-sm text-gray-400 italic">{date}</span>;
};
