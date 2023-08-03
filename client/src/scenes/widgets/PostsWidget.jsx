import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import PostWidgetnl from "./PostWidgetnl"; // Import the not-logged-in version of the component


const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await fetch(
      `${process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "https://linksbynk.com"}/posts`,
      {
        method: "GET",
        headers: headers,
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    if (!userId) return; // Exit if userId is not defined
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await fetch(
      `${process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "https://linksbynk.com"}/posts/${userId}/posts`,
      {
        method: "GET",
        headers: headers,
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile && userId) {
      getUserPosts();
    } else {
      getPosts();
    }
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
            likes,
            comments,
            createdAt,
          }) => {
            // Decide which component to use based on whether the user is logged in
            const PostComponent = PostWidget;
  
            return (
              <PostComponent
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                description={description}
                url={url}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
                createdAt={createdAt}
              />
            );
          }
        )}
      </>
    );
  };
  
  export default PostsWidget;