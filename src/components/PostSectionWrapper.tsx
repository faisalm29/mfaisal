const PostSectionWrapper = ({
  children,
}: {
  children: Array<React.ReactNode>;
}) => {
  return (
    <div>
      <h2 className="text-secondary-200 mb-6 font-bold">All Posts</h2>
      {children}
    </div>
  );
};
export default PostSectionWrapper;
