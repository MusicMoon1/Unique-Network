import React, { useRef, useState, useEffect } from 'react'
import { theme } from '../../utils/Theme';
import { Divider, Typography } from '@mui/material';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import play from "../../../src/assets/play.svg"
import cardimage from "../../../src/assets/musicCard.svg"
import cardicon from "../../../src/assets/cardicon.svg"
import artist from "../../../src/assets/artist.svg"
import owner from "../../../src/assets/owner.svg"
import audio from "../../../src/assets/audio/englishsong.mp3"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';




import './card.css'
import { Link } from 'react-router-dom';
function Card({
    cardData,
    width,
    height,
    imagewidth,
    imageheight,
    infoDisplay,
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
    link
}) {

    const styles = cardStyle();
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [overlayWidth, setOverlayWidth] = useState(0);
    const [musicDuration, setMusicDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0);
    const audioRef = useRef(null);


    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${formattedSeconds}`;
    };


    useEffect(() => {
        if (isMusicPlaying) {
            const interval = setInterval(() => {
                setCurrentTime(audioRef.current.currentTime);
                setRemainingTime(isMusicPlaying ? musicDuration - audioRef.current.currentTime : musicDuration);
                setOverlayWidth(prevWidth => {
                    if (prevWidth >= 100) {
                        clearInterval(interval);
                        setIsMusicPlaying(false);
                        return 0;
                    }
                    return prevWidth + (98 / musicDuration);
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [musicDuration, isMusicPlaying, cardData.music]);

    // console.log('musicDurr', musicDuration);
    // console.log('cardData', cardData)

    const playAudio = () => {
        if (!isMusicPlaying) {
            audioRef.current.play();
            setIsMusicPlaying(true);
        }
        else {
            audioRef.current.pause();
            setIsMusicPlaying(false);

        }
    };

    const handleMusicLoaded = (event) => {
        // Set the music duration when it's loaded
        setMusicDuration(event.target.duration);
    };


    useEffect(() => {
        const handleLoadedMetadata = (e) => {
            setMusicDuration(e.target.duration);
        };

        if (audioRef.current) {
            audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
            }
        };
    }, [musicDuration, isMusicPlaying, cardData.music, cardData.image]);
    return (
        cardData.image &&
        <div style={{ ...styles, width: width || "200px", height: height || "323px" }}>
            <div style={{ ...styles.videoBox, width: imagewidth || "200px", height: imageheight || "200px" }}>
                {
                    cardData.image && <img style={{ ...styles.videoBox.video, width: imagewidth || "200px", height: imageheight || "200px" }} src={cardData.image} alt="card-image" />

                }
                <audio autoPlay={isMusicPlaying} onLoadedMetadata={handleMusicLoaded} ref={audioRef}>
                    <source src={cardData.music} />
                </audio>
                {isMusicPlaying ?
                    <div style={{ ...styles.videoBox.playButton }} onClick={playAudio}>
                        <PauseIcon sx={{ color: "yellow" }} />
                    </div>
                    :
                    <div style={{ ...styles.videoBox.playButton }} onClick={playAudio}>
                        <PlayArrowIcon sx={{ color: "yellow" }} />
                    </div>
                }
                <div style={{ ...styles.videoBox.duration }}>
                    <div style={{ ...styles.videoBox.duration.current, background: theme.colors.yellow, fontFamily: theme.fonts.Light }}>{formatTime(currentTime)}</div>
                    <div style={{ ...styles.videoBox.duration.current, background: theme.colors.yellow, fontFamily: theme.fonts.Light }}>{formatTime(remainingTime)}</div>
                </div>
                <div style={{ ...styles.videoBox.overley, width: `${overlayWidth}%`, }} />
            </div>

            <div style={{ ...styles.cardinfo, display: infoDisplay, width: cardinfowidth || "200px", height: cardinfoheight || "123px" }}>
                <Link to={link} style={{ textDecoration: "none", }}>
                    <div style={{ ...styles.cardinfo.musicinfo, width: musicInfoWidth || "179px", height: musicInfoHeight || "54px" }}>
                        <div style={{ ...styles.cardinfo.musicinfo.part1, width: musicInfoPart1Width || "39px", height: musicInfoPart1height || "52px" }}>
                            <img src={itemIcon || cardicon} alt="music-card" width={musicInfoPart1ImageWidth || 30} height={musicInfoPart1Imageheight || 30} style={{ borderRadius: "5px" }} />
                        </div>

                        <div style={styles.cardinfo.musicinfo.part2}>
                            <Typography variant='h6' sx={{ ...styles.cardinfo.musicinfo.part2.text1, fontSize: musicInfoText1Part2 || "12px" }}>
                                {itemName ||
                                    <SkeletonTheme baseColor="#191b42" highlightColor="#444">
                                        <Skeleton width={100} />
                                    </SkeletonTheme>}
                            </Typography>
                            <Typography variant='h6' sx={{ ...styles.cardinfo.musicinfo.part2.text2, fontSize: musicInfoText2Part2 || "10px" }}>
                                {itemPrice ? "List Price":
                                    <SkeletonTheme baseColor="#191b42" highlightColor="#444">
                                        <Skeleton width={120} />
                                    </SkeletonTheme>}
                            </Typography>
                            <Typography variant='h6' sx={{ ...styles.cardinfo.musicinfo.part2.text3, fontSize: musicInfoText3Part2 || "12px" }}>
                                {itemPrice ||
                                    <SkeletonTheme baseColor="#191b42" highlightColor="#444">
                                        <Skeleton width={150} />
                                    </SkeletonTheme>}
                            </Typography>
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
                </Link>
            </div>

        </div>
    )
}

export default Card

const cardStyle = () => {


    const flex = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    return {
        ...flex,
        // width: width || "200px",
        // height: height || "323px",
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: theme.colors.fadedGray,
        borderRadius: "0px 0px 12px 12px",
        videoBox: {
            // width: "200px",
            // height: "200px",
            position: "relative",
            video: {
                height: "200px",
                width: "200px",
            },
            playButton: {
                width: "43px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                backgroundColor: "#000000",
                top: "80%",
                left: "5%",
                position: "absolute",
                zIndex: 3

            },
            duration: {
                width: "100%",
                position: "absolute",
                display: "flex",
                justifyContent: "space-between",
                top: "50%",
                current: {
                    width: "24px",
                    height: "13px",
                    fontWeight: 400,
                    fontSize: "9.5px",
                    textAlign: "center",
                    color: "#000000",
                    zIndex: 3
                }
            },
            overley: {
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255, 255, 50, 0.25)",
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
                transition: "width 1s linear",

            }
        },
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