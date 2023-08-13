import publicClient from "../client/public.client";

const newsEndpoints = {
  getNewsDetail: () => `news`,
  getTechNewsDetail: () => `technology`,
  getPopularSearch: () => `news/popularsearch`,
  getCYNewsDetail: () => `cynews`,
};

const newsApi = {
  getNewsDetail: async () => {
    try {
      const response = await publicClient.get(newsEndpoints.getNewsDetail());
      return { response };
    } catch (err) { return { err }; }
  },
  getTechNewsDetail: async () => {
    try {
      const response = await publicClient.get(newsEndpoints.getTechNewsDetail());
      return { response };
    } catch (err) { return { err }; }
  },
  getCYNewsDetail: async () => {
    try {
      const response = await publicClient.get(newsEndpoints.getCYNewsDetail());
      return { response };
    } catch (err) { return { err }; }
  },
  getPopularSearch: async () => {
    try {
      const response = await publicClient.get(newsEndpoints.getPopularSearch());
      return { response };
    } catch (err) { return { err }; }
  },
};

export default newsApi;