const PostSectionWrapper = ({
  children,
  title,
}: {
  children: Array<React.ReactNode> | React.ReactNode;
  title: string;
}) => {
  return (
    <div>
      <h2 className="text-secondary-200 mb-6 font-bold">{title}</h2>
      {children}
    </div>
  );
};
export default PostSectionWrapper;
