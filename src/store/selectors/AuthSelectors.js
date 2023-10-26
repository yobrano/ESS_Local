export const isAuthenticated = (state) => {
    if(state.auth.token.idToken) return true;
    return false;
}
