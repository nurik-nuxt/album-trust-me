import Cookies from 'js-cookie'

/**
 * HOW TO USE $cookies
 * GET (auth token) -> this.$cookies.authToken.get();
 * SET (auth token) -> this.$cookies.authToken.get("SOME VALUE");
 * REMOVE (auth token) -> this.$cookies.authToken.remove();
 * */

const createTool = (name) => ({
  get: () => Cookies.get(name) || null,
  set: (value) => Cookies.set(name, value),
  remove: () => Cookies.remove(name)
})

export default function(context, inject) {
  const tools = {
    authToken: createTool("auth-token"),
  };

  inject("cookies", tools);
}
