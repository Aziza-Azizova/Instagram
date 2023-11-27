import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import { getPhotosByUsername } from '../../services/firebaseServices';
import Photos from './photos';



export default function Profile({user}) {
    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialState = {
        profile: {},
        photosColl: [],
        followerNum: 0
    }

    const [{profile, photosColl, followerNum}, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        async function showProfileInfo(){
            const photos = await getPhotosByUsername(user.username);
            dispatch({ profile: user, photosColl: photos, followerNum: user.followers.length})
        }
        showProfileInfo();
    }, [user.username])

    return (
        <>
            <Header photosNum={photosColl ? photosColl.length : 0 } profile={profile} followerNum={followerNum} setFollowerNum={dispatch} />
            <Photos photos={photosColl} />
        </>
    )
}

Profile.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number,
        emailAddress: PropTypes.string,
        fullName: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array,
        userId: PropTypes.string,
        username: PropTypes.string
    })
}