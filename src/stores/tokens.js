import { localStore } from "./localStore";

export const token = localStore("accessToken", "");
export const secret = localStore("accessTokenSecret", "");
