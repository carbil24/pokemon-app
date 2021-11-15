import httpClient from "./httpClient";

const END_POINT = "/pokemon";

const getDataByQuery = (limit, offset) =>
  httpClient.get(END_POINT, { params: { limit, offset } });

const getDataByUrl = (url) => httpClient.get(url);

export const API = { getDataByQuery, getDataByUrl };
