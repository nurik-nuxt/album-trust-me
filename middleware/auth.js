export default async function({ redirect, store }) {
  const isAuth = await store.dispatch("auth/checkValid");
  console.log("is auth", isAuth)
  if (isAuth === false) {
    console.log("not",isAuth)
    return redirect("/auth/login");
    console.log("No Profile")

  }
}
