import React, { useState, useRef } from 'react';
import { theme } from '../../utils/Theme';
import { toast } from 'react-toastify';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import profileAvtar from '../../assets/profile1.png';
import IconButton from '../Login/IconButton';
import InputField from '../Login/InputField';
import BackgroundButton from '../Login/BackgroundButton';
import { ethers } from 'ethers';
import { createUserWithEmailAndPasswordAndProfile } from '../../Backend/Backend';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { getAccountFromMnemonic } from '@unique-nft/accounts';
import { serverTimestamp } from 'firebase/firestore';
import { useAuthcontexts } from '../../context/Authcontexts';
import { KeyringProvider } from '@unique-nft/accounts/keyring';

const initialState = { firstName: "", lastName: "", email: "", artistName: "", mobile: "", password: "", confirmPassword: "", bio: "", webUrl: "", fbLink: "", xLink: "" }

export default function RegisterMain() {


    const isMobile = useMediaQuery("(max-width:600px)");
    const [state, setState] = useState(initialState);
    const [images, setImages] = useState({ profile: null, cover: null });
    const [selectedImage, setSelectedImage] = useState({ profile: null, cover: null });
    const { setIsAppLoading } = useAuthcontexts()

    const fileInputRef = useRef({ profile: null, cover: null });

    const handleClick = (type) => {
        fileInputRef.current[type].click();
    };

    const handleImageChange = (type, event) => {
        const file = event.target.files[0];
        setImages({ ...images, [type]: file });

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage({ ...selectedImage, [type]: imageUrl });
        }
    };
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleRegisterClick = async () => {

        const randomMnemonic = ethers.Wallet.createRandom().mnemonic.phrase;

        const signer = await KeyringProvider.fromMnemonic(randomMnemonic);
        const address = signer.instance.address;
        console.log('Signer:', signer);


        let { firstName, lastName, email, artistName, mobile, password, confirmPassword, bio, webUrl, fbLink, xLink, } = state

        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

        if (!images.profile && !images.cover) {
            return toast.warning("Please select an images")
        }

        if (!emailRegex.test(email)) {
            return toast.warning("Please enter a valid Email")
        }

        if (!passwordRegex.test(password)) {
            if (password.length < 8) {
                toast.warning("Password must be at least 8 characters long");
            } else if (!/(?=.*[a-z])/.test(password)) {
                toast.warning("Password must contain at least one lowercase letter");
            } else if (!/(?=.*[A-Z])/.test(password)) {
                toast.warning("Password must contain at least one uppercase letter");
            } else if (!/(?=.*\d)/.test(password)) {
                toast.warning("Password must contain at least one digit");
            } else if (!/(?=.*[!@#\$%\^&\*])/.test(password)) {
                toast.warning("Password must contain at least one special character");
            }
        }

        if (password !== confirmPassword) {
            return toast.error("Passwords do not match")
        }

        firstName = firstName.trim();
        lastName = lastName.trim();
        let fullName = firstName + " " + lastName;
        fullName = fullName.trim();

        const data = {
            firstName,
            lastName,
            fullName,
            artistName,
            email,
            mobile,
            bio,
            webUrl,
            fbLink,
            xLink,
            date: serverTimestamp(),
            id: "",
            account: {
                address,
                mnemonic: randomMnemonic
            }
        }
        console.log('data', data)
            setIsAppLoading(true)
        createUserWithEmailAndPasswordAndProfile(email, password, data, images)
            .then(() => {
                console.log('User created successfully');
                setIsAppLoading(false);
                setState(initialState);
                setImages({ profile: null, cover: null });
                setSelectedImage({ profile: null, cover: null });
            })
            .catch(error => {
                console.error("Error signing up:", error.message);
                setIsAppLoading(false);
            });
    }

    // const handleClear = () => {
    //     setState(initialState)
    //     setImages({ profile: null, cover: null });
    //     setSelectedImage({ profile: null, cover: null });
    // }
    return (
        <Box>
            <Box sx={{ textAlign: "center", minHeight: "102px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography variant='h6' sx={{ color: theme.colors.white, fontSize: isMobile ? "3rem" : "4rem", fontFamily: theme.fonts.Light, fontWeight: 700 }}>Register</Typography>
            </Box>

            <Grid container sx={{ padding: isMobile ? "5% 8%" : "5%" }}>
                <Grid item sx={{ width: isMobile ? "100%" : "50%", height: "181px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Box sx={{ display: { xs: "none", md: "block" }, width: "180px", height: "180px", borderRadius: "50%" }}>

                        <img src={selectedImage?.profile || profileAvtar} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%", }} />

                    </Box>
                    <Box sx={{ width: "65%" }}>

                        <Box sx={{ width: "313px", height: "181px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <Typography variant='h6' sx={{ width: "100%", color: theme.colors.white, fontFamily: theme.fonts.Light, fontWeight: 500, fontSize: "22px" }}>Profile photo</Typography>
                            <Typography variant='h6' sx={{ width: "100%", color: theme.colors.white, fontFamily: theme.fonts.Light, fontWeight: 400, fontSize: "16px" }}>We recommend an image of at least 400x400. Gifs work too</Typography>
                            <IconButton style={{ color: "white" }}
                                onClick={() => handleClick('profile')}
                                text="Upload"
                                fontSize={isMobile ? "16px" : "22px"}
                                padding="0.5rem 0"
                                icon=" "
                                color={theme.colors.textcolor}
                                border={`3px solid ${theme.colors.textcolor}`}
                                children={<input
                                    accept="image/*"
                                    type="file"
                                    style={{ visibility: "hidden", position: "absolute", top: "-9999px" }}
                                    onChange={(e) => handleImageChange('profile', e)} ref={(el) => fileInputRef.current['profile'] = el}
                                />
                                }
                            />
                        </Box>
                    </Box>
                </Grid>
                <Grid item sx={{ width: isMobile ? "100%" : "50%", height: "238px", display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: isMobile ? "5%" : "" }}>
                    <Box
                        sx={{
                            display: { xs: "none", md: "block" },
                            width: "290px",
                            height: "130px",
                            background: "#dadada",
                            borderRadius: "8px"
                        }}
                    >
                        {selectedImage.cover ?
                            <img src={selectedImage.cover} alt="" style={{ width: "100%", height: "100%", borderRadius: "8px", background: theme.colors.darkgrey, }} />
                            :
                            <Box style={{ width: "100%", height: "100%", borderRadius: "8px", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }}>
                                <ImageIcon style={{ color: "#b2b2b2", fontSize: "3rem" }} />
                            </Box>
                        }
                    </Box>

                    <Box sx={{ width: "48%" }}>
                        <Box sx={{ width: "290px", height: "238px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <Typography variant='h6' sx={{ width: "100%", color: theme.colors.white, fontFamily: theme.fonts.Light, fontWeight: 500, fontSize: "22px" }}>Cover photo</Typography>
                            <Typography variant='h6' sx={{ width: "100%", color: theme.colors.white, fontFamily: theme.fonts.Light, fontWeight: 400, fontSize: "16px" }}>We recommend an image of at least 1440x400. Gifs work too, but would create too much noise and are limited to only one loop.</Typography>
                            <IconButton style={{ color: "white" }}
                                onClick={() => handleClick('cover')}
                                text="Upload"
                                fontSize={isMobile ? "16px" : "22px"}
                                padding="0.5rem 0"
                                icon=" "
                                color={theme.colors.textcolor}
                                border={`3px solid ${theme.colors.textcolor}`}
                                children={<input
                                    accept="image/*"
                                    type="file"
                                    style={{ visibility: "hidden", position: "absolute", top: "-9999px" }}
                                    onChange={(e) => handleImageChange('cover', e)} ref={(el) => fileInputRef.current['cover'] = el}
                                />}
                            />
                        </Box>
                    </Box>
                </Grid>


            </Grid>
            <Grid container sx={{ padding: isMobile ? "5% 5%" : "0 5%", display: "flex", justifyContent: "space-between" }}>
                <Grid sx={{ width: isMobile ? "100%" : "47.5%", }}>
                    <Box sx={{ marginBottom: "5%" }}>
                        <Typography variant='h6' sx={{ width: "100%", color: theme.colors.white, fontFamily: theme.fonts.Poppins, fontWeight: 500, fontSize: "22.5px" }}>Account info</Typography>
                    </Box>
                    <Grid container sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <InputField
                            boxWidth={isMobile ? "100%" : "47.5%"}
                            inputName="firstName"
                            value={state.firstName}
                            label="NAME"
                            placeholder="Your name"
                            onChange={handleChange}
                        />
                        <InputField
                            boxWidth={isMobile ? "100%" : "47.5%"}
                            inputName="lastName"
                            value={state.lastName}
                            label="LAST NAME"
                            placeholder="Last name"
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid container>
                        <Grid item sx={{ width: "100%" }}>
                            <InputField
                                inputName="artistName"
                                value={state.artistName}
                                label="Artist name (nickname)"
                                placeholder="Your Artist Name"
                                boxWidth="100%"
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item sx={{ width: "100%" }}>
                            <InputField
                                inputName="email"
                                value={state.email}
                                label="Email"
                                placeholder="Enter your email"
                                boxWidth="100%"
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item sx={{ width: "100%" }}>
                            <InputField
                                inputName="mobile"
                                value={state.mobile}
                                label="Mobile"
                                placeholder="[De]+49 12345678"
                                boxWidth="100%"
                                onChange={handleChange}
                            />
                        </Grid>

                    </Grid>
                    <Grid container>
                        <Grid item sx={{ width: "100%" }}>
                            <InputField
                                label="PASSWORD"
                                inputName="password"
                                value={state.password}
                                placeholder="Your password"
                                boxWidth="100%"
                                type="password"
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item sx={{ width: "100%" }}>
                            <InputField
                                label="VERIFY PASSWORD"
                                inputName="confirmPassword"
                                value={state.confirmPassword}
                                placeholder="Verify password"
                                boxWidth="100%"
                                type="password"
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item sx={{ width: "100%" }}>
                            <InputField
                                label="BIO"
                                inputName="bio"
                                value={state.bio}
                                placeholder="About yourself in a few words"
                                boxWidth="100%"
                                height="100px"
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid sx={{ width: isMobile ? "100%" : "47.5%", }}>
                    <Box sx={{ marginBottom: "5%" }}>
                        <Typography variant='h6' sx={{ width: "100%", color: theme.colors.white, fontFamily: theme.fonts.Poppins, fontWeight: 500, fontSize: "22.5px" }}>Social</Typography>
                    </Box>
                    <Grid container>
                        <Grid item sx={{ width: "100%" }}>
                            <InputField
                                inputName="webUrl"
                                value={state.webUrl}
                                label="YOUR website"
                                placeholder="Enter URL"
                                boxWidth="100%"
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item sx={{ width: "100%" }}>
                            <InputField
                                inputName="xLink"
                                value={state.xLink}
                                label="TWITTER"
                                placeholder="@twitter username"
                                type="text"
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item sx={{ width: "100%" }}>
                            <InputField
                                boxWidth="100%"
                                label="FACBOOK"
                                inputName="fbLink"
                                value={state.fbLink}
                                placeholder="@facebook username"
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item sx={{ marginTop: "5%" }} >
                            <IconButton
                                width={isMobile ? "80%" : "100%"}
                                icon={<AddCircleOutlineOutlinedIcon sx={{ width: "22.5px", height: "22.5px" }} />}
                                fontSize={isMobile ? "16px" : "19px"}
                                text="Add more social account"
                                color={theme.colors.yellow}
                                height="60px"
                                padding="10px"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item sx={{ width: "100%", margin: "3rem 0", display: 'flex', justifyContent: "flex-start", alignItems: "center" }}>
                        <Box sx={{ width: isMobile ? "100%" : "50%", display: 'flex', justifyContent: "space-between" }}>
                            <BackgroundButton
                                width={isMobile ? "100%" : "60%"}
                                height="60px"
                                fontSize={isMobile ? "16px" : "22px"}
                                text="Create account"
                                onClick={handleRegisterClick}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box >
    )
}
