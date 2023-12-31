import React from 'react';
import UseUser from '../../hooks/use-user';
import User from './user'
import Suggestions from './suggestions'

export default function Sidebar(){
    const { user: {fullName, username, userId, following, docId} } = UseUser();

    return (
        <div>
            <User username={username} fullName={fullName}/>
            <Suggestions userId={userId} following={following} loggedInUserDocId={docId}/>
        </div>
    )
}
