import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { firestore } from '../config/firebase';
import { useAuthcontexts } from './Authcontexts';

const FetchNFTs = createContext();

export default function FetchNFTsProvider({ children }) {

    const [getNFTs, setGetNFTs] = useState([]);
    const [userNFTs, setUserNFTs] = useState([]);
    const { user } = useAuthcontexts()


    const showNFTS = async () => {

        const q = query(collection(firestore, "NFTs"));

        try {
            const docArray = [];
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                docArray.push(data);
            });

            setGetNFTs(docArray);

        } catch (error) {
            console.error("Error fetching NFTs:", error.message);
        }


    }
    let userNft
    useEffect(() => {
        user && showNFTS();
        setUserNFTs(userNft)
    }, [user]);

    userNft = getNFTs && getNFTs.filter((nfts) => {
        return nfts.createdBy.id === user.id
    })

    return (
        <FetchNFTs.Provider value={{ getNFTs, showNFTS, setGetNFTs, userNFTs, setUserNFTs }}>
            {children}
        </FetchNFTs.Provider>
    );
}

export const useFetchNFTs = () => useContext(FetchNFTs);
