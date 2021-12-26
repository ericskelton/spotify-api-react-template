import axios from 'axios'

// here you find the functions to login with spotify api
// calling one of these will redirect you to the spotify login page
// once logged in spotify will redirect you to http://your-redirect-uri
// by default this is http://localhost:3000/callback/, you will then need to call the corresponding callback function

// scope should be either an array of scope or a string of scope seperated by spaces
// see https://developer.spotify.com/documentation/general/guides/authorization/scopes/ for more details on scopes
// scopes are required for telling the spotify api what you want to do with it
// so if you just want the user email you specify 'user-read-email' in the scope and then the api will only give you access to that

const generateRandomString = function (length) {
    var text = "";
    var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export const loginImplicitGrantFlow = (scope) => {
    let stateKey = "spotify_auth_state";
    // if you have a server, you probably want to set a state cookie
    // then you can correlate requests and responses, this is not required though
    // const [cookies, setCookie] = useCookies([stateKey])
    const state = generateRandomString(16);
    // setCookie(stateKey, state);
    const params = new URLSearchParams();
    params.append("response_type", "token");
    params.append("client_id", process.env.REACT_APP_CLIENT_ID);
    params.append("scope", scope);
    params.append("redirect_uri", process.env.REACT_APP_BASE_URL + "/callback");
    params.append("show_dialog", "true");
    window.location.href =
        "https://accounts.spotify.com/authorize?" + params.toString();
};

export const callbackImplicitGrantFlow = () => {
    const hash = window.location.hash
        .substring(1)
        .split("&")
        .reduce(function (initial, item) {
            if (item) {
                var parts = item.split("=");
                initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
        }, {});
    return({
        token: hash.access_token,
        expiresIn: hash.expires_in,
    });
};

// not implemented yet
export const loginAuthorizationCodeFlow = (scope) => {
    let stateKey = "spotify_auth_state";
    // if you have a server, you probably want to set a state cookie
    // then you can correlate requests and responses, this is not required though
    // read more about states on the spotify api documentation website
    // https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
    // const [cookies, setCookie] = useCookies([stateKey])
    const state = generateRandomString(16);
    // setCookie(stateKey, state)
    const params = new URLSearchParams();
    params.append("response_type", "code");
    params.append("client_id", process.env.REACT_APP_CLIENT_ID);
    params.append("scope", scope);
    params.append("redirect_uri", process.env.REACT_APP_BASE_URL + "/callback");
    params.append("show_dialog", "true");
    window.location.href =
        "https://accounts.spotify.com/authorize?" + params.toString();
};

export const callbackAuthorizationCodeFlow =  () => {
    const hash = window.location.hash
        .substring(1)
        .split("&")
        .reduce(function (initial, item) {
            if (item) {
                var parts = item.split("=");
                initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
        }, {});

    return axios.post(
        "https://accounts.spotify.com/api/token",
        {
            code: hash.code,
            redirect_uri: process.env.REACT_APP_BASE_URL + "callback/",
            grant_type: "authorization_code",
        },
        {
            headers: {
                Authorization:
                    "Basic " +
                    new Buffer(
                        process.env.REACT_APP_CLIENT_ID +
                            ":" +
                            process.env.REACT_APP_CLIENT_SECRET
                    ).toString("base64"),
                "Content-Type": "application/x-www-form-urlencoded",
            },
            json: true,
        }
    ).then(res =>{
        const data = res.data
        return {
        token: data.access_token,
        expiresIn: data.expires_in,
        refreshToken: data.refresh_token,
    };
    });
    
    
};
