import React, { useContext } from 'react'
import Skeleton, {SkeletonTheme } from 'react-loading-skeleton';
import { GlobalState } from '../../../../GlobalState';

const Loading = ({height, width, mb, ml, margin}) => {
    //Global state
    const state = useContext(GlobalState);
    // Night Mode Api
    const [night] = state.nightModeApi.nightMode;

    return (
        <SkeletonTheme color={ night &&  '#2E2E2E'} highlightColor={ night && '#222222' } className="skeletonTheme">
            <Skeleton height={height} width={width} style={{margin: margin , marginBottom: mb , marginLeft:  ml}}/>
        </SkeletonTheme>
    )
}

export default Loading
