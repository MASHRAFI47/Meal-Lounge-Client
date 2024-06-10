import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../../firebase/firebase.config";
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import axios from 'axios';

const auth = getAuth(app);

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    console.log(user)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (fullName, image) => {
        return updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: image
        }).then(() => {
            setUser({
                displayName: fullName,
                photoURL: image
            })
        })
    }

    const signInUser = async (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogIn = async () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = async () => {
        setLoading(true)
        await axios(`https://meal-lounge-server.vercel.app/logout`, {
            withCredentials: true
        })
        return signOut(auth)
    }

    const saveUser = async (user) => {
        console.log(user)
        const currentUser = {
            email: user?.email,
            name: user?.displayName,
            role: "guest",
            status: "verified",
            membership: "bronze",
        }
        const { data } = await axios.put(`${import.meta.env.VITE_Api_Url}/user`, currentUser)
        return data
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            saveUser(currentUser)
            setLoading(false)
        })
        return () => {
            unSubscribe()
        }
    }, []);

    const authInfo = { user, loading, createUser, signInUser, googleLogIn, updateUserProfile, logOut }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}


AuthProvider.propTypes = {
    children: PropTypes.node,
}

export default AuthProvider