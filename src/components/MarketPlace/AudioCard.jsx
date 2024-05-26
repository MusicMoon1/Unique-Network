import React, { useEffect, useRef, useState } from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import music from '../../assets/audio/englishsong.mp3';
import { theme } from '../../utils/Theme';
import BackgroundButton from '../Login/BackgroundButton';
import Lottie from 'react-lottie';
import animationData from '../../assets/Animation.json';

export default function AudioCard({ purchase, sound, soundName }) {

    const isMobile = useMediaQuery("(max-width:650px)");
    const [playing, setPlaying] = useState(false);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const audioRef = useRef(null);


    const playAudio = () => {
        if (!isMusicPlaying) {
            setPlaying(true);
            audioRef.current.play();
            setIsMusicPlaying(true);
        } else {
            setPlaying(false);
            audioRef.current.pause();
            setIsMusicPlaying(false);
        }
    };


    const musicName = music.split('/').pop().replace(/\.[^/.]+$/, '');

    if (soundName?.length > 0) {
        const songNameWithExtension = soundName.split('-').slice(1).join('-').replace(/\.[^/.]+$/, '')
        soundName = songNameWithExtension.substring(0, 15);
    } else {
        soundName = "Not available"
    }
    return (
        <Grid sx={{ width: isMobile ? "280px" : "250px" }}>
            <div className={"container example"} style={{ background: theme.colors.fadedGray, borderRadius: "10px", padding: "10px 0" }}>
                <Lottie
                    options={{
                        loop: true,
                        autoplay: false, // Set autoplay to false initially
                        animationData: animationData,
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice'
                        }
                    }}
                    height={100}
                    width={200}
                    isPaused={!playing} // Add isPaused prop to control animation based on playing state
                />

                <audio autoPlay={isMusicPlaying} ref={audioRef}>
                    <source src={sound} />
                </audio>

                <div style={{ display: "flex", marginTop: "15px" }}>
                    <div
                        className="play button"
                        style={{
                            background: theme.colors.yellow, width: "30px", height: "30px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "50%",
                            margin: "0 10px"
                        }}
                        onClick={playAudio}
                    >
                        {!playing ? "▶" : "■"}
                    </div>
                    <div style={{ color: theme.colors.white }}>
                        {soundName}
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "end", margin: "10px 0" }}>
                <BackgroundButton
                    text="Purchase"
                    height="40px"
                    fontSize="16px"
                    onClick={purchase}
                />
            </div>
        </Grid>
    )
}
