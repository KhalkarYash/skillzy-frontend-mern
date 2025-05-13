const CourseHomeCard = ({ author, imageLink, title }) => {
  return (
    <div className="h-68 w-70 rounded-lg shadow-md hover:shadow-lg overflow-hidden text-center transform hover:-translate-y-1 duration-200">
      <div className="h-44">
        <img
          className="h-full w-full object-cover"
          src={imageLink}
          alt={title}
        />
      </div>
      <div className="text-xl px-2 font-bold">{title}</div>
      <div className="text-sm px-2 font-bold">{author}</div>
    </div>
  );
};

export default CourseHomeCard;
