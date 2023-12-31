import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedAccounts } from '../../services/firebaseServices';
import SuggestedProfile from './suggestedProfile';

export default function Suggestions({userId, following, loggedInUserDocId}) {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedAccounts(){
      const res = await getSuggestedAccounts(userId, following);
      setProfiles(res);
    }

    if(userId){
      suggestedAccounts();
    }

  }, [userId])
  

  return !profiles ? (
    <Skeleton  count={3} height={150} className='mt-5'/>
  ) : profiles.length > 0 ? (
    <div className='rounded flex flex-col'>
      <div className='text-sm flex items-center align-items justify-between mb-2'>
        <p className='font-bold text-gray-base'>Suggestions for you</p>
      </div>
      <div className='mt-4 grid gap-5'>
        {profiles.map((profile) => (
          <SuggestedProfile key={profile.docId} spDocId ={profile.docId} username={profile.username} userId = {userId} profileId={profile.userId} loggedInUserDocId={loggedInUserDocId}/>
        ))}
      </div>
    </div>
  ) : null
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string
}