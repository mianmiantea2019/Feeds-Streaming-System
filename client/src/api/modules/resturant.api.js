import publicClient from "../client/public.client";

const resturantEndpoints = {
  getResturantDetail: () => `resturants`,
};

const resturantApi = {
  getResturantDetail: async () => {
    try {
      const response = await publicClient.get(resturantEndpoints.getResturantDetail());
      return { response };
    } catch (err) { return { err }; }
  },
};

export default resturantApi;