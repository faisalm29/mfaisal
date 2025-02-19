const PostSectionWrapper = ({
  children,
}: {
  children: Array<React.ReactNode>;
}) => {
  return (
    <div>
      <h1>All Posts</h1>
      {children}
    </div>
  );
};
export default PostSectionWrapper;
