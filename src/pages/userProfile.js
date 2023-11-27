import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserByUsername } from '../services/firebaseServices';
import * as CONSTROUTES from '../constants/routes';
import Header from '../components/header';
import Profile from '../components/profile';


export default function UserProfile() {
    const { username } = useParams();
    const [user, setUser ] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      async function checkExistingUser(){
        const [isUserExists] = await getUserByUsername(username);
        if(isUserExists.userId){
            setUser(isUserExists);
        } else{
            navigate(CONSTROUTES.NOT_FOUND);
        }
      }

      checkExistingUser();
    }, [username, navigate])
    

    return user?.username ? (
        <div className='bg-gray-background'>
            <Header />
            <Profile user={user}/>
            <div className='mx-auto max-w-screen-lg'>
                
            </div>
        </div>
    ) : null;
}
