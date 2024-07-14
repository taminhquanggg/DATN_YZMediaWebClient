import { SpinLoading } from "../../utils/commonFunction";
import { getUserFromStorage } from "../../store/actions/sharedActions";

export const useAxios = (baseURL) => {
  if (baseURL == undefined || baseURL == null || baseURL == "") {
    baseURL = import.meta.env.VITE_YZMEDIA_SERVICE
  }

  let client = window.axiosClient;
  const userLocalStorage = getUserFromStorage();

  const Connection = async (
    URI,
    method = "GET",
    body,
    params = null,
    Type = "application/json",
  ) => {
    return await client
      .request({
        url: URI,
        baseURL: baseURL,
        method: method,
        headers: {
          "Content-Type": Type,
          "Authorization": `Bearer ${userLocalStorage?.AccessToken}`,
        },
        params: {
          ...params,
        },
        data: body
      })
      .catch((rs) => {
        console.log(rs);
      });
  };

  const ConnectionNonNotify = async (
    URI,
    method = "GET",
    body,
    params = null,
    Type = "application/json"
  ) => {

    return await client
      .request({
        url: URI,
        baseURL: baseURL,
        method: method,
        headers: {
          "Content-Type": Type,
          "Authorization": `Bearer ${userLocalStorage?.AccessToken}`,
        },
        params: {
          ...params,
        },
        data: body,
      })
      .catch((rs) => {
        console.log(rs);
      });
  };

  const ConnectionCloudflare = async (
    URI,
    URL,
    method = "POST",
    body,
    params = null,
    Type = "application/json",
  ) => {
    return await client
      .request({
        url: URI,
        baseURL: URL,
        method: method,
        headers: {
          "Content-Type": Type
        },
        params: {
          ...params,
        },
        data: body
      })
      .catch((rs) => {
        console.log(rs);
      });
  };
  //

  let clientHelper = {
    httpRequest: async (
      method,
      URI,
      body = null,
      params = null,
      showLoading = true,
      Type = "application/json",
      props = {},
    ) => {
      let rp = [];
      if (showLoading) {
        SpinLoading(true);
      }
      try {
        let result;
        rp = await Connection(URI, method, body, params, Type, props);
        if (showLoading) {
          SpinLoading(false);
        }

        if (rp != undefined) {
          const { status, data } = rp;
          result = data ?? [];
        }

        return result;
      } catch (e) {
        console.log(e);

        if (showLoading) {
          SpinLoading(false);
        }
      }
      return rp;
    },

    httpRequestNonNotify: async (
      method,
      URI,
      body,
      params,
      showLoading = false,
      Type = "application/json"
    ) => {
      let rp = [];
      try {
        rp = await ConnectionNonNotify(URI, method, body, params, Type);

        return rp;
      } catch (e) {
        console.log(e);
      }
      return rp;
    },

    httpRequestCloudflare: async (
      method,
      URI,
      URL,
      body = null,
      params = null,
      showLoading = true,
      Type = "application/json",
      props = {},
    ) => {
      let rp = [];
      if (showLoading) {
        SpinLoading(true);
      }
      try {
        let result;
        rp = await ConnectionCloudflare(URI, URL, method, body, params, Type, props);
        if (showLoading) {
          SpinLoading(false);
        }

        if (rp != undefined) {
          const { status, data } = rp;
          result = data ?? [];
        }

        return result;
      } catch (e) {
        console.log(e);

        if (showLoading) {
          SpinLoading(false);
        }
      }
      return rp;
    },



    client: client,
  };
  return clientHelper;
};
