export const BlogList = ( data:any) => {

  return (
    <div className="p-4 container mx-auto">
        {JSON.stringify(data, null, 3)}
      </div>
  );
};
