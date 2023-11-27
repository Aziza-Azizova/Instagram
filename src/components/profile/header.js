import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import UseUser from '../../hooks/use-user'
import { isUserFollowingProfile, togFollow } from '../../services/firebaseServices';

export default function Header({
        photosNum,
        followerNum,
        setFollowerNum,
        profile: {
            docId: profileDocId,
            userId: profileUserId,
            fullName,
            following = [],
            followers = [],
            username: profileUsername
        },
    }) {
    const { user } = UseUser();
    const [isFollowingUser, setIsFollowingUser] = useState(false);
    const activeFollowBtn = user.username && user.username !== profileUsername;


    const handleTogFollow = async () => {
        setIsFollowingUser((isFollowingUser) => !isFollowingUser)
        setFollowerNum({
            followerNum: isFollowingUser ? followerNum - 1 : followerNum + 1
        });

        await togFollow(isFollowingUser, user.docId, profileDocId, profileUserId, user.userId);
    }

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
            setIsFollowingUser(!!isFollowing);
            
        }
        if(user.username && profileUserId){
            isLoggedInUserFollowingProfile();
        }

    }, [user.username, profileUserId])

    
    return (
        <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
            <div className='container flex justify-center'> 
            {user.username && <img className='rounded-full h-40 w-40 flex' alt={`${profileUsername} avatar`} src={`/images/avatars/${profileUsername}.jpg`} />}
            </div>
            <div className='flex items-center justify-center flex-col col-span-2'>
                <div className='container flex items-center'>
                    <p className='text-2xl mr-4'>{profileUsername}</p>
                    {activeFollowBtn && (
                        <button className='bg-blue-medium font-bold text-sm rounded text-white w-20 h-8' type='button' 
                            onClick={handleTogFollow}
                            onKeyDown={(e) => {
                                if(e.key === 'Enter'){
                                    handleTogFollow();
                                }
                            }}
                        >
                            {isFollowingUser ? 'Unfollow' : 'Follow'}
                        </button>
                    )}
                </div>
                <div className='container mt-2'>
                    <p className='font-medium'>
                        {!fullName ? <Skeleton count={1} height={24}/> : fullName}
                    </p>
                </div>
                <div className='container flex mt-4'>
                    {followers === undefined || following === undefined ? (
                        <Skeleton count={1} width={677} height={24} />
                    ) : (
                        <>
                            <p className='mr-10'>
                                <span className='font-bold'>{photosNum}</span> photos
                            </p>
                            <p className='mr-10'>
                                <span className='font-bold'>{followerNum}</span>{` `}
                                {followerNum === 1 ? 'follower' : 'followers'}
                            </p>
                            <p className='mr-10'>
                                <span className='font-bold'>{following.length}</span> following
                            </p>
                        </>
                    )}
                </div>                
            </div>
        </div>
    )
}

Header.propTypes = {
    photosNum: PropTypes.number.isRequired,
    followerNum: PropTypes.number.isRequired,
    setFollowerNum: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        userId: PropTypes.string,
        fullName: PropTypes.string,
        following: PropTypes.array,
        followers: PropTypes.array,
        username: PropTypes.string,
    }).isRequired,
}