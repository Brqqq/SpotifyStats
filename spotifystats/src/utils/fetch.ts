export const spotifyFetch = (accessToken: string, input: string, init?: RequestInit | undefined) => {

    const url = "https://api.spotify.com/v1/" + input;
    return spotifyFullFetch(accessToken, url, init);
}

export const spotifyFullFetch = (accessToken: string, input: string, init?: RequestInit | undefined) => {

    const options: RequestInit = {
        ...init,
        headers: new Headers({
            Authorization: "Bearer " + accessToken
        })
    };

    return fetch(input, options);
}
