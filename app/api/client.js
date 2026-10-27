import { create } from "apisauce";
import cache from "../utility/cache";
import Constants from "expo-constants";

const apiClient = create({
  baseURL: Constants.manifest?.extra?.apiUrl || "http://localhost:9000/api",
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }
  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

export default apiClient;
