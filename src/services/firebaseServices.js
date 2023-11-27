// eslint-disable-next-line
import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username){
    const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

    return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username){
    const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

    return result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))
}

// getUserByUserId
export async function getUserByAuth(userId){
    const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return user;
}

export async function getSuggestedAccounts(userId, following){
    const result = await firebase
    .firestore()
    .collection('users')
    .limit(10)
    .get();

    const filteredResult = result.docs
    .map((user) => ({...user.data(), docId: user.id}))
    .filter((p) => p.userId !== userId && !following.includes(p.userId))

    return filteredResult;
} 


export async function updateLoggedInUserFollowing(loggedInUserDocId, profileId, isFollowingProfile){
    return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
        following: isFollowingProfile ? FieldValue.arrayRemove(profileId) : FieldValue.arrayUnion(profileId)
    });
}


export async function updateFollowedUserFollowers(spDocId, loggedInUserDocId, isFollowingProfile){
    return firebase
    .firestore()
    .collection('users')
    .doc(spDocId)
    .update({
        followers: isFollowingProfile ? FieldValue.arrayRemove(loggedInUserDocId) : FieldValue.arrayUnion(loggedInUserDocId)
    });
}


export async function getPhotos(userId, following){
    const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();

    const userFollowedPhotos = result.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }));

    const photosWithUserDetailes = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            if(photo.likes.includes(userId)){
                userLikedPhoto = true;
            }

            const user = await getUserByAuth(photo.userId);
            const {username} = user[0];

            return {username, ...photo, userLikedPhoto}
        })
    )

    return photosWithUserDetailes;
}

export async function getPhotosByUsername(username){
    const [user] = await getUserByUsername(username);
    const result = await firebase
    .firestore().collection('photos').where('userId', '==', user.userId).get();

    const photos = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return photos;
}

export async function isUserFollowingProfile(loggedInUsername, profileUserId){
    const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUsername)
    .where('following', 'array-contains', profileUserId)
    .get();

    const [response = {}] = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return response.userId;
}

export async function togFollow(isFollowingProfile, activeUserDocId, profileDocId, profileUserId, followingUserId){
    
    await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);

    await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}