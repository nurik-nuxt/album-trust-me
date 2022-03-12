import createRepository from "~/api/Repository.js";

export default function (context,inject){
  const api = createRepository(context)
  const authUrl = 'http://45.136.56.44:8000/'

  const repositories = {
    auth: {
      login: api("login/", "POST", authUrl),
      profile: {
        ...api("user/", "GET", authUrl),
        ...api("user/", "POST", authUrl),
        ...api("user/", "PUT", authUrl),
      },
    }
  }
  inject('api', repositories);
}
