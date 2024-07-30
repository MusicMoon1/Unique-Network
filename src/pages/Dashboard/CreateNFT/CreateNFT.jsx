import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  useMediaQuery,
  FormControlLabel,
} from "@mui/material";
import React, { useRef, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { theme } from "../../../utils/Theme";
import { Link } from "react-router-dom";
import InputField from "../../../components/Login/InputField";
import AntSwitcher from "../../../components/CreateNFTs/AntSwitcher";

import leftArrow from "../../../assets/icons/leftArrow.png";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import backgroundImage from "../../../assets/videoImage.png";
import CustomCard from "../../../components/CreateNFTs/CustomCard";
import MusicCard from "../../../components/CreateNFTs/MusicCard";
import { useAuthcontexts } from "../../../context/Authcontexts";
import { useFetchNFTs } from "../../../context/FetchNFTs";
import { createNewNft } from "../../../Backend/Backend";
import { toast } from "react-toastify";
import { categories } from "../../../Constants";

const initialState = {
  itemName: "",
  description: "",
  price: 0,
  size: "",
  style: "",
  instrument: "",
};

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function CreateNFT() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [state, setState] = useState(initialState);
  const [personName, setPersonName] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [media, setMedia] = useState({
    cover: null,
    audio: null,
    sound1: null,
    sound2: null,
    sound3: null,
    sound4: null,
  });
  const [selectedMedia, setSelectedMedia] = useState({
    cover: null,
    audio: null,
    sound1: null,
    sound2: null,
    sound3: null,
    sound4: null,
  });
  const { user } = useAuthcontexts();
  const { setGetNFTs, getNFTs } = useFetchNFTs();
  const handleCheckboxChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const fileInputRef = useRef({
    cover: null,
    audio: null,
    sound1: null,
    sound2: null,
    sound3: null,
    sound4: null,
  });

  const handleCategory = (event) => {
    const {
      target: { value },
    } = event;

    // Check if the number of selected values exceeds 4
    if (value.length > 4) {
      // Show error message and do not update the state
      toast.warning("You can only select up to 4 values.");
    } else {
      // If within the limit, update the state with the selected values and clear the error message
      setPersonName(value);
    }
  };

  console.log("personName", personName);

  const handleClick = (type) => {
    fileInputRef.current[type].click();
  };

  const handleImageChange = (type, event) => {
    const file = event.target.files[0];
    setMedia({ ...media, [type]: file });

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedMedia({ ...selectedMedia, [type]: imageUrl });
    }
  };
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const mnemonic = user.account.mnemonic;

  const handleSubmit = () => {
    if (termsAccepted) {
      let { itemName, description, price, size, style, instrument } = state;

      if (!media.cover) {
        return toast.error("please upload a cover photo");
      }
      if (!media.audio) {
        return toast.error("please upload a audio");
      }
      if (!media.sound1 && !media.sound2 && !media.sound3 && !media.sound4) {
        return toast.error("Please upload at least one sound");
      }
      setIsLoding(true);

      const data = {
        itemName: itemName,
        description: description,
        price: price,
        categories: personName,
        id: Math.random().toString(36).slice(2),
        createdBy: {
          id: user.id,
          name: user.fullName,
          email: user.email,
          profileImage: user.profilePhoto,
        },
      };
      console.log("data", data);
      createNewNft(data, media, setGetNFTs, getNFTs, mnemonic)
        .then(() => {
          console.log("NFT created successfully");
          setIsLoding(false);
          setState(initialState);
          setMedia({ cover: null, audio: null });
          setSelectedMedia({ cover: null, audio: null });
        })
        .catch((error) => {
          console.error("Error creating NFT:", error);
          setIsLoding(false);
        });
    } else {
      toast.error("Please accept terms and conditions");
    }
  };
  const handleClear = () => {
    setState(initialState);
    setMedia({ cover: null, audio: null });
    setSelectedMedia({ cover: null, audio: null });
  };

  console.log("mnemonic", mnemonic);
  return (
    <div style={{ background: theme.colors.navColor }}>
      <Navbar />
      <Grid>
        <Grid
          container
          style={{ margin: "5% 0", display: "flex", justifyContent: "center" }}
        >
          <Grid
            item
            sx={{
              height: isMobile ? "1850px" : "1623px",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                width: isMobile ? "350px" : "525px",
                height: "112px",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <Button
                sx={{
                  width: isMobile ? "190px" : "222px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0 15px",
                  border: `3px solid ${theme.colors.textcolor}`,
                  borderRadius: "40px",
                }}
              >
                <img src={leftArrow} alt="" />
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.colors.white,
                    fontSize: isMobile ? "13px" : "14px",
                    fontFamily: theme.fonts.Light,
                  }}
                >
                  <Link
                    to="/profile"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Switch to Multiple
                  </Link>
                </Typography>
              </Button>
              <Typography
                variant="h6"
                sx={{
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: isMobile ? "1.8rem" : "2.9rem",
                  fontFamily: theme.fonts.Light,
                  fontWeight: 500,
                  color: theme.colors.white,
                }}
              >
                Create single collectible
              </Typography>
            </div>
            <div
              style={{
                width: isMobile ? "350px" : "502px",
                height: "49px",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1rem",
                  fontFamily: theme.fonts.Light,
                  fontWeight: 500,
                  color: theme.colors.white,
                }}
              >
                Upload Image Cover
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                  fontFamily: theme.fonts.Light,
                  fontWeight: 500,
                  color: theme.colors.textcolor,
                }}
              >
                Drag or choose your file to upload
              </Typography>
            </div>
            <div
              style={{
                width: isMobile ? "350px" : "525px",
                height: "118px",
                cursor: "pointer",
                background: theme.colors.darkgrey,
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => handleClick("cover")}
            >
              <div
                style={{
                  width: "100%",
                  height: "54px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <UploadFileIcon
                    sx={{
                      width: "24px",
                      height: "24px",
                      color: theme.colors.textcolor,
                    }}
                  />
                </div>
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "0.65rem",
                    fontFamily: theme.fonts.Light,
                    fontWeight: 400,
                    color: theme.colors.textcolor,
                  }}
                >
                  {media.cover
                    ? media.cover.name
                    : "JPG, MP4 Gif, PNG, SVG. Max 100Mb"}
                </Typography>
              </div>
              <input
                accept="image/*"
                type="file"
                style={{
                  visibility: "hidden",
                  position: "absolute",
                  top: "-9999px",
                }}
                onChange={(e) => handleImageChange("cover", e)}
                ref={(el) => (fileInputRef.current["cover"] = el)}
              />
            </div>
            <div
              style={{
                width: isMobile ? "350px" : "525px",
                height: isMobile ? "500px" : "243px",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1rem",
                  fontFamily: theme.fonts.Light,
                  fontWeight: 500,
                  color: theme.colors.white,
                }}
              >
                Upload file
              </Typography>
              <Grid
                container
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                <Grid
                  item
                  sx={{
                    width: "15rem",
                    height: "203px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: theme.colors.darkgrey,
                    borderRadius: "8px",
                    marginBottom: "5%",
                  }}
                >
                  <div
                    style={{
                      width: "154px",
                      height: "41px",
                      display: "flex",
                      cursor: "pointer",
                      justifyContent: "space-between",
                      flexDirection: "column",
                    }}
                    onClick={() => handleClick("audio")}
                  >
                    <div style={{ textAlign: "center" }}>
                      <UploadFileIcon
                        sx={{
                          width: "24px",
                          height: "24px",
                          color: theme.colors.textcolor,
                        }}
                      />
                    </div>
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: "center",
                        width: "wrap-content",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        lineHeight: "20px",
                        fontSize: "0.65rem",
                        fontFamily: theme.fonts.Light,
                        fontWeight: 400,
                        color: theme.colors.textcolor,
                        overflow: media.audio !== null ? "hidden" : "",
                        whiteSpace: media.audio !== null ? "nowrap" : "",
                        textOverflow: media.audio !== null ? "ellipsis" : "",
                      }}
                    >
                      {media.audio
                        ? media.audio.name
                        : "MP4 or MP3. Max 1Gb. Drag or choose your file to upload"}
                    </Typography>

                    <input
                      type="file"
                      style={{
                        visibility: "hidden",
                        position: "absolute",
                        top: "-9999px",
                      }}
                      onChange={(e) => handleImageChange("audio", e)}
                      ref={(el) => (fileInputRef.current["audio"] = el)}
                      accept="audio/*"
                    />
                  </div>
                </Grid>
                <Grid
                  item
                  sx={{
                    width: "15rem",
                    height: "203px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: theme.colors.darkgrey,
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "153px",
                      height: "41px",
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <UploadFileIcon
                        sx={{
                          width: "24px",
                          height: "24px",
                          color: theme.colors.textcolor,
                        }}
                      />
                    </div>
                    <Typography
                      variant="h6"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        lineHeight: "20px",
                        fontSize: "0.65rem",
                        fontFamily: theme.fonts.Light,
                        fontWeight: 400,
                        color: theme.colors.textcolor,
                      }}
                    >
                      MP4 or MP3. Max 1Gb Or select from LiveLoop Cloud..
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div
              style={{
                width: isMobile ? "350px" : "525px",
                height: isMobile ? "500px" : "120px",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1rem",
                  fontFamily: theme.fonts.Light,
                  fontWeight: 500,
                  color: theme.colors.white,
                }}
              >
                Upload audio file
              </Typography>
              <Grid
                container
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                <Grid
                  item
                  sx={{
                    width: "7rem",
                    height: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: theme.colors.darkgrey,
                    borderRadius: "8px",
                    marginBottom: "5%",
                  }}
                >
                  <div
                    style={{
                      width: "6rem",
                      height: "41px",
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                    }}
                    onClick={() => handleClick("sound1")}
                  >
                    <div style={{ textAlign: "center" }}>
                      <UploadFileIcon
                        sx={{
                          width: "24px",
                          height: "24px",
                          color: theme.colors.textcolor,
                        }}
                      />
                    </div>
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: "center",
                        width: "wrap-content",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        lineHeight: "20px",
                        fontSize: "0.65rem",
                        fontFamily: theme.fonts.Light,
                        fontWeight: 400,
                        color: theme.colors.textcolor,
                        overflow: media.sound1 !== null ? "hidden" : "",
                        whiteSpace: media.sound1 !== null ? "nowrap" : "",
                        textOverflow: media.sound1 !== null ? "ellipsis" : "",
                      }}
                    >
                      {media.sound1
                        ? media.sound1.name.substring(0, 10) + "..."
                        : "upload fisrt audio"}
                    </Typography>

                    <input
                      type="file"
                      style={{
                        visibility: "hidden",
                        position: "absolute",
                        top: "-9999px",
                      }}
                      onChange={(e) => handleImageChange("sound1", e)}
                      ref={(el) => (fileInputRef.current["sound1"] = el)}
                      accept="audio/*"
                    />
                  </div>
                </Grid>
                <Grid
                  item
                  sx={{
                    width: "7rem",
                    height: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: theme.colors.darkgrey,
                    borderRadius: "8px",
                    marginBottom: "5%",
                  }}
                >
                  <div
                    style={{
                      width: "6rem",
                      height: "41px",
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                    }}
                    onClick={() => handleClick("sound2")}
                  >
                    <div style={{ textAlign: "center" }}>
                      <UploadFileIcon
                        sx={{
                          width: "24px",
                          height: "24px",
                          color: theme.colors.textcolor,
                        }}
                      />
                    </div>
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: "center",
                        width: "wrap-content",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        lineHeight: "20px",
                        fontSize: "0.65rem",
                        fontFamily: theme.fonts.Light,
                        fontWeight: 400,
                        color: theme.colors.textcolor,
                        overflow: media.audio !== null ? "hidden" : "",
                        whiteSpace: media.audio !== null ? "nowrap" : "",
                        textOverflow: media.audio !== null ? "ellipsis" : "",
                      }}
                    >
                      {media.sound2
                        ? media.sound2.name.substring(0, 10) + "..."
                        : "upload second audio"}
                    </Typography>

                    <input
                      type="file"
                      style={{
                        visibility: "hidden",
                        position: "absolute",
                        top: "-9999px",
                      }}
                      onChange={(e) => handleImageChange("sound2", e)}
                      ref={(el) => (fileInputRef.current["sound2"] = el)}
                      accept="audio/*"
                    />
                  </div>
                </Grid>
                <Grid
                  item
                  sx={{
                    width: "7rem",
                    height: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: theme.colors.darkgrey,
                    borderRadius: "8px",
                    marginBottom: "5%",
                  }}
                >
                  <div
                    style={{
                      width: "6rem",
                      height: "41px",
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                    }}
                    onClick={() => handleClick("sound3")}
                  >
                    <div style={{ textAlign: "center" }}>
                      <UploadFileIcon
                        sx={{
                          width: "24px",
                          height: "24px",
                          color: theme.colors.textcolor,
                        }}
                      />
                    </div>
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: "center",
                        width: "wrap-content",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        lineHeight: "20px",
                        fontSize: "0.65rem",
                        fontFamily: theme.fonts.Light,
                        fontWeight: 400,
                        color: theme.colors.textcolor,
                        overflow: media.audio !== null ? "hidden" : "",
                        whiteSpace: media.audio !== null ? "nowrap" : "",
                        textOverflow: media.audio !== null ? "ellipsis" : "",
                      }}
                    >
                      {media.sound3
                        ? media.sound3.name.substring(0, 10) + "..."
                        : "upload third audio"}
                    </Typography>

                    <input
                      type="file"
                      style={{
                        visibility: "hidden",
                        position: "absolute",
                        top: "-9999px",
                      }}
                      onChange={(e) => handleImageChange("sound3", e)}
                      ref={(el) => (fileInputRef.current["sound3"] = el)}
                      accept="audio/*"
                    />
                  </div>
                </Grid>
                <Grid
                  item
                  sx={{
                    width: "7rem",
                    height: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: theme.colors.darkgrey,
                    borderRadius: "8px",
                    marginBottom: "5%",
                  }}
                >
                  <div
                    style={{
                      width: "6rem",
                      height: "41px",
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                    }}
                    onClick={() => handleClick("sound4")}
                  >
                    <div style={{ textAlign: "center" }}>
                      <UploadFileIcon
                        sx={{
                          width: "24px",
                          height: "24px",
                          color: theme.colors.textcolor,
                        }}
                      />
                    </div>
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: "center",
                        width: "wrap-content",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        lineHeight: "20px",
                        fontSize: "0.65rem",
                        fontFamily: theme.fonts.Light,
                        fontWeight: 400,
                        color: theme.colors.textcolor,
                        overflow: media.audio !== null ? "hidden" : "",
                        whiteSpace: media.audio !== null ? "nowrap" : "",
                        textOverflow: media.audio !== null ? "ellipsis" : "",
                      }}
                    >
                      {media.sound4
                        ? media.sound4.name.substring(0, 10) + "..."
                        : "upload fourth audio"}
                    </Typography>

                    <input
                      type="file"
                      style={{
                        visibility: "hidden",
                        position: "absolute",
                        top: "-9999px",
                      }}
                      onChange={(e) => handleImageChange("sound4", e)}
                      ref={(el) => (fileInputRef.current["sound4"] = el)}
                      accept="audio/*"
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
            <div
              style={{ width: isMobile ? "350px" : "525px", height: "336px" }}
            >
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1rem",
                  fontFamily: theme.fonts.Light,
                  fontWeight: 500,
                  color: theme.colors.white,
                }}
              >
                Item Details
              </Typography>
              <InputField
                label="Item name"
                inputName="itemName"
                value={state.itemName}
                onChange={handleChange}
                placeholder='e. g. "New Loop" '
                height="48px"
                fontsize="14px"
                labelfontSize="12px"
              />
              <InputField
                label="Description"
                inputName="description"
                value={state.description}
                onChange={handleChange}
                placeholder="e. g. “After purchasing you will able to recived the loop sound file...”"
                height="48px"
                fontsize="14px"
                labelfontSize="12px"
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <InputField
                  label="Price"
                  inputName="price"
                  value={state.price}
                  onChange={handleChange}
                  boxWidth={isMobile ? "300px" : "300px"}
                  placeholder="0.001"
                  height="48px"
                  fontsize="14px"
                  labelfontSize="12px"
                />
                <FormControl
                  sx={{ width: "350px", marginTop: "14px", marginLeft: "10px" }}
                >
                  <label htmlFor="" style={{ color: theme.colors.textcolor }}>
                    Category
                  </label>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleCategory}
                    input={<OutlinedInput label="Tag" />} // Change the border color here
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                    sx={{
                      border: `3px solid ${theme.colors.borderColor}`,
                      borderRadius: "8px",
                      color: theme.colors.textcolor,
                      height: "48px",
                      "&:focus": {
                        borderColor: theme.colors.yellow,
                      },
                    }}
                  >
                    {categories.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={personName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* <InputField
                                    label="Size"
                                    inputName="size"
                                    value={state.size}
                                    onChange={handleChange}
                                    boxWidth="7.5rem"
                                    placeholder='e. g. 2.45’'
                                    height="48px"
                                    fontsize="14px"
                                    labelfontSize="12px"
                                />
                                <InputField
                                    label="Style"
                                    inputName="style"
                                    value={state.style}
                                    onChange={handleChange}
                                    boxWidth="7.5rem"
                                    placeholder='e. g. Rock'
                                    height="48px"
                                    fontsize="14px"
                                    labelfontSize="12px"
                                />
                                <InputField
                                    label="Instrument"
                                    inputName="instrument"
                                    value={state.instrument}
                                    onChange={handleChange}
                                    boxWidth="7.5rem"
                                    placeholder='e. g. Piano'
                                    height="48px"
                                    fontsize="14px"
                                    labelfontSize="12px"
                                /> */}
              </div>
            </div>

            {/* <div>
                            <Divider sx={{ background: theme.colors.borderColor, width: isMobile ? "350px" : "525px", }} />
                        </div> */}
            {/* <div style={{ width: isMobile ? "350px" : "525px", height: "436px", display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
                            <div style={{ height: "48px" }}>
                                <div style={{ height: "24px", display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant='h6' sx={{ color: theme.colors.white, fontSize: isMobile ? "13px" : "1rem", fontFamily: theme.fonts.Light, fontWeight: 500 }}>
                                        Put on sale
                                    </Typography>
                                    <AntSwitcher />
                                </div>
                                <div style={{ height: "20px", }}>
                                    <Typography variant='h6' sx={{ color: theme.colors.textcolor, fontSize: "0.8rem", fontFamily: theme.fonts.Light, fontWeight: 400 }}>
                                        You'll receive bids on this item
                                    </Typography>
                                </div>
                            </div>
                            <div style={{ height: "48px" }}>
                                <div style={{ height: "24px", display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant='h6' sx={{ color: theme.colors.white, fontSize: isMobile ? "13px" : "1rem", fontFamily: theme.fonts.Light, fontWeight: 500 }}>
                                        Instant sale price
                                    </Typography>
                                    <AntSwitcher />
                                </div>
                                <div style={{ height: "20px", }}>
                                    <Typography variant='h6' sx={{ color: theme.colors.textcolor, fontSize: "0.8rem", fontFamily: theme.fonts.Light, fontWeight: 400 }}>
                                        Enter the price for which the item will be instantly sold
                                    </Typography>
                                </div>
                            </div>
                            <div style={{ height: "48px" }}>
                                <div style={{ height: "24px", display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant='h6' sx={{ color: theme.colors.white, fontSize: isMobile ? "13px" : "1rem", fontFamily: theme.fonts.Light, fontWeight: 500 }}>
                                        Unlock once purchased
                                    </Typography>
                                    <AntSwitcher />
                                </div>
                                <div style={{ height: "20px", }}>
                                    <Typography variant='h6' sx={{ color: theme.colors.textcolor, fontSize: "0.8rem", fontFamily: theme.fonts.Light, fontWeight: 400 }}>
                                        Content will be unlocked after successful transaction
                                    </Typography>
                                </div>
                            </div>
                            <div style={{ height: "196px", display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
                                <div style={{ height: "48px" }}>
                                    <div style={{ height: "24px", }}>
                                        <Typography variant='h6' sx={{ color: theme.colors.white, fontSize: isMobile ? "13px" : "1rem", fontFamily: theme.fonts.Light, fontWeight: 500 }}>
                                            Choose collection
                                        </Typography>
                                    </div>
                                    <div style={{ height: "20px", }}>
                                        <Typography variant='h6' sx={{ color: theme.colors.textcolor, fontSize: "0.8rem", fontFamily: theme.fonts.Light, fontWeight: 400 }}>
                                            Choose an exiting collection or create a new one
                                        </Typography>
                                    </div>
                                </div>
                                <div style={{ width: isMobile ? "350px" : "525px", height: "124px", display: "flex", flexWrap: "nowrap", overflowX: "auto", }}>
                                    <style>
                                        {`
                                            ::-webkit-scrollbar {
                                                width: 0px;
                                            }
                                        `}
                                    </style>
                                    <div style={{ display: "flex" }}>
                                        <CustomCard />
                                        <CustomCard title="Loops 2023" icon=" " iconColor={theme.colors.yellow} />
                                        <CustomCard title="Loops 2022" icon=" " iconColor={theme.colors.pink} />
                                        <CustomCard title="Loops 2021" icon=" " iconColor={theme.colors.yellow} />
                                        <CustomCard title="Loops 2021" icon=" " iconColor={theme.colors.yellow} />
                                    </div>
                                </div>
                            </div>
                        </div> */}
            <div style={{ marginTop: "-20%", marginBottom: "-15%" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={termsAccepted}
                    onChange={handleCheckboxChange}
                    name="terms"
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "white",
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: "white" }}>
                    I accept the{" "}
                    <Link
                      to="https://drive.google.com/file/d/1P5fCpdzBvPq44r9cNUVkGG3Gxy3GFDMp/view?usp=drivesdk"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: "white", textDecoration: "underline" }}
                    >
                      terms and conditions
                    </Link>
                  </Typography>
                }
              />
            </div>
            {isLoding ? (
              <div
                style={{
                  width: isMobile ? "350px" : "525px",
                  height: "48px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  sx={{
                    width: "167px",
                    height: isMobile ? "36px" : "40px",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 15px",
                    background: theme.colors.yellow,
                    borderRadius: "40px",
                  }}
                >
                  <Typography
                    variant="h6"
                    disabled={true}
                    sx={{
                      color: theme.colors.black,
                      fontSize: isMobile ? "13px" : "1rem",
                      fontFamily: theme.fonts.Light,
                      fontWeight: 700,
                    }}
                  >
                    Loding...
                  </Typography>
                  <Box sx={{ width: "30px", height: "30px" }}>
                    <CircularProgress size={30} sx={{ color: "black" }} />
                  </Box>
                </Button>
                <div
                  style={{
                    width: "168px",
                    height: "48px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={{ color: theme.colors.white }}>Auto saving</div>
                  <div></div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  width: isMobile ? "350px" : "525px",
                  height: "48px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  sx={{
                    width: "167px",
                    height: isMobile ? "36px" : "40px",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 15px",
                    background: theme.colors.yellow,
                    borderRadius: "40px",
                  }}
                  onClick={handleSubmit}
                >
                  <Typography
                    variant="h6"
                    disabled={true}
                    sx={{
                      color: theme.colors.black,
                      fontSize: isMobile ? "13px" : "1rem",
                      fontFamily: theme.fonts.Light,
                      fontWeight: 700,
                    }}
                  >
                    Create item
                  </Typography>
                  <ArrowRightAltIcon
                    sx={{
                      color: theme.colors.black,
                      width: "16px",
                      height: "16px",
                    }}
                  />
                </Button>
                {/* <div style={{ width: "168px", height: "48px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <div style={{ color: theme.colors.white }}>Auto saving</div>
                                    <div></div>
                                </div> */}
              </div>
            )}
          </Grid>
          <Grid item sx={{ padding: "0 4%" }}>
            <MusicCard
              handleClick={handleClear}
              nftImage={selectedMedia.cover}
              itemIcon={
                selectedMedia.cover == null
                  ? backgroundImage
                  : selectedMedia.cover
              }
              nftMusic={media.audio}
              itemName={state.itemName}
              itemPrice={state.price}
              artistName={user.artistName}
              ownerName={user.fullName}
              artistProfile={user.profilePhoto.url}
              ownerProfile={user.profilePhoto.url}
            />
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
