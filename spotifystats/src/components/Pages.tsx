import React from "react";
import { Paging } from "../models/models";
import { ReduxRoot } from "../models/states";
import { connect } from "react-redux";
import { spotifyFullFetch } from "../utils/fetch";

interface IProps<T> {
    paging?: Paging<T>;
    onNewResult: (newResult: Paging<T>) => void;
}

const mapStateToProps = (state: ReduxRoot) => ({
    accessToken: state.app.accessToken
});

class Pages<T> extends React.Component<IProps<T> & ReturnType<typeof mapStateToProps>> {

    fetchNewResult = async (api: string) => {
        const { accessToken, paging, onNewResult } = this.props;
        if(!paging) return;

        const apiCall = await spotifyFullFetch(accessToken, api);
        const result = await apiCall.json();

        onNewResult(result);
    }

    previousPage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(!this.props.paging) return;
        this.fetchNewResult(this.props.paging.previous);
    }

    nextPage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(!this.props.paging) return;
        this.fetchNewResult(this.props.paging.next);
    }

    public render() {
        const { paging } = this.props;
        if(!paging) {
            return <></>;
        }

        const prevButton = <button onClick={this.previousPage}>Previous page</button>
        const nextButton = <button onClick={this.nextPage}>Next page</button>

        const isFirstPage = paging.offset === 0;
        const hasMorePages = paging.offset + paging.limit < paging.total;

        return <>
            {!isFirstPage && prevButton}
            {hasMorePages && nextButton}
        </>;
    }
}

export default connect(mapStateToProps)(Pages);