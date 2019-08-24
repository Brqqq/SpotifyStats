export interface QueryStringParam {
    key: string;
    value: string;
}

export const buildQueryString = (params: Array<QueryStringParam>) => {
    return params.map(kvp => encodeURIComponent(kvp.key) + "=" + encodeURIComponent(kvp.value)).join("&");
}