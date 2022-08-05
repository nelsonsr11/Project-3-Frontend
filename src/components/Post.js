import React from "react";
import { post } from "../services/service";
// import { isAuthenticated } from "react-router-dom";
import axios from "axios";
import { get } from "../services/service";
import { deleted } from "../services/service";
// import { newId } from "../services/service";
import "./Post.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import Arrow from "@mui/icons-material/KeyboardBackspace";
import logo from "./images/logo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Post = () => {
  const [content, setContent] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [posts, setPosts] = React.useState({});
  const [refresh, setRefresh] = React.useState(false);
  // const [imgUrl, setImgUrl] = React.useState("");
  // const [loading, setLoading] = React.useState(false);
  // const [status, setStatus] = React.useState("");
  const newId = localStorage.getItem("id");
  const navigate = useNavigate();

  // const newId = localStorage.getItem("id");

  const check = async (e) => {
    e.preventDefault();
    if (!newId) {
      setStatus("Please Log In or SignUp first");
    } else if (!content) {
      setStatus("Enter a comment");
    } else {
      setContent("");
      let response = await post("/posts/create", {
        content: content,
      });
      setRefresh(!refresh);
      console.log(response);
    }
  };

  const getPost = async () => {
    let response = await get("/posts/all");
    console.log(response.data);
    setPosts(response.data);
  };

  React.useEffect(
    function () {
      getPost();
    },
    [refresh]
  );

  const like = async (postId) => {
    let response = await post(`/posts/likes/${postId}`);
    setRefresh(!refresh);
  };

  const removeComment = async (postId) => {
    try {
      let response = await deleted(`/posts/delete/${postId}`);
      setRefresh(!refresh);
    } catch (err) {
      console.error(err.message);
    }
  };

  // const handleFileUpload = async (e) => {
  //   setLoading(true);
  //   const uploadData = new FormData();
  //   uploadData.append("imageUrl", e.target.files[0]);
  //   let response = await post("/posts/add-postpicture", uploadData);
  //   console.log("moment of truth", response.data);
  //   setImgUrl(response.data.path);
  //   setLoading(false);
  // };

  return (
    <div className="post">
      <div className="arrow-team1">
        <Arrow sx={{ fontSize: 40 }} onClick={() => navigate(-1)}></Arrow>
        {/* <h3>Teams</h3> */}
        <Link to="/">
          <img width="50px" className="logo-lap" src={logo}></img>
        </Link>
      </div>
      <h1>FANPAGE</h1>
      <form onSubmit={check}>
        <textarea
          className="textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="ADD COMMENT"
        />

        <div className="bottom-post">
          <Button
            variant="contained"
            startIcon={<QuestionAnswerIcon />}
            type="submit"
          >
            ADD POST
          </Button>
        </div>
        {/* <div className="image-upload">
          <label for="file-input">
            <input type="file" onChange={handleFileUpload} id="file-input" />
            <InsertPhotoIcon />
          </label>
        </div> */}
        {/* <img src={imgUrl}></img> */}
        {/* <div class="image-upload">
          <label for="file-input">
            <img src="https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Downloads-icon.png" />
          </label>

          <input id="file-input" onChange={handleFileUpload} type="file" />
        </div> */}
        <div className="status">
          <h4>{status}</h4>
        </div>
      </form>
      {posts.length > 0 &&
        posts.map(function (post) {
          return (
            <div>
              <div className="post1">
                <div className="header">
                  <div className="user">
                    <AccountCircleIcon sx={{ fontSize: 30 }} />
                    <h3>{post.creatorId.username}</h3>
                  </div>
                  <div className="likes">
                    <h4>{post.likes.length} Likes</h4>
                  </div>
                </div>
                <div className="content">
                  <h3>{post.content}</h3>
                </div>
                <div className="image">{/* <img src={imgUrl}></img> */}</div>
                {/* <button
                onClick={() => {
                  like(post._id);
                }}
              >
                Like
              </button> */}
                <FavoriteBorderIcon
                  onClick={() => {
                    like(post._id);
                  }}
                />
                {post.creatorId._id === newId && (
                  <DeleteIcon
                    sx={{ color: red[800] }}
                    onClick={() => removeComment(post._id)}
                  >
                    Delete
                  </DeleteIcon>
                )}
              </div>
              <hr></hr>
            </div>
          );
        })}
    </div>
  );
};

export default Post;
