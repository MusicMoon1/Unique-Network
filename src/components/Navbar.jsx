import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

import BurgerIcon from "../assets/icons/burgerIcon.png";
import HomeIcon from '@mui/icons-material/Home';
import logoIcon from "../assets/icons/Yellowlogo.png";
import logo from "../assets/logo.png";
import mens from "../assets/mens.png";
import { theme } from "../utils/Theme";
import { Link, useLocation } from "react-router-dom";
import Sdk from '@unique-nft/sdk';
const baseUrl = 'https://rest.unique.network/unique/v1';
import { KeyringProvider } from '@unique-nft/accounts/keyring';
import { useAuthcontexts } from "../context/Authcontexts";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../config/firebase";
import home from "../assets/icons/home.png"
import home2 from "../assets/icons/home2.png"
import dao from "../assets/icons/dao.png"
import dao2 from "../assets/icons/dao2.png"
import library from "../assets/icons/library.png"
import library2 from "../assets/icons/library2.png"
import market from "../assets/icons/market.png"
import market2 from "../assets/icons/market2.png"
export default function Navbar(props) {
  const drawerWidth = 240;
  const { window } = props;
  const location = useLocation()
  const navItems = [{ text: "Home", icon: <HomeIcon /> }];
  const items = [
    { link: "/", icon: home, icon2: home2, text: "Home", width: 19, height: 22 },
    { link: "/dashboard/library", icon: library, icon2: library2, text: "My Library", width: 27, height: 24 },
    { link: "/dashboard/marketplace", icon: market, icon2: market2, text: "Marketplace", width: 30, height: 24 },
    { link: "/dashboard/dao", icon: dao, icon2: dao2, text: "Dao", width: 32, height: 32 }
  ]

  const isMobile = useMediaQuery("(max-width:600px)");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [balance, setBalance] = useState(0);
  const { user, setIsAuthenticated, isAuthenticated } = useAuthcontexts();


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (location.pathname === '/dashboard/profile') {
      setIsProfile(true);
    } else {
      setIsProfile(false);
    }
  }, [location]);


  useEffect(() => {
    getBalance()
  }, [])

  const mnemonic = user?.account?.mnemonic
  // Creating an SDK client
  function createSdk(account) {
    const options = {
      baseUrl,
      signer: account,
    }
    return new Sdk(options);
  }

  const getBalance = async () => {
    const signer = await KeyringProvider.fromMnemonic(mnemonic);
    const address = signer.instance.address;
    const sdk = createSdk(signer);
    const balanceResponse = await sdk.balance.get({ address: address });
    setBalance(Number(balanceResponse.availableBalance.amount))
  }
  console.log('balance', balance)

  const handleLogut = () => {
    signOut(auth)
      .then(() => {
        toast.success("User Successfully Loged Out")

        setIsAuthenticated(false)
      })
      .catch(err => {
        console.log('err', err)
        toast.error("Something Went Wrong While Logging Out")
      })
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", background: theme.colors.background, height: "100vh" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img src={logo} alt="logo" />
      </Typography>
      <Divider />
      <List>
        {items.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: theme.colors.white }}>
                <img src={item.icon} alt={item.text} width={item.width} height={item.height} />
              </ListItemIcon>
              <Link to={item.link} style={{ color: theme.colors.white, textDecoration: "none" }}>
                <ListItemText primary={item.text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box style={{ display: "flex", width: "100%", height: "90px" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          background: theme.colors.background,
          padding: "1rem 0.5rem 0rem",
          height: "90px",
          position: "relative",
          // borderTopLeftRadius: "40px",
          // borderTopRightRadius: "40px",
          zIndex: 1
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0"
          }}
        >
          <Box sx={{ marginRight: isAuthenticated ? "" : "200px" }}>
            {
              props.logotext ? (

                <Typography variant="h6" sx={{ width: "200px", textAlign: "end", display: isMobile ? "none" : "block", marginLeft: "2%", fontSize: "1.5rem", fontFamily: theme.fonts.Light, fontWeight: 500 }}>
                  {props.logotext}
                </Typography>
              ) : (
                isMobile ? (
                  <Link to="/">
                    <img src={logoIcon} alt="logo" />
                  </Link>
                ) : (
                  <Link to="/">
                    <img src={logo} alt="logo" />
                  </Link>
                )
              )
            }
          </Box>


          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              borderLeft: `2px solid ${theme.colors.borderColor}`,
            }}
          >
            <Link to="/about">
              <Button
                sx={{
                  marginLeft: "2rem",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  fontFamily: theme.fonts.Light,
                  color: theme.colors.white,
                  textTransform:"capitalize"
                }}
              >
                About
              </Button>
            </Link>
            <Link to="https://bit.ly/3Ojbldm">
              <Button
                sx={{
                  marginLeft: "1rem",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  fontFamily: theme.fonts.Light,
                  color: theme.colors.white,
                  textTransform:"capitalize"
                }}
              >
                White Paper
              </Button>
            </Link>
            <Link to="#">
              <Button
                sx={{
                  marginLeft: "1rem",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  fontFamily: theme.fonts.Light,
                  color: theme.colors.white,
                  textTransform:"capitalize"
                }}
              >
                How is work
              </Button>
            </Link>
            <Link to="/liveloop">
              <Button
                sx={{
                  marginLeft: "1rem",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  fontFamily: theme.fonts.Light,
                  color: theme.colors.white,
                  textTransform:"capitalize"
                }}
              >
                LiveLoop Software
              </Button>
            </Link>
          </Box>

          <Box>
            {!isAuthenticated ? "" :
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: isMobile ? "11rem" : "35rem",
                  justifyContent: isMobile ? "flex-end" : "space-between",
                }}
              >
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon sx={{ color: theme.colors.textcolor }} />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ sx: { color: theme.colors.textcolor } }}
                  sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.colors.borderColor,
                    },
                    "& .MuiInputBase-input": {
                      color: theme.colors.textcolor,
                    },
                  }}
                />
                {/* <Box
                sx={{
                  width: "2.1rem",
                  height: "2.1rem",
                  borderRadius: "50%",
                  display: "flex",
                  marginRight: isMobile ? "2.5rem" : "",
                  justifyContent: "center",
                  alignItems: "center",
                  background: theme.colors.yellow,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "13px",
                    color: theme.colors.black,
                    fontFamily: theme.fonts.Light,
                    fontWeight: 700,
                  }}
                >
                  23
                </Typography>
              </Box> */}
                {
                  !isAuthenticated ? "" :

                    <Box sx={{ display: "flex" }}>
                      <Box
                        sx={{
                          width: "5rem",
                          height: "2.1rem",
                          borderRadius: "20px",
                          justifyContent: "center",
                          alignItems: "center",
                          background: theme.colors.yellow,
                          marginRight: "0.6rem",
                          display: { xs: "", sm: "flex" },
                        }}
                      >
                        <Link to="/dashboard/createNFT">
                          <Button
                            sx={{
                              fontSize: "14px",
                              color: theme.colors.black,
                              fontFamily: theme.fonts.Light,
                              fontWeight: 700,
                            }}
                          >
                            Upload
                          </Button>
                        </Link>
                      </Box>
                      {
                        !isProfile ?

                          <Box
                            sx={{
                              width: isMobile ? "100%" : "8rem",
                              height: "2.19rem",
                              borderRadius: "20px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",

                              border: `2px solid ${theme.colors.borderColor}`,
                            }}
                          >
                            <Link to="/dashboard/profile" style={{ width: "32px", height: "32px" }}>
                              {user && user.profilePhoto && user.profilePhoto.url ? (
                                <img
                                  src={user.profilePhoto.url}
                                  alt="Profile"
                                  width={32}
                                  height={32}
                                  style={{ borderRadius: "50%" }}
                                />
                              ) : (
                                <img
                                  src={mens}
                                  alt="Default Profile"
                                  width={32}
                                  height={32}
                                  style={{ borderRadius: "50%" }}
                                />
                              )}</Link>
                            <Button
                              sx={{
                                fontSize: "14px",
                                color: theme.colors.white,
                                fontFamily: theme.fonts.Light,
                                fontWeight: 700,
                                margin: "0 0.5rem",
                                display: { xs: "none", sm: "block" },
                              }}
                            >
                              {balance?.toFixed(2)}
                            </Button>
                          </Box> :
                          <Button
                            onClick={handleLogut}
                            sx={{
                              fontSize: "14px",
                              height: "34px",
                              background: theme.colors.yellow,
                              borderRadius: "20px",
                              color: theme.colors.black,
                              fontFamily: theme.fonts.Light,
                              fontWeight: 700,
                              '&:hover': {
                                background: theme.colors.black, // Change background color on hover
                                color: theme.colors.yellow,     // Change text color on hover
                              }
                            }}
                          >
                            Logout
                          </Button>
                      }
                    </Box>
                }
              </Box>
            }
          </Box>
          <Box>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <img src={BurgerIcon} alt="BurgerIcon" width={32} height={32} />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>


    </Box>
  );
}
