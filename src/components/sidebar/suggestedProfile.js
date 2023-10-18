import React, { useEffect, useState } from 'react';
import PropeTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { updateFollowedUserFollowers, updateLoggedInUserFollowing } from '../../services/firebaseServices';

export default function SuggestedProfile({username, spDocId, userId, profileId, loggedInUserDocId}) {
    const [followed, setFollowed] = useState(false);

    async function handleFollowUser(){
        setFollowed(true);

        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);

        await updateFollowedUserFollowers(spDocId, userId, false);

    }  
    return !followed ? (
        <div className='flex flex-row items-center align-items justify-between'>
            <div className='flex items-center justify-between'>
                <img className='rounded-full w-8 flex mr-3' src={`/images/avatars/${username}.jpg`} alt='avatarPic'/>
                <Link to={`/p/${username}`} >
                    <p className='font-bold text-sm'>{username}</p>
                </Link>
            </div>
            <div>
                <button className='text-xs font-bold text-blue-medium' type='button' onClick={handleFollowUser}>
                    Follow
                </button>
            </div>
        </div>
    ) : null;
}

SuggestedProfile.propeTypes = {
    username: PropeTypes.string.isRequired,
    spDocId: PropeTypes.string.isRequired,
    userId: PropeTypes.string.isRequired,
    profileId: PropeTypes.string.isRequired,
    loggedInUserDocId: PropeTypes.string.isRequired
}