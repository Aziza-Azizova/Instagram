import React, { useContext, useState, useEffect } from 'react';
import FirebaseContext from '../context/firebase';
import { Link, useNavigate } from 'react-router-dom';
import * as CONSTROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebaseServices';

export default function SignUp(){
    const navigate = useNavigate();
    const { firebase } = useContext(FirebaseContext);

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const isInValid = password === '' || emailAddress === '';

    const handleSignUp = async (event) => {
        event.preventDefault();

        const userNmaeExists = await doesUsernameExist(username)
        if(!userNmaeExists.length){
            try {
                const createdUserInfo = await firebase.auth().createUserWithEmailAndPassword(emailAddress, password);
                await createdUserInfo.user.updateProfile({
                    displayName: username
                });

                await firebase.firestore().collection('users').add({
                    userId: createdUserInfo.user.uid,
                    username: username.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following: [],
                    dateCreated: Date.now()
                });

                navigate(CONSTROUTES.DASHBOARD);
            } catch (error) {
                setFullName('');
                setEmailAddress('');
                setPassword('');
                setError(error.code.message);
            }
        } else {
            setError('That username is already taken, please try another.');
        }
    }

    useEffect(() => {
      document.title = 'Sign Up - Instagram';
    }, [])
    

    return(
        <div className='container flex mx-auto max-w-screen-md items-center h-screen'>
            <div className='flex w-3/5'>
                <img src='/images/iphone-with-profile.jpg' alt='Instagram add on phone'/>
            </div>
            <div className='flex flex-col w-2/5'>
                <div className='flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded'>
                    <h1 className='flex justify-center w-full'>
                        <img src='/images/logo.png' alt='InstaLogo' className='mt-2 w-6/12 mb-4' />
                    </h1>
                    {error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}

                    <form onSubmit={handleSignUp} method='POST'>
                        <input aria-label='Enter your username' type='text' placeholder='Username' 
                        className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                        onChange={({target}) => setUsername(target.value)} value={username}/>

                        <input aria-label='Enter your full name' type='text' placeholder='Full Name' 
                        className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                        onChange={({target}) => setFullName(target.value)} value={fullName}/>
                        
                        <input aria-label='Enter your email address' type='text' placeholder='Email address' 
                        className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                        onChange={({target}) => setEmailAddress(target.value)} value={emailAddress}/>

                        <input aria-label='Enter password' type='password' placeholder='Password' 
                        className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                        onChange={({target}) => setPassword(target.value)} value={password}/>

                        <button disabled={isInValid} type='submit' className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInValid && 'opacity-50'}`}>
                            Sign Up
                        </button>
                    </form>
                </div>

                <div className='flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded'>
                    <p className='text-sm'>
                        Already have an account? {` `}
                        <Link to={CONSTROUTES.LOGIN} className='font-bold text-blue-medium'>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}