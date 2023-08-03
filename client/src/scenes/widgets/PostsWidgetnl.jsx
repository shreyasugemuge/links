import { useEffect } from "react";
import { setPosts } from "state";
import { useDispatch, useSelector } from "react-redux";
import PostWidgetnl from "./PostWidgetnl"; // Import the not-logged-in version of the component

const PostsWidgetnl = () => {

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  
  const getPosts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "https://linksbynk.com"}/posts`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    getPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sort posts by createdAt date in descending order (latest first)
  const sortedPosts = posts
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      {sortedPosts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          url,
          picturePath,
          userPicturePath,
          createdAt,
        }) => {
          return (
            <PostWidgetnl
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              url={url}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              createdAt={createdAt}
            />
          );
        }
      )}
    </>
  );
};

export default PostsWidgetnl;
