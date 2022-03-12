import axios from "../plugins/axios";

function pathFormatter(path, params) {
  if (!params) return path;
  return path.split("~").map(key => typeof params[key] === "undefined" ? key : params[key]).join("");
}

function headersWithAuth(jwt, headers = {}) {
  if (!jwt) return headers;
  return {Authorization: jwt, ...headers}
}

const idealArguments = {
  headers: {},
  body: {},
  params: {},
  urlParams: {},
}

const METHOD = Object.freeze({
  "GET": "GET",
  "POST": "POST",
  "PUT": "PUT",
  "DELETE": "DELETE"
})

export default ({store, $axios}) => (resource, type, baseURL = process.env.B2B_URL, withCredentials = false) => {
  const jwt = () => store.getters["auth/getToken"] ? `JWT ${store.getters["auth/getToken"]}` : null;
  const path = baseURL + resource;

  if (type === METHOD.GET) {
    return {
      path,
      get: (payload = idealArguments) => $axios.$get(pathFormatter(path, payload.urlParams), {
        headers: headersWithAuth(jwt(), payload.headers),
        params: payload.params,
      })
    }
  }

  if (type === METHOD.POST) {
    return {
      path,
      post: (payload = idealArguments) => $axios.$post(pathFormatter(path, payload.urlParams), payload.body, {
        headers: headersWithAuth(jwt(), payload.headers),
        params: payload.params,
        // body: payload.body
      })
    }
  }

  if (type === METHOD.PUT) {
    return {
      path,
      put: (payload = idealArguments) => $axios.$put(pathFormatter(path, payload.urlParams), payload.body, {
        headers: headersWithAuth(jwt(), payload.headers),
      })
    }
  }

  if (type === METHOD.DELETE) {
    return {
      path,
      delete: (payload = idealArguments) => $axios.$delete(pathFormatter(path, payload.urlParams), {
        headers: headersWithAuth(jwt(), payload.headers),
        params:payload.params
      })
    }
  }

  return () => ({ path })
};
