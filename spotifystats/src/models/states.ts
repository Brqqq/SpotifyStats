export interface GlobalState {
    accessToken: string;
    expiry: number;
}

export interface ReduxRoot {
    app: GlobalState;
}