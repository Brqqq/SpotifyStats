import { createAction } from "redux-actions";

export const AUTH_TOKEN_RECEIVED = "AUTH_TOKEN_RECEIVED"; 

export const authTokenReceived = createAction<string, string>(AUTH_TOKEN_RECEIVED, authToken => authToken);