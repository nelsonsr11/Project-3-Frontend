// import React from "react";
// import { get } from "../services/service";
// import { post } from "../services/service";

// const ViewComments = () => {
//   const [posts, setPosts] = React.useState({});

//   const getPost = async () => {
//     let response = await get("/posts/all");
//     console.log(response.data);
//     setPosts(response.data);
//   };

//   React.useEffect(function () {
//     getPost();
//   }, []);

//   const like = async (postId) => {
//     let response = await post(`/posts/likes/${postId}`);
//   };
//   console.log(posts);
//   return (
//     <div>
//       {posts.length > 0 &&
//         posts.map(function (post) {
//           return (
//             <div>
//               <p>{post.content}</p>
//               <p>{post.creatorId.username}</p>
//               <p>{post.likes.length}</p>
//               <button
//                 onClick={() => {
//                   like(post._id);
//                 }}
//               >
//                 Like
//               </button>
//             </div>
//           );
//         })}
//     </div>
//   );
// };

// export default ViewComments;
