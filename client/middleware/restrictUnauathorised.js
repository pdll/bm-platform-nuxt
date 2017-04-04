export default function ({ store, redirect, route }) {
  if (!store.state.user.logged) return redirect('/account/auth?back=' + route.path)
}
