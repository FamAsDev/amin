import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

const LoadMore = () => {
    // Global state
    const state = useContext(GlobalState);
    const [page, setPage] = state.productsAPI.page;
    const [result] = state.productsAPI.result;

    return (
        <div className="loadMore text-center mb-5 mt-5">
            {
                result < page * 9 ? ""
                :
                <button className="btn btn-outline-success" onClick={() => setPage(page+1)}>LoadMore</button>
            }
        </div>
    )
}

export default LoadMore
