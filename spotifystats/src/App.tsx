import React from 'react';
import './App.css';
import { HashRouter, Route } from "react-router-dom"
import Login from './pages/Login';
import OauthRedirect from "./pages/OauthRedirect";
import createStore from "./createStore";
import { Provider } from "react-redux";

import PlaylistAnalysis from "./pages/PlaylistAnalysis";

const App: React.FC = () => {

    return (
        <div id="app">
            <Provider store={createStore()}>
                <HashRouter>
                    <Route exact path="/" component={Login}  />
                    <Route path="/access_token:lol" component={OauthRedirect} />
                    <Route exact path="/playlists" component={PlaylistAnalysis} />
                </HashRouter>
            </Provider>
        </div>
    );
}

export default App;
