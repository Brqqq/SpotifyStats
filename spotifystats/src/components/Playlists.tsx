import React from "react";

import { ReduxRoot } from "../models/states";
import { spotifyFetch } from "../utils/fetch";
import { connect } from "react-redux";

import { Playlist, Paging } from "../models/models";
import Pages from "../components/Pages";

const mapStateToProps = (state: ReduxRoot) => ({
    accessToken: state.app.accessToken
});

interface IProps {
    onPlaylistSelected: (playlist: Playlist) => void;
    selectedPlaylist?: Playlist;
}

interface IState {
    paging?: Paging<Playlist>;
}

class Albums extends React.Component<IProps & ReturnType<typeof mapStateToProps>, IState> {

    readonly state: IState = {
        paging: undefined
    }

    async componentDidMount() {
        const apiResult = await spotifyFetch(this.props.accessToken, "me/playlists?limit=10");
        const playlists = await apiResult.json();
        this.setState({ paging: playlists });
    }

    onPageChange = (paging: Paging<unknown>) => {
        const stupidHack = paging as Paging<Playlist>;
        this.setState({ paging: stupidHack });
    }

    public render() {
        const { paging } = this.state;
        const { selectedPlaylist } = this.props; 

        return <>
            {paging && paging.items.map(playlist => (
            <div 
                className={"playlist" + ((selectedPlaylist && selectedPlaylist.id === playlist.id) ? " active" : "")} 
                key={playlist.id} 
                onClick={() => this.props.onPlaylistSelected(playlist)}
            >
                <b>{playlist.name}</b>
                <br/>
                Created by: {playlist.owner.display_name}
            </div>))}
            <Pages paging={paging} onNewResult={this.onPageChange} />
        </>;
    }
}

export default connect(mapStateToProps)(Albums);