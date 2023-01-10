import Axios from "axios";
import { token, DOMAIN, TOKEN } from "../utils/setting";

export class BothTokenService {
  put = (url, data) => {
    return Axios({
      method: "PUT",
      url: `${DOMAIN}${url}`,
      data,
      headers: {
        Authorization: JSON.parse(localStorage.getItem(token)),
        TokenCyberSoft: TOKEN,
      },
    });
  };
  post = (url, data) => {
    return Axios({
      url: `${DOMAIN}${url}`,
      method: "POST",
      data,
      headers: {
        Authorization: JSON.parse(localStorage.getItem(token)),
        TokenCyberSoft: TOKEN,
      },
    });
  };
  get = (url) => {
    return Axios({
      method: "GET",
      url: `${DOMAIN}${url}`,
      headers: {
        Authorization: JSON.parse(localStorage.getItem(token)),
        TokenCybersoft: TOKEN,
      },
    });
  };
  delete = (url) => {
    return Axios({
      method: "DELETE",
      url: `${DOMAIN}${url}`,
      headers: {
        Authorization: JSON.parse(localStorage.getItem(token)),
        TokenCyberSoft: TOKEN,
      },
    });
  };
}
export const bothServiceToken = new BothTokenService();
