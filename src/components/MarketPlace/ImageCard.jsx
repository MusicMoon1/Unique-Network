import React, { useRef, useState, useEffect } from 'react'
import { theme } from '../../utils/Theme';

import cardimage from "../../../src/assets/videoImage.png"
import audio from "../../../src/assets/audio/englishsong.mp3"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

function ImageCard({
    cardData,
    width,
    height,
    imagewidth,
    imageheight,
    durationBoxWidth,
    durationBoxheight,
    durationBoxFontSize,
    playbtnWidth,
    playbtnHeight,
    playIconSize,
    playbtnTop
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

    console.log('musicDurr', musicDuration);
    console.log('cardData', cardData)

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
    }, [musicDuration, isMusicPlaying, cardData.music]);
    return (
        <div style={{ ...styles, width: width || "200px", height: height || "200px" }}>
            <div style={{ ...styles.videoBox, width: imagewidth || "200px", height: imageheight || "200px" }}>
                <img style={{ ...styles.videoBox.video, width: imagewidth || "200px", height: imageheight || "200px" }} src={cardData.image} alt="card-image" />
                <audio autoPlay={isMusicPlaying} onLoadedMetadata={handleMusicLoaded} ref={audioRef}>
                    <source src={cardData.music} />
                </audio>
                {isMusicPlaying ?
                    <div style={{ ...styles.videoBox.playButton, top: playbtnTop || "80%", width: playbtnWidth || "43px", height: playbtnHeight || "40px" }} onClick={playAudio}>
                        <PauseIcon sx={{ color: "yellow", fontSize: playIconSize || 20 }} />
                    </div>
                    :
                    <div style={{ ...styles.videoBox.playButton, top: playbtnTop || "80%", width: playbtnWidth || "43px", height: playbtnHeight || "40px" }} onClick={playAudio}>
                        <PlayArrowIcon sx={{ color: "yellow", fontSize: playIconSize || 20 }} />
                    </div>
                }
                <div style={{ ...styles.videoBox.duration }}>
                    <div style={{ ...styles.videoBox.duration.current, background: theme.colors.yellow, fontFamily: theme.fonts.Light, width: durationBoxWidth || "24px", height: durationBoxheight || "13px", fontSize: durationBoxFontSize || "9.5px" }}>{formatTime(currentTime)}</div>
                    <div style={{ ...styles.videoBox.duration.current, background: theme.colors.yellow, fontFamily: theme.fonts.Light, width: durationBoxWidth || "24px", height: durationBoxheight || "13px", fontSize: durationBoxFontSize || "9.5px" }}>{formatTime(remainingTime)}</div>
                </div>
                <div style={{ ...styles.videoBox.overley, width: `${overlayWidth}%`, }} />
            </div>
        </div>
    )
}

export default ImageCard

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
        videoBox: {
            position: "relative",
            video: {
                height: "200px",
                width: "200px",
            },
            playButton: {
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                backgroundColor: "#000000",
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
                    fontWeight: 400,
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
                transition: "width 1s linear",

            }
        }
    }
}