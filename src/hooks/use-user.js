import React, {useState, useEffect, useContext} from "react";
import UserContext from "../context/user";
import { getUserByAuth } from "../services/firebaseServices";

export default function UseUser() {
    const [activeUser, setActiveUser] = useState({});
    const { user } = useContext(UserContext);

    useEffect(() => {
        async function getUserObject() {
            const [res] = await getUserByAuth(user.uid)
            setActiveUser(res);
        }

        if(user?.uid){
            getUserObject();
        }
    }, [user]);

    return { user: activeUser };
}
