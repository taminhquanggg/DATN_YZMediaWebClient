import { useAxios } from "../connection/APIConnection";

export const usePublicApi = () => {
  const apiConnection = useAxios();

  return {
    GetAllPosts: () => {
      return apiConnection.httpRequest(
        "GET",
        `api/Public/get-all-posts`
      );
    },

    GetPostInfo: (postId) => {
      return apiConnection.httpRequest(
        "GET",
        `api/Public/get-post-info/` + postId
      );
    },

    GetImageByPostID: (param) => {
      return apiConnection.httpRequest(
        "POST",
        `api/Public/get-image-by-posts-id`,
        param,
        null,
        true,
        "multipart/form-data"
      );
    },
    
  };


};
