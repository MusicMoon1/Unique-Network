import React, { useState } from 'react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import ProfileBox from '../../../components/Profile/ProfileBox'
import { Grid, ToggleButton, ToggleButtonGroup, useMediaQuery } from '@mui/material'
import coverImage from '../../../assets/cover.png'
import { theme } from '../../../utils/Theme'
import Card from '../../../components/Library/Card'
// import image from '../../../assets/videoImage.png'
import music from '../../../assets/audio/englishsong.mp3'
import { useFetchNFTs } from '../../../context/FetchNFTs'
import { useAuthcontexts } from '../../../context/Authcontexts'
import { useRoutes } from 'react-router-dom'



export default function Profile() {

    const isMobile = useMediaQuery("(max-width:600px)");
    const [alignment, setAlignment] = useState('On sale');
    const { userNFTs } = useFetchNFTs();
    const { user } = useAuthcontexts();

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const toggleButtons = [
        { value: "On sale", label: "On sale" },
        { value: "Collectibles", label: "Collectibles" },
        { value: "Created", label: "Created" },
        { value: "Likes", label: "Likes" }
    ];


    return (
        <div>
            <Navbar />
            <Grid container sx={{ background: theme.colors.navColor }}>
                <Grid item xs={12} >
                    <img src={user?.coverPhoto.url} alt="CoverImage" width={"100%"} height={"200px"} />
                </Grid>
                <Grid item xs={12} md={4} sx={{ marginTop: "-15%" }}>
                    <ProfileBox />
                </Grid>
                <Grid item xs={12} md={7} sx={{ padding: "2.5% 0" }}>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                        sx={{
                            width: "fit-content",
                            padding: '5px',
                            margin: "2.5% 0",
                            borderRadius: "20px",
                            display: "inline-block"
                        }}
                    >
                        {toggleButtons.map((button, index) => (
                            <ToggleButton
                                key={index}
                                value={button.value}
                                sx={{
                                    height: "28px",
                                    width: "fit-content",
                                    fontSize: "14px",
                                    color: theme.colors.textcolor,

                                    "&.Mui-selected": {
                                        color: 'black',
                                        backgroundColor: 'white',
                                        borderRadius: "20px"
                                    },
                                }}
                            >
                                {button.label}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>


                    <Grid container spacing={3} sx={{ display: "flex", justifyContent: isMobile ? "center" : "", }}>
                        {
                            userNFTs?.map((nfts, index) => {
                                return (
                                    <Grid key={index + 1} item sx={{ display: "flex", justifyContent: "center", marginBottom: "5%" }}>
                                        <Card
                                            width="300px"
                                            height="489px"
                                            imagewidth="300px"
                                            imageheight="308px"
                                            cardinfowidth="300px"
                                            cardinfoheight="190px"
                                            musicInfoWidth="276px"
                                            musicInfoHeight="84px"
                                            musicInfoPart1Width="52px"
                                            musicInfoPart1height="46px"
                                            musicInfoPart1ImageWidth="46px"
                                            musicInfoPart1Imageheight="46px"
                                            musicInfoText1Part2="18px"
                                            musicInfoText2Part2="16px"
                                            musicInfoText3Part2="18px"
                                            artistinfopart1width="112px"
                                            artistinfopart2width="122px"
                                            artistinfopart1height="56px"
                                            artistimageWidth="26px"
                                            artistimageHeight="26px"
                                            itemName={nfts.itemName} itemPrice={nfts.price}
                                            artistName={user?.artistName} ownerName={user?.fullName}
                                            itemIcon={nfts.coverPhoto.url && nfts.coverPhoto.url}
                                            artistProfile={user?.profilePhoto.url} ownerProfile={user?.profilePhoto.url}
                                            cardData={{ image: nfts.coverPhoto.url, music: nfts.audio.url }} />
                                    </Grid>
                                )
                            })
                        }
                        {/* <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                            <Card
                                width="300px"
                                height="489px"
                                imagewidth="300px"
                                imageheight="308px"
                                cardinfowidth="300px"
                                cardinfoheight="190px"
                                musicInfoWidth="276px"
                                musicInfoHeight="84px"
                                musicInfoPart1Width="52px"
                                musicInfoPart1height="46px"
                                musicInfoPart1ImageWidth="46px"
                                musicInfoPart1Imageheight="46px"
                                musicInfoText1Part2="18px"
                                musicInfoText2Part2="16px"
                                musicInfoText3Part2="18px"
                                artistinfopart1width="112px"
                                artistinfopart2width="122px"
                                artistinfopart1height="56px"
                                artistimageWidth="26px"
                                artistimageHeight="26px"

                                cardData={{ image: image, music: music }} />
                        </Grid> */}
                    </Grid>
                </Grid>
            </Grid>
            <Footer />
        </div>
    )
}
