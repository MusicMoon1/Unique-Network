import React, { useEffect, useRef, useState } from 'react'
import Card from '../../../components/Library/Card'
import musicCard from '../../../assets/musicCard.svg';
import cardicon from '../../../assets/cardicon.svg';
import playbtn from '../../../assets/play.svg';
import artist from '../../../assets/artist.svg';
import owner from '../../../assets/owner.svg';
import music from '../../../assets/audio/englishsong.mp3';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { theme } from '../../../utils/Theme';
import { Box, Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import profileimage from '../../../assets/profile.png'
import BorderButton from '../../../components/Profile/BorderButton';
import InputField from '../../../components/Login/InputField';
import BackgroundButton from '../../../components/Login/BackgroundButton';
import IconButton from '../../../components/Login/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useAuthcontexts } from '../../../context/Authcontexts';
import { userProfileUpdate } from '../../../Backend/Backend';

const initiaState = { fullName: "", fbLink: "", bio: "", webUrl: "", xLink: "" }
export default function EditProfile() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTab = useMediaQuery("(max-width:900px)");
  const [state, setState] = useState(initiaState);
  const [images, setImages] = useState({ profile: null });
  const [selectedImage, setSelectedImage] = useState({ profile: null });
  const { user } = useAuthcontexts();

  const fileInputRef = useRef({ profile: null });

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
  useEffect(() => {
    setState({ ...user })
  }, []);

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });

  }

  const handleUpdata = () => {

    let { fullName, fbLink, bio, webUrl, xLink } = state;

    const data = {
      ...user,
      fullName,
      fbLink,
      bio,
      webUrl,
      xLink,
    }
    userProfileUpdate(user,data, images)
    console.log('data', data, images)
  }

  return (
    <>
      <div style={{ width: "100%", background: theme.colors.navColor }}>
        <Navbar />
        <ProfileHeader />
        <div style={{ minHeight: "100vh", margin: '5% 7% 10%', }}>
          <div>
            <Typography variant='h6' sx={{ color: theme.colors.white, fontSize: isMobile ? "3rem" : "4rem", fontWeight: 700, fontFamily: theme.fonts.DM }}>
              Edit profile
            </Typography>
            <Typography variant='h6' sx={{ color: theme.colors.textcolor, fontSize: "1rem", fontWeight: 500, fontFamily: theme.fonts.Poppins }}>
              You can set preferred display name, create your profile URL and manage other personal settings.
            </Typography>
          </div>

          <Divider sx={{ display: isMobile ? "" : "none", background: theme.colors.textcolor, margin: "5% 0" }} />

          <div style={{ width: "100%", height: isMobile ? " 128px" : "180px", margin: "7% 0" }}>
            <div style={{ width: isMobile ? "100%" : "560px", display: "flex", justifyContent: "space-between", }}>
              <div style={{ width: isMobile ? "64px" : "180px", height: isMobile ? "64px" : "180px", }}>
                <img src={selectedImage.profile !== null ? selectedImage.profile : user.profilePhoto.url} alt="profile" width={isMobile ? 64 : 180} height={isMobile ? 64 : 180} style={{ borderRadius: "50%" }} />
              </div>
              <div style={{ width: isMobile ? "250px" : "360px", height: isMobile ? " 128px" : "180px", display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
                <Typography variant='h6' sx={{ color: theme.colors.white, fontSize: isMobile ? "1rem" : "1.37rem", fontWeight: 500, fontFamily: theme.fonts.Poppins }}>
                  Profile Photo
                </Typography>
                <Typography variant='h6' sx={{ color: theme.colors.textcolor, fontSize: isMobile ? "0.8rem" : "1rem", fontWeight: 400, fontFamily: theme.fonts.Poppins }}>
                  We recommend an image of at least 400x400. Gifs work too
                </Typography>
                <BorderButton
                  onClick={() => handleClick('profile')}
                  width={isMobile ? "80px" : "113px"}
                  height={isMobile ? "40" : "56px"}
                  color={theme.colors.white}
                  borderColor={theme.colors.textcolor}
                  fontSize={isMobile ? "14px" : "19px"}
                  fontFamily={theme.fonts.DM}
                  fontWeight={700}
                  borderRadius="40px"
                  text="Upload"
                  children={<input
                    accept="image/*"
                    type="file"
                    style={{ visibility: "hidden", position: "absolute", top: "-9999px" }}
                    onChange={(e) => handleImageChange('profile', e)} ref={(el) => fileInputRef.current['profile'] = el}
                  />
                  }
                />

              </div>
            </div>
          </div>

          <Divider sx={{ display: isMobile ? "" : "none", background: theme.colors.textcolor, margin: "5% 0" }} />


          <div style={{ width: "100%", height: isMobile ? "672px" : isTab ? "800px" : "472px" }}>
            <Grid container sx={{ display: "flex", justifyContent: "space-between" }} >
              <Grid item xs={12} md={5.5} sx={{ width: "100%" }}>
                <Typography variant='h6' sx={{ color: theme.colors.white, fontSize: "1rem", fontWeight: 700, fontFamily: theme.fonts.Poppins }}>
                  Account info
                </Typography>
                <InputField
                  label="display name"
                  inputName="fullName"
                  value={state.fullName}
                  onChange={handleChange}
                  placeholder="Enter your display name"
                  height={isMobile ? "48px" : "67px"}
                />
                <InputField
                  label="portfolio or website"
                  inputName="webUrl"
                  value={state.webUrl}
                  onChange={handleChange}
                  placeholder="Enter URL"
                  height={isMobile ? "48px" : "67px"}
                />
                <InputField
                  label="Bio"
                  inputName="bio"
                  value={state.bio}
                  onChange={handleChange}
                  placeholder="About yourselt in a few words"
                  height={isMobile ? "48px" : "67px"}
                />
              </Grid>
              <Grid item xs={12} md={5.5} sx={{ width: "100%", }}>
                <Typography variant='h6' sx={{ color: theme.colors.white, fontSize: "1rem", fontWeight: 700, fontFamily: theme.fonts.Poppins }}>
                  Social
                </Typography>
                <InputField
                  label="Facebook"
                  inputName="fbLink"
                  value={state.fbLink}
                  onChange={handleChange}
                  placeholder="Your FaceBook URL"
                  height={isMobile ? "48px" : "67px"}
                />
                <InputField
                  label="twitter"
                  inputName="xLink"
                  value={state.xLink}
                  onChange={handleChange}
                  placeholder="@twitter username"
                  height={isMobile ? "48px" : "67px"}
                />
                <IconButton
                  width="322px"
                  height="56px"
                  margin="30px 0 0"
                  text="Add more social account"
                  fontSize="19px"
                  icon={<AddCircleOutlineOutlinedIcon />}
                  boderColor={theme.colors.textcolor}
                  color={theme.colors.textcolor}
                  padding="0.5rem 0"
                />
              </Grid>
            </Grid>
          </div>
          <div style={{ width: "100%", height: isMobile ? "257px" : "215px", margin: "0 0 5%", display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
            <Typography variant='h6' sx={{ color: theme.colors.textcolor, fontSize: isMobile ? "0.87rem" : "1.2rem", fontWeight: 400, fontFamily: theme.fonts.Poppins }}>
              To update your settings you should sign message through your wallet. Click 'Update profile' then sign the message
            </Typography>
            <Divider sx={{ background: theme.colors.textcolor }} />
            <Box sx={{ width: "100%" }}>
              <Box sx={{ width: isMobile ? "100%" : "400px", height: "104px", display: 'flex', justifyContent: "space-between", alignItems: "center", flexDirection: isMobile ? "column" : "" }}>

                <BackgroundButton
                  width={isMobile ? "158px" : "200px"}
                  height={isMobile ? "48px" : "60px"}
                  fontSize={isMobile ? "16px" : "22px"}
                  text="Update Profile"
                  onClick={handleUpdata}
                />
                <IconButton
                  width={isMobile ? "124px" : "150px"}
                  height={isMobile ? "40px" : "60px"}
                  boderColor={theme.colors.navColor}
                  iconColor={theme.colors.textcolor}
                  color={theme.colors.textcolor}
                  fontSize={isMobile ? "16px" : "22px"}
                  text="Clear all"
                // onClick={handleClear}
                />

              </Box>
            </Box>
          </div>
        </div>
        <Footer />
      </div >
    </>
  )
}
