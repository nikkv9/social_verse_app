import apiInstance from "../interceptors";
import Cookies from "js-cookie";

const postService = {};

postService.createPost = async (desc, media, mediaType) => {
  return apiInstance.post(
    "/post/create",
    {
      desc: desc,
      media: media,
      mediaType: mediaType,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("tokenId")}`,
      },
    }
  );
};
postService.getAllPosts = async () => {
  return apiInstance.get("/posts", {
    headers: {
      Authorization: `Bearer ${Cookies.get("tokenId")}`,
    },
  });
};

postService.likeDislikePost = async (postId, userId, action) => {
  return apiInstance.put(
    "/post/like_dislike",
    {
      postId: postId,
      userId: userId,
      action: action,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("tokenId")}`,
      },
    }
  );
};

export default postService;
