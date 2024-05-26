import React, { useEffect, useRef, useState } from 'react'
import { theme } from '../../utils/Theme';
import audio from '../../assets/audio/englishsong.mp3'
import cardimage from '../../assets/videoImage.png'
import playimage from '../../assets/play.svg'
import { useMediaQuery } from '@mui/material';

export default function VideoCard() {
    const isMobile = useMediaQuery("(max-width:600px)");
    const styles = cardStyle();
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [overlayWidth, setOverlayWidth] = useState(0);
    const [musicDuration, setMusicDuration] = useState(0);
    const audioRef = useRef(null);


    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                console.log('Permission granted');
                // You can now use the stream from the microphone
            })
            .catch(function (err) {
                console.error('Permission denied or error:', err);
            });
        if (isMusicPlaying) {
            // Start the interval to increment overlayWidth
            const interval = setInterval(() => {
                setOverlayWidth(prevWidth => {
                    // If overlayWidth reaches 100%, stop the interval and reset states
                    if (prevWidth >= 100) {
                        clearInterval(interval);
                        setIsMusicPlaying(false);
                        return 0;
                    }
                    // Increment overlayWidth linearly based on musicDuration
                    return prevWidth + (99 / musicDuration);
                });
            }, 1000); // Adjust the interval duration as needed

            // Clean up interval on component unmount
            return () => clearInterval(interval);
        }
    }, [musicDuration, isMusicPlaying]);


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
            console.log('Metadata loaded');
            // Handle any logic related to loaded metadata
            setMusicDuration(e.metadata.duration);
        };

        if (audioRef.current) {
            audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
            }
        };
    }, [musicDuration, isMusicPlaying]);
    return (
        <div style={{ styles, width: isMobile && "345px", height: isMobile && "345px" }}>
            <div style={{ ...styles.videoBox, width: isMobile && "345px", height: isMobile && "345px" }}>
                <img style={{ ...styles.videoBox.video, width: isMobile && "345px", height: isMobile && "345px" }} src={cardimage} alt="card-image" />
                <audio autoPlay={isMusicPlaying} onLoadedMetadata={handleMusicLoaded} ref={audioRef}>
                    <source src={audio} />
                </audio>
                <img src={playimage} width={isMobile ? 54 : 140} height={isMobile ? 50 : 70} style={{
                    ...styles.videoBox.playButton, top: isMobile ? "80%" : "85%", left: isMobile ? "5%" : "0%", filter: isMusicPlaying ? 'invert(100%)' : ""
                }} alt="" onClick={playAudio} />
                <div style={{ ...styles.videoBox.overley, width: `${overlayWidth}%`, }} />
            </div>
        </div>
    )
}


const cardStyle = () => {


    const flex = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    return {
        ...flex,
        height: "636px",
        width: "636px",
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: theme.colors.fadedGray,
        borderRadius: "0px 0px 12px 12px",
        videoBox: {
            width: "636px",
            height: "636px",
            position: "relative",
            video: {
                width: "636px",
                height: "636px"
            },
            playButton: {

                top: "85%",
                left: "0%",
                position: "absolute",
                zIndex: 3,


            },
            overley: {
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",

                backgroundColor: "rgba(0,0,0,0.5)",
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
                transition: "width 1s linear",

            }
        },
    }
}