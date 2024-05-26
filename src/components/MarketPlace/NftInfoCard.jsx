import React, { useRef, useState, useEffect } from 'react'
import { theme } from '../../utils/Theme';
import { Divider, Typography } from '@mui/material';

import cardicon from "../../../src/assets/cardicon.svg"
import artist from "../../../src/assets/artist.svg"
import owner from "../../../src/assets/owner.svg"

function NftInfoCard({
    width,
    height,
    cardinfowidth,
    cardinfoheight,
    musicInfoHeight,
    musicInfoWidth,
    musicInfoPart1Width,
    musicInfoPart1height,
    musicInfoPart1ImageWidth,
    musicInfoPart1Imageheight,
    musicInfoText1Part2,
    musicInfoText2Part2,
    musicInfoText3Part2,
    artistinfopart1width,
    artistinfopart2width,
    artistinfopart1height,
    artistimageWidth,
    artistimageHeight,
    itemName,
    itemPrice,
    itemIcon,
    artistName,
    artistProfile,
    ownerName,
    ownerProfile,
}) {

    const styles = cardStyle();

    return (
        <div style={{ ...styles, width: width || "200px", height: height || "123px" }}>
            <div style={{ ...styles.cardinfo, width: cardinfowidth || "200px", height: cardinfoheight || "123px" }}>
                <div style={{ ...styles.cardinfo.musicinfo, width: musicInfoWidth || "179px", height: musicInfoHeight || "54px" }}>
                    <div style={{ ...styles.cardinfo.musicinfo.part1, width: musicInfoPart1Width || "39px", height: musicInfoPart1height || "52px" }}>
                        <img src={itemIcon || cardicon} alt="music-card" width={musicInfoPart1ImageWidth || 30} height={musicInfoPart1Imageheight || 30} style={{ borderRadius: "5px" }} />
                    </div>

                    <div style={styles.cardinfo.musicinfo.part2}>
                        <Typography variant='h6' sx={{ ...styles.cardinfo.musicinfo.part2.text1, fontSize: musicInfoText1Part2 || "12px" }}>{itemName || "Video Moon Lady"}</Typography>
                        <Typography variant='h6' sx={{ ...styles.cardinfo.musicinfo.part2.text2, fontSize: musicInfoText2Part2 || "10px" }}>List Price</Typography>
                        <Typography variant='h6' sx={{ ...styles.cardinfo.musicinfo.part2.text3, fontSize: musicInfoText3Part2 || "12px" }}>{itemPrice || "Ξ0.515 ($1.1k)"}</Typography>
                    </div>
                </div>
                <Divider sx={styles.cardinfo.musicinfo.divider} />
                <div style={{ ...styles.cardinfo.artistinfo, }}>
                    <div style={{ ...styles.cardinfo.artistinfo.parts, width: artistinfopart1width || "73px", height: artistinfopart1height || "37px" }}>
                        <Typography variant='h6' sx={{ ...styles.cardinfo.musicinfo.part2.text2, fontSize: musicInfoText2Part2 || "10px" }}>Artist</Typography>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img src={artistProfile || artist} alt="artist" width={artistimageWidth || 17} height={artistimageHeight || 17} style={{ borderRadius: "50%", marginRight: "5px" }} />
                            <Typography variant='h6' sx={{ ...styles.cardinfo.musicinfo.part2.text2, color: theme.colors.white, fontSize: musicInfoText2Part2 || "10px" }}>{artistName || "theredking"}</Typography>
                        </div>
                    </div>
                    <div style={{ ...styles.cardinfo.artistinfo.parts, width: artistinfopart2width || "80px", height: artistinfopart1height || "37px" }}>
                        <Typography style={{ ...styles.cardinfo.musicinfo.part2.text2, fontSize: musicInfoText2Part2 || "10px" }}>Owner</Typography>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img src={ownerProfile || owner} alt="owner" width={artistimageWidth || 17} height={artistimageHeight || 17} style={{ borderRadius: "50%", marginRight: "5px" }} />
                            <Typography variant='h6' sx={{ ...styles.cardinfo.musicinfo.part2.text2, color: theme.colors.white, fontSize: musicInfoText2Part2 || "10px" }}>{ownerName || "josepetbass"}</Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NftInfoCard

const cardStyle = () => {


    const flex = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    return {
        ...flex,
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: theme.colors.fadedGray,
        borderRadius: "0px 0px 12px 12px",

        cardinfo: {
            // width: "200px",
            // height: "123px",
            borderRadius: "0 0 12px 12px",
            boxSizing: "borderBox",
            backgroundColor: theme.colors.fadedGray,
            border: `3px solid ${theme.colors.cardBorder}`,
            musicinfo: {
                // width: "179px",
                // height: "54px",
                margin: "10px 10px 0",
                display: "flex",

                part1: {
                    width: "39px",
                    height: "54px",
                },
                part2: {
                    width: "100%",
                    margin: "0 5px 5px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    text1: {
                        // fontSize: "12px",
                        fontWeight: 700,
                        lineHeight: "16px",
                        color: theme.colors.white,
                        fontFamily: theme.fonts.Light
                    },
                    text2: {
                        // fontSize: "10px",
                        fontWeight: 400,
                        lineHeight: "16px",
                        fontFamily: theme.fonts.Light,
                        color: theme.colors.textcolor,
                    },
                    text3: {
                        // fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "16px",
                        fontFamily: theme.fonts.Light,
                        color: theme.colors.textcolor,
                    },

                },
                divider: {
                    width: "100%",
                    height: "1px",
                    backgroundColor: theme.colors.textcolor,

                }
            },
            artistinfo: {
                // width: "179px",
                // height: "37px",
                margin: "10px 10px 0",
                display: "flex",
                justifyContent: "space-between",
                parts: {
                    // width: "73px",
                    // height: "37px",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                },

            }
        }

    }
}