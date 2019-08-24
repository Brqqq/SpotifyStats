import React from "react";
import { spotifyFetch } from "../utils/fetch"
import { authTokenReceived } from "../redux/actions";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapDispatchToProps = (dispatch: Dispatch) => ({
    saveAuthToken: (authToken: string) => dispatch(authTokenReceived(authToken))
});

class OauthRedirect extends React.Component<ReturnType<typeof mapDispatchToProps>> {

    componentDidMount() {
        this.getUserDetails();
    }

    getUserDetails = async () => {
        const [accessTokenKvp,,,] = window.location.hash.split("&");
        const [, accessToken] = accessTokenKvp.split("=");
        //const [,expiresIn] = expiresInKvp.split("=");
        
        const res = await spotifyFetch(accessToken as string, "me");
        const json = await res.json();

        console.log("hi", json.display_name)
        console.log(json)

        this.props.saveAuthToken(accessToken);
    }

    render() {
        return <>
            <p>Grats you logged</p>
            <Link to="/playlists">See playlists</Link>
        </>;
    }
}

export default connect(undefined, mapDispatchToProps)(OauthRedirect);