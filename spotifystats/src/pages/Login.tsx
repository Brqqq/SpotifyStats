import React from "react";
import { QueryStringParam, buildQueryString } from "../utils/querystring";
import { host, spotifyClientId } from "../constants";

export default class extends React.Component {

    private spotifyUrl: string;

    constructor(props: any) {
        super(props);
        const params: QueryStringParam[] = [
            { key: "client_id", value: spotifyClientId },
            { key: "response_type", value: "token" },
            { key: "redirect_uri", value: host + "#/oauth" },
            //todo: state
            { key: "scope", value: "playlist-read-private " }
        ];

        const queryString = buildQueryString(params);

        this.spotifyUrl = "https://accounts.spotify.com/authorize?" + queryString;
    }

    onButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        window.location.href = this.spotifyUrl;
    }

    public render() {
        return <div>
            <p>Login to spotify first</p>
            <button onClick={this.onButtonClick}>Login homie</button>
        </div>;
    }
}