import React, { useEffect } from 'react'
import { theme } from '../../utils/Theme/'
import { Typography } from '@mui/material'
import music from '../../assets/audio/music.mp3'
import image from '../../assets/videoImage.png'
import Card from '../Library/Card'
import IconButton from '../Login/IconButton'
export default function MusicCard({ itemName, itemPrice, itemIcon, artistName, playMusic, ownerName, ownerProfile, artistProfile, nftImage, nftMusic, handleClick }) {
    useEffect(()=>{

    },[nftImage])
    return (
        <div style={{ width: "306px", height: "569px", display: "flex", justifyContent: "space-around", flexDirection: "column", padding: "1.5rem", background: theme.colors.black, borderRadius: "8px", border: ` 1px solid ${theme.colors.borderColor}` }}>
            <div style={{ width: "91px", height: "32px", }}>
                <Typography variant='h6' sx={{ fontSize: "1.5rem", fontWeight: 600, fontFamily: theme.fonts.Light, color: theme.colors.white }}>
                    Preview
                </Typography>
            </div>
            <div style={{ width: "258px", height: "417px", }}>
                <Card
                    width="258px"
                    height="417px"
                    imagewidth="258px"
                    imageheight="258px"
                    cardinfowidth="258px"
                    cardinfoheight="190px"
                    musicInfoWidth="180px"
                    musicInfoHeight="70px"
                    musicInfoPart1Width="43px"
                    musicInfoPart1height="38px"
                    musicInfoPart1ImageWidth="38px"
                    musicInfoPart1Imageheight="38px"
                    musicInfoText1Part2="15px"
                    musicInfoText2Part2="13px"
                    musicInfoText3Part2="15px"
                    artistinfopart1width="102px"
                    artistinfopart2width="102px"
                    artistinfopart1height="47px"
                    artistimageWidth="22px"
                    artistimageHeight="22px"
                    itemName={itemName}
                    itemPrice={itemPrice}
                    itemIcon={itemIcon}
                    artistName={artistName}
                    ownerName={ownerName}
                    artistProfile={artistProfile}
                    ownerProfile={ownerProfile}
                    playMusic={playMusic}
                   
                    cardData={{ image: nftImage, music: nftMusic}} />
            </div>
            {/* <div style={{ width: "63px", height: "24px", }}>
                <IconButton
                    onClick={handleClick}
                    width="95px"
                    height="24px"
                    text="Clear all"
                    fontSize="12px"
                    iconWidth="24px"
                    iconHeight="24px"
                    padding="0"
                    color={theme.colors.yellow}
                    boderColor={theme.colors.black}
                />
            </div> */}


        </div>
    )
}
