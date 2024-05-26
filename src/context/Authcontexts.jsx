import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, firestore } from '../config/firebase'
import { doc, getDoc } from 'firebase/firestore'



const Authcontexts = createContext()


export default function Authcontextsprovider({ children }) {

  const [user, setUser] = useState({})

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAppLoading, setIsAppLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        readUserProfile(user)
        setIsAuthenticated(true)

      } else {
        setIsAppLoading(false)
      }
    });
  }, [])


  const readUserProfile = async (user) => {
    const docRef = doc(firestore, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const user = docSnap.data()
      setUser(user)
      setIsAppLoading(false);
    } else {
      console.log("User data not found")
    }
  }

  const refreshData = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        readUserProfile(user)
        setIsAuthenticated(true)

      } else {
        // setIsAppLoading(false)
      }
    });
  }

  return (
    <Authcontexts.Provider value={{ user, isAuthenticated, setIsAuthenticated, setIsAppLoading, isAppLoading, refreshData }}>
      {children}
    </Authcontexts.Provider>
  )
}


export const useAuthcontexts = () => useContext(Authcontexts)


