import React, { useEffect, useState } from 'react';
import { Grid, useMediaQuery, Modal, Fade, Typography, Box } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../../components/Library/Card';
import { useFetchNFTs } from '../../../context/FetchNFTs';
import AudioCard from '../../../components/MarketPlace/AudioCard';
import NftInfoCard from '../../../components/MarketPlace/NftInfoCard';
import { theme } from '../../../utils/Theme';
import CloseIcon from '@mui/icons-material/Close';
import { useAuthcontexts } from '../../../context/Authcontexts';
import BackgroundButton from '../../../components/Login/BackgroundButton';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';
import Sdk from '@unique-nft/sdk';
import { KeyringProvider } from '@unique-nft/accounts/keyring';
import { getAlluser } from '../../../Backend/Backend';
// https://rest.unique.network/opal/v1
// https://rest.unique.network/unique/v1
const baseUrl = 'https://rest.unique.network/opal/v1';
const sideBarWidth = 256;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "85%",
    height: "90vh",
    bgcolor: theme.colors.background,
    boxShadow: 24,
    borderRadius: 2,
    overflowY: "scroll",
    p: 2,
};

export default function NftsDetails() {

    const isMobile = useMediaQuery("(max-width:650px)");
    const [detailsNfts, setDetailsNfts] = useState({})
    const [isLoading, setIsLoding] = useState(false)
    const [isSelected, setIsSelected] = useState()
    const [sounds, setSounds] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [buySound, setBuySound] = useState({})
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);


    const [searchParams] = useSearchParams();
    const nftId = searchParams.get('id');
    const { userNFTs, setGetNFTs, getNFTs } = useFetchNFTs();
    const { user } = useAuthcontexts();

    useEffect(() => {
        const nfts = getNFTs.find((nft) => nft.id === nftId)
        setDetailsNfts(nfts)
        setSounds(detailsNfts.sounds)
    }, [detailsNfts, sounds]);

    console.log(detailsNfts, "detailsNfts")
    console.log(user, "user")
    console.log(isSelected, "index")

    const handlePurchase = async (sound) => {

        const valid = detailsNfts.createdBy.email === user.email
        console.log('valid', valid)
        if (valid) {
            return toast.error("You are already the owner of this NFT")
        }
        else {
            setOpen(true);
            setBuySound(sound);
        }

        try {
            const users = await getAlluser();
            setAllUsers(users);
        } catch (error) {
            console.error("Error fetching users:", error.message);
        }
    }

    const nftUser = allUsers?.find(user => user.id === detailsNfts.createdBy.id);

    const toAddress = user?.account.address;
    const fromAddress = nftUser?.account.address;
    const mnemonic = nftUser?.account.mnemonic;
    const price = Number(detailsNfts.price)
    // skd Function

    function createSdk(account) {
        const options = {
            baseUrl,
            signer: account,
        }
        return new Sdk(options);
    }

    const handleGetNft = async (nfts, i) => {
        setIsLoding(true);
        setIsSelected(i)
        nfts.sounds.push(buySound)
        const updatedNft = { ...nfts }

        const signer = await KeyringProvider.fromMnemonic(mnemonic);
        const address = signer.instance.address;
        console.log('first', signer, address)
        const sdk = createSdk(signer);
        const collectionId = detailsNfts.bid;
        const tokenId = buySound.tokenId

        try {
            // transfer ownership
            const txTransfer = await sdk.token.transfer.submitWaitResult({
                collectionId,
                tokenId,
                address,
                to: toAddress,
                from: fromAddress
            })

            const parsedTransfer = txTransfer.parsed

            console.log(`${parsedTransfer?.to} is the new owner of token ${parsedTransfer?.tokenId} 
            from collection ${parsedTransfer?.collectionId}`)

            // transfer Balance
            const { parsed } = await sdk.balance.transfer.submitWaitResult(
                {
                    address: toAddress,
                    destination: fromAddress,
                    amount: price
                });

            console.log('parsed', parsed)

            // Display success toast
            toast.success("Transfer completed successfully");
        } catch (error) {
            // Display error toast
            setIsLoding(false)
            return toast.error(error.message);
        }

        // // transfer ownership
        // const txTransfer = await sdk.token.transfer.submitWaitResult({
        //     collectionId,
        //     tokenId,
        //     address,
        //     to: toAddress,
        //     from: fromAddress
        // })

        // const parsedTransfer = txTransfer.parsed

        // console.log(`${parsedTransfer?.to} is the new owner of token ${parsedTransfer?.tokenId} 
        //     from collection ${parsedTransfer?.collectionId}`)

        // // transfer Balance
        // const { parsed } = await sdk.balance.transfer.submitWaitResult(
        //     {
        //         address: toAddress,
        //         destination: fromAddress,
        //         amount: price
        //     });

        // console.log('parsed', parsed)

        let updateNFT = getNFTs.map(oldNft => {
            if (oldNft.id === nfts.id)
                return nfts
            return oldNft
        })
        setGetNFTs(updateNFT)
        console.log('updatedNft', updatedNft)
        try {
            await updateDoc(doc(firestore, "NFTs", nfts.id), updatedNft);
            setIsLoding(false)
            setOpen(false)
            toast.success("Sound Purchased Successfully")
        } catch (e) {
            console.error("Error adding document: ", e);
            toast.error("SomeThing went Wrong While Purchasing")
            setIsLoding(false)
        }
    }

    return (
        <>
            <Grid container sx={{ width: isMobile ? "300px" : `calc(100% - ${sideBarWidth}px - 3rem)`, display: "flex", justifyContent: "center" }}>
                <Grid item sx={{ width: isMobile ? "95%" : "67%", height: "auto", padding: isMobile ? "5px" : "20px", display: 'flex', flexDirection: 'column' }}>
                    <Card
                        width={"100%"}
                        height={isMobile ? "300px" : "500px"}
                        imagewidth={isMobile ? "280px" : "100%"}
                        imageheight="100%"
                        infoDisplay="none"
                        cardData={{ image: detailsNfts?.coverPhoto?.url, music: detailsNfts?.audio?.url }}
                    />
                </Grid>
                <Grid item sx={{ width: isMobile ? "300px" : "325px", padding: "20px 10px" }}>
                    <Grid item>
                        <NftInfoCard
                            width="100%"
                            height="200px"
                            cardinfowidth="100%"
                            cardinfoheight="100%"
                            musicInfoWidth="100%"
                            musicInfoHeight="50%"
                            musicInfoText1Part2="18px"
                            musicInfoText2Part2="16px"
                            musicInfoText3Part2="18px"
                            musicInfoPart1Width="60px"
                            musicInfoPart1height="60px"
                            musicInfoPart1ImageWidth="60px"
                            musicInfoPart1Imageheight="60px"
                            artistinfopart1width="112px"
                            artistinfopart2width="122px"
                            artistinfopart1height="56px"
                            itemName={detailsNfts?.itemName} itemPrice={detailsNfts?.price}
                            artistName={detailsNfts?.createdBy?.name} ownerName={detailsNfts?.createdBy?.name}
                            itemIcon={detailsNfts?.coverPhoto?.url && detailsNfts?.coverPhoto?.url}
                            artistProfile={detailsNfts?.createdBy?.profileImage?.url} ownerProfile={detailsNfts?.createdBy?.profileImage.url}
                        />
                    </Grid>
                </Grid>
                <Grid container sx={{ gap: "20px", display: "flex", justifyContent: "center" }}>
                    {sounds && (
                        sounds?.map((sound, i) => {
                            return (
                                <AudioCard key={i + 1} soundName={sound.name} sound={sound.url} purchase={() => { handlePurchase(sound) }} />
                            )
                        })
                    )
                    }

                </Grid>
            </Grid>


            {/* Modal of User NFts */}

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}  >
                    <Box sx={style}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                            <Typography id="transition-modal-title" variant="h5" component="h2" style={{ fontWeight: 700, color: theme.colors.white }}>
                                Select any one NFT
                            </Typography>
                            <div style={{ cursor: "pointer", color: "white" }} onClick={handleClose}>
                                <CloseIcon />
                            </div>
                        </div>
                        <Grid container spacing={3} sx={{ display: "flex", justifyContent: isMobile ? "center" : "" }}>
                            {
                                userNFTs?.map((nfts, index) => {
                                    return (
                                        <Grid key={index + 1} item sx={{ display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: "5%" }} >
                                            <Card
                                                width="250px"
                                                height="439px"
                                                imagewidth="250px"
                                                imageheight="258px"
                                                cardinfowidth="250px"
                                                cardinfoheight="180px"
                                                musicInfoWidth="276px"
                                                musicInfoHeight="84px"
                                                musicInfoPart1Width="52px"
                                                musicInfoPart1height="46px"
                                                musicInfoPart1ImageWidth="40px"
                                                musicInfoPart1Imageheight="40px"
                                                musicInfoText1Part2="16px"
                                                musicInfoText2Part2="14px"
                                                musicInfoText3Part2="16px"
                                                artistinfopart1width="112px"
                                                artistinfopart2width="122px"
                                                artistinfopart1height="56px"
                                                artistimageWidth="26px"
                                                artistimageHeight="26px"
                                                link="/dashboard/marketplace"
                                                itemName={nfts.itemName} itemPrice={nfts.price}
                                                artistName={user?.artistName} ownerName={user?.fullName}
                                                itemIcon={nfts.coverPhoto.url && nfts.coverPhoto.url}
                                                artistProfile={user?.profilePhoto.url} ownerProfile={user?.profilePhoto.url}
                                                cardData={{ image: nfts.coverPhoto.url, music: nfts.audio.url }} />
                                            <div style={{ display: "flex", justifyContent: "end", marginTop: "10px" }}>
                                                {
                                                    !isLoading ?
                                                        <BackgroundButton text="Choose" height="40px" fontSize="16px" onClick={() => { handleGetNft(nfts, index) }} />
                                                        : isSelected === index ? <BackgroundButton text="Loding..." height="40px" fontSize="16px" />
                                                            : <BackgroundButton text="Choose" height="40px" fontSize="16px" onClick={() => { handleGetNft(nfts, index) }} />
                                                }
                                            </div>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}
