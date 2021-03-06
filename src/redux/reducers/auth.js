export default (
    state = {
        loading: false,
        payload: {},
        error: null
    },
    action
) => {
    switch(action.type) {
        case "AUTH_REQUEST":
            return { ...state, loading: true, payload: {}, error: null };
        case "AUTH_REQUEST_SUCCESS":
            /* let obj = { access_token: action?.payload?.data.access_token , email};
            localStorage.setItem(CONFIG.LOCALSTORAGE_USER, JSON.stringify(obj)); */
            return { ...state, loading: false, payload: action.payload, error: null };
        case "AUTH_REQUEST_ERROR":
            return { ...state, loading: false, payload: {}, error: action.payload };
        case "AUTH_RESET":
            return { loading: false, payload: {}, error: null };
        default: 
            return state;
    }
}