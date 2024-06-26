import React, { useState } from "react";
import { Avatar } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPostsAction,
  likeDislikePostAction,
} from "../../redux/post_store";
import Spinner from "../../components/Spinner";

const Post = (props) => {
  const style = {
    container: {
      boxShadow: "0 0.1rem 0.5rem rgb(0, 0, 0, 0.2)",
    },
  };

  const auth = useSelector((state) => state.auth);
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const [clickedPostId, setClickedPostId] = useState("");

  const likeDislikePostHandler = async (action) => {
    setClickedPostId(props.post._id);
    await dispatch(
      likeDislikePostAction(props.post._id, auth.user._id, action)
    );
    dispatch(getAllPostsAction());
  };

  return (
    <div className="p-2 bg-white rounded-md mt-4" style={style.container}>
      <div className="flex items-center gap-4 px-2">
        <Avatar />
        <div>
          <h4>{props.post.userId.name}</h4>
          <p className="text-gray-600 text-sm">
            {moment(props.post.createdAt).fromNow()} (
            {moment(props.post.createdAt).format("lll")})
          </p>
        </div>
      </div>

      {props.post.media.mediaUrl && (
        <div className="p-3">
          {props.post.mediaType === "photo" ? (
            <img
              src={props.post.media.mediaUrl}
              alt=""
              className="w-full object-contain h-[25rem]"
            />
          ) : (
            <video controls className="w-full object-contain h-[25rem]">
              <source src={props.post.media.mediaUrl} />
            </video>
          )}
        </div>
      )}

      <div className="mt-4">
        <p className="m-2">{props.post.description}</p>
        <div className="flex items-center justify-between border-t border-gray-300 pt-2 px-2">
          <div className="cursor-pointer">
            {post.loading === true && props.post._id === clickedPostId ? (
              <Spinner color="#1b49e1" size="1rem" />
            ) : props.post.likes.includes(auth.user._id) ? (
              <FavoriteIcon
                sx={{ color: "red" }}
                onClick={() => likeDislikePostHandler("dislike")}
              />
            ) : (
              <FavoriteBorderIcon
                sx={{ color: "gray" }}
                onClick={() => likeDislikePostHandler("like")}
              />
            )}
          </div>
          <div className="">
            <span className="text-gray-600">
              {props.post.likes.length} Likes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
