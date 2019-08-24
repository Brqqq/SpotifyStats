import React from "react";

import { Playlist, Paging, AudioFeaturesList, AudioFeatures } from "../models/models";
import { ReduxRoot } from "../models/states";

import { spotifyFetch } from "../utils/fetch";
import { connect } from "react-redux";

import Playlists from "../components/Playlists";
import AnalysisBoxPlot from "../components/AnalysisBoxPlot";

const mapStateToProps = (state: ReduxRoot) => ({
    accessToken: state.app.accessToken
})

interface IState {
    audioFeatures: AudioFeatures[];
    selectedPlaylist?: Playlist;
}

class PlaylistAnalysis extends React.Component<ReturnType<typeof mapStateToProps>, IState> {

    readonly state: IState = {
        audioFeatures: [],
        selectedPlaylist: undefined
    }
    
    onPlaylistSelected = async (playlist: Playlist) => {
        const { accessToken } = this.props;
        const apiCall = await spotifyFetch(accessToken, `playlists/${playlist.id}/tracks?limit=100`);
        const result: Paging<any> = await apiCall.json();
        

        const ids = result.items.map(record => record.track.id).join(",");
        const audioFeaturesUrl = "audio-features?ids=" + ids;

        const audioFeaturesCall = await spotifyFetch(accessToken, audioFeaturesUrl);
        const audioFeaturesResult: AudioFeaturesList = await audioFeaturesCall.json();
        
        this.setState({ audioFeatures: audioFeaturesResult.audio_features, selectedPlaylist: playlist });
    }

    average = (prop: keyof AudioFeatures, audioFeatures: AudioFeatures[]) => {
        return audioFeatures.reduce((acc, curr) => acc += curr[prop], 0)  / audioFeatures.length;
    }
    
    public render() {
        const { audioFeatures, selectedPlaylist} = this.state;
        return <>
            <h3>Playlists</h3>
            <div id="playlistResult">
                <div id="playlists">
                    <Playlists onPlaylistSelected={this.onPlaylistSelected} selectedPlaylist={selectedPlaylist}/>
                </div>
                <div id="analysis">
                    {selectedPlaylist && <div>
                        <p>Selected playlist: <b>{selectedPlaylist.name}</b></p>
                        <p>Averages for the first 100 songs</p>
                        <p>Danceability: {this.average("danceability", audioFeatures)}</p>
                        <p>Tempo: {this.average("tempo", audioFeatures)}</p>
                        <p>Acousticness: {this.average("acousticness", audioFeatures)}</p>
                        <p>Duration in ms: {this.average("duration_ms", audioFeatures)}</p>
                        <p>Energy: {this.average("energy", audioFeatures)}</p>
                        <p>Key: {this.average("key", audioFeatures)}</p>
                        <p>Liveness: {this.average("liveness", audioFeatures)}</p>
                        <p>Loudness: {this.average("loudness", audioFeatures)}</p>
                        <p>Mode: {this.average("mode", audioFeatures)}</p>
                        <p>Speechiness: {this.average("speechiness", audioFeatures)}</p>
                        <p>Time signature: {this.average("time_signature", audioFeatures)}</p>
                        <p>Valence: {this.average("valence", audioFeatures)}</p>
                    </div>}
                </div>
            </div>
            {selectedPlaylist && <div>
                <AnalysisBoxPlot audioFeatures={audioFeatures} />    
            </div>}
        </>;
    }
}

export default connect(mapStateToProps)(PlaylistAnalysis);