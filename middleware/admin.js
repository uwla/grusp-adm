export default function ({ $auth, redirect }) {
    let roles = []
    if ($auth.loggedIn) roles = $auth.user.roles || []
    if (!roles.includes('admin')) return redirect('/')
}
