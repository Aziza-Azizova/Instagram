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

    // console.log(result.docs);

    const filteredResult = result.docs
    .map((user) => ({...user.data(), docId: user.id}))
    .filter((p) => p.userId !== userId && !following.includes(p.userId))

    return filteredResult;
} 