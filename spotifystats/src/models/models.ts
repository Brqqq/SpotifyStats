export interface Playlist {
    id: string;
    href: string;
    name: string;
    uri: string;
    owner: User;
}

export interface Paging<T> {
    href: string;
    items: T[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
}

export interface Track {
    id: string;
    name: string;
}

export interface AudioFeatures {
    danceability: number;
    tempo: number; //
    acousticness: number;
    duration_ms: number; //
    energy: number;
    key: number; //
    liveness: number;
    loudness: number; //
    mode: number;
    speechiness: number;
    time_signature: number; //
    valence: number;
}

export interface AudioFeaturesList {
    audio_features: AudioFeatures[];
}

export interface User {
    display_name: string;
    id: string;
}