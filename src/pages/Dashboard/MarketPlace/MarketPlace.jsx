import React, { useEffect, useState } from "react";
import filericon from "../../../assets/icons/filterIcon.svg"
import { theme } from "../../../utils/Theme";
import { Grid, useMediaQuery } from "@mui/material";
import Card from "../../../components/Library/Card";
import { useFetchNFTs } from "../../../context/FetchNFTs";
import { toast } from "react-toastify";
// import MarketSidebar from "../../../components/MarketPlace/MarketSidebar";
// import Navbar from "../../../components/Navbar";
// import Sidebar from "../../../components/Dashboard/Sidebar";
// import image from "../../../assets/videoImage.png"
// import music from "../../../assets/audio/englishsong.mp3"
// import { Link } from "react-router-dom";
// import filericon from "../../../assets/icons/fillericon.svg"

export default function MarketPlace({ filter }) {

  const isMobile = useMediaQuery("(max-width:600px)");
  const [sidebarOpen1, setSidebarOpen1] = useState(true);
  const [nfts, setNfts] = useState([]);
  const { getNFTs } = useFetchNFTs();
  console.log(filter);
  console.log(getNFTs)
  const value = getNFTs.filter((item) => {
    return item?.categories?.some((category) => category === filter);
  });


  useEffect(() => {
    if (value.length) {
      setNfts(value)
    }
    else {
      if (filter !== "") {
        toast.error("Collection not found with " + filter)
      }
      setNfts(getNFTs)
    }

  }, [filter])



  const toggleSidebar = () => {
    setSidebarOpen1(!sidebarOpen1);
  };

  const sideBarWidth = 256;
  return (
    <>
      {/* <Box sx={{ background: theme.colors.black }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            borderRadius: "40px",

          }}
        >
          <Box sx={{
            flexGrow: 1, background: theme.colors.background, borderRadius: "40px",
            overflowY: "auto",
            scrollbarWidth: "",
            '&::-webkit-scrollbar': {
              width: "0em",
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: theme.colors.background,
              borderRadius: "10px",
            },

          }}>
            <Navbar logotext="Market" />
            <Box sx={{ display: "flex", position: "relative" }}>
              <Sidebar boxNo={2} />
              <Grid container sx={{ display: "flex", flexDirection: "row" }}>
                {!isMobile &&
                  <Grid sx={{ width: "100%", display: "flex", flexDirection: "row", margin: isMobile ? "" : "1.5rem" }}>
                    <div style={{ width: sidebarOpen1 ? sideBarWidth + 25 : "auto", }} onClick={toggleSidebar}>
                      <img src={filericon} alt="filericon" />
                      <span style={{ margin: "0 20px", fontSize: "14px", fontWeight: 700, color: theme.colors.textcolor, fontFamily: theme.fonts.Light, }}>{sidebarOpen1 ? "Hide Filters" : ""}</span>
                    </div>
                    <div style={{ width: isMobile ? "100%" : `calc(100% - ${sideBarWidth}px - 3rem)`, display: "flex", alignItems: "center" }}>
                      <p style={{ fontSize: "14px", fontWeight: 400, color: theme.colors.white, fontFamily: theme.fonts.Light, margin: 0 }}>Audio NFTs</p>
                    </div>
                  </Grid>
                }
                {isMobile ?
                  <Grid item style={{ display: "flex", flexDirection: "column", width: sideBarWidth, margin: "1.5rem" }}>
                    <MarketSidebar />
                  </Grid>
                  :
                  <Grid item style={{ display: "flex", flexDirection: "column", width: sidebarOpen1 ? sideBarWidth : 0, overflow: "hidden", transition: "width 0.5s ease", margin: "0 1.5rem" }}>
                    {sidebarOpen1 ? <MarketSidebar /> : ""}
                  </Grid>
                } */}
      <Grid item sx={{ width: isMobile ? "300px" : `calc(100% - ${sideBarWidth}px - 3rem)` }}>
        {isMobile &&
          <p style={{ fontSize: "14px", fontWeight: 400, color: theme.colors.white, fontFamily: theme.fonts.Light, marginLeft: "10px" }}>Audio NFTs</p>
        }
        <Grid container spacing={isMobile ? 0 : 2} sx={{ width: "100%", display: "flex", justifyContent: isMobile ? "center" : "" }}>
          {nfts.map((item, index) => (
            <Grid key={index} item sx={{ margin: isMobile ? "10px 0" : "" }}>
              <Card
                width={isMobile ? "280px" : "300px"}
                height="489px"
                imagewidth={isMobile ? "280px" : "300px"}
                imageheight="308px"
                cardinfowidth={isMobile ? "280px" : "300px"}
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
                link={`/dashboard/marketplace/nftDetail?id=${item.id}`}
                itemName={item?.itemName} itemPrice={item?.price}
                artistName={item?.createdBy?.name} ownerName={item?.createdBy?.name}
                itemIcon={item?.coverPhoto?.url && item?.coverPhoto?.url}
                artistProfile={item?.createdBy?.profileImage?.url} ownerProfile={item.createdBy.profileImage.url}
                cardData={{ image: item?.coverPhoto?.url, music: item.audio.url }}
              />
            </Grid>
          ))}
        </Grid>

        <div>
        </div>
      </Grid>
      {/* </Grid>
            </Box>
          </Box>
        </Box>
      </Box> */}
    </>
  )
}
