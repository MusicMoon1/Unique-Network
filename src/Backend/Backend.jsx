import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, firestore, storage } from "../config/firebase";
import { toast } from "react-toastify";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAuthcontexts } from "../context/Authcontexts";
import axios from "axios";
import Sdk from "@unique-nft/sdk";
import { KeyringProvider } from "@unique-nft/accounts/keyring";
import { Sr25519Account } from "@unique-nft/sdk/sr25519";
const baseUrl = "https://rest.unique.network/unique/v1";
// Profile Creation Functions
// https://rest.unique.network/opal/v1
// https://rest.unique.network/unique/v1
export const createUserWithEmailAndPasswordAndProfile = async (
  email,
  password,
  userData,
  images
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await addProfileImage(user, userData, images);
  } catch (err) {
    toast.error("Something went wrong while creating user");
    console.error(err);
  } finally {
    // setIsProcessing(false);
  }
};

const addProfileImage = async (user, userData, images) => {
  try {
    const profile = images.profile;
    const cover = images.cover;
    const profileName = user.uid + "-" + profile.name;
    const coverName = user.uid + "-" + cover.name;

    const profileImageRef = ref(storage, `images/${profile.name}`);
    const profileUploadTask = uploadBytesResumable(profileImageRef, profile);

    const coverImageRef = ref(storage, `images/${cover.name}`);
    const coverUploadTask = uploadBytesResumable(coverImageRef, cover);

    await Promise.all([profileUploadTask, coverUploadTask]); // Wait for both uploads to complete

    const profileDownloadURL = await getDownloadURL(profileImageRef);
    const coverDownloadURL = await getDownloadURL(coverImageRef);

    const data = {
      ...userData,
      profilePhoto: { name: profileName, url: profileDownloadURL },
      coverPhoto: { name: coverName, url: coverDownloadURL },
    };
    createUserProfile(user, data);
  } catch (error) {
    console.error("Error uploading images:", error);
  }
};

const createUserProfile = async (user, userData) => {
  userData.id = user.uid;
  try {
    await setDoc(doc(firestore, "users", user.uid), userData);
    toast.success("A new account created successfully");
  } catch (e) {
    toast.error("Something went wrong while creating user profile");
    console.error("Error adding document: ", e);
  }
};

// Get All users

export const getAlluser = async () => {
  const q = query(collection(firestore, "users"));

  try {
    const docArray = [];
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      docArray.push(data);
    });

    return docArray;
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
};

// login user profile function

export const loginUserProfile = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    toast.success("Logged in successfully");
  } catch (error) {
    console.error(error);
    toast.error("Invalid email or password");
  }
};

// Creating an SDK client
function createSdk(account) {
  const options = {
    baseUrl,
    signer: account,
  };
  return new Sdk(options);
}

async function createCollection(
  sdk,
  address,
  itemName,
  description,
  ipfs,
  data,
  setGetNFTs,
  getNFTs
) {
  if (sdk && address) {
    try {
        const sponsorMnemonic = "share energy favorite bounce wonder inmate include patient meat insane draft feed";
        const sponsor = Sr25519Account.fromUri(sponsorMnemonic);
        const emptyAccount = Sr25519Account.fromUri(
          Sr25519Account.generateMnemonic(),
        );
       
      const { parsed, error } = await sdk.collection.creation.submitWaitResult({
        address,
        name: itemName,
        description: description,
        tokenPrefix: "MusicMoon NFT",
      });

      if (error) {
        console.log("Error occurred while creating a collection.", error);
        toast.error(error);
        process.exit();
      }

      const { collectionId } = parsed;
      await sdk.collection.setSponsorship({
        collectionId,
        newSponsor: sponsor.address,
      });

      await sdk.collection.confirmSponsorship({ collectionId });
      console.log("collectionId", collectionId);

      const sounds = data.sounds || [];
      let newData = {};
      if (collectionId) {
        for (let i = 0; i < sounds.length; i++) {
          const sound = sounds[i];
          try {
            const result = await sdk.token.create.submitWaitResult({
              address,
              collectionId,
              data: {
                image: {
                  ipfsCid: ipfs,
                },
                name: {
                  _: sound.name, // Use the sound name for the token name
                },
                description: {
                  _: "Sample token",
                },
              },
            });
            console.log("Token creation result:", result);

            const { tokenId } = result.parsed || {};
            console.log("tokenId", tokenId);
            // Store tokenId in sound object
            sounds[i] = {
              ...sound,
              tokenId: tokenId,
            };
            newData = {
              ...data,
              sounds,
              bid: collectionId,
            };
          } catch (error) {
            console.error("Error creating token:", error);
            toast.error(error.message);
          }
        }
        await createNFts(newData);
        setGetNFTs([...getNFTs, newData]);
      } else {
        console.log("No collectionId provided.");
      }
    } catch (err) {
      console.error("Error creating collection or token:", err);
      toast.error(err.message);
    }
  }
}

// Entrypoint
// export async function main(mnemonic) {

//     const signer = await KeyringProvider.fromMnemonic(mnemonic);
//     const address = signer.instance.address;
//     const sdk = createSdk(signer);

//     const collection = await createCollection(sdk, address);
//     console.log('The collection was create. ID: ', collection);
// }

export const createNewNft = (
  userData,
  media,
  setGetNFTs,
  getNFTs,
  mnemonic
) => {
  return new Promise((resolve, reject) => {
    addNFTsImage(userData, media, setGetNFTs, getNFTs, mnemonic)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const addNFTsImage = async (userData, media, setGetNFTs, getNFTs, mnemonic) => {
  return new Promise(async (resolve, reject) => {
    try {
      const coverImage = media.cover;
      const audio = media.audio;

      const coverImageName = userData.id + "-" + coverImage.name;
      const audioName = userData.id + "-" + audio.name;

      const coverImageRef = ref(storage, `images/${coverImage.name}`);
      const coverUploadTask = uploadBytesResumable(coverImageRef, coverImage);

      const audioRef = ref(storage, `audios/${audio.name}`);
      const audioUploadTask = uploadBytesResumable(audioRef, audio);

      // Array to hold all sound files
      const soundFiles = [];

      // Iterate over sound properties in media object
      for (let i = 1; i <= 4; i++) {
        const sound = media[`sound${i}`];
        if (sound) {
          const soundRef = ref(storage, `audios/${sound.name}`);
          const soundUploadTask = uploadBytesResumable(soundRef, sound);
          soundFiles.push({ ref: soundRef, uploadTask: soundUploadTask });
        }
      }

      // Upload cover image and audio
      await Promise.all([coverUploadTask, audioUploadTask]);

      // Upload sound files
      await Promise.all(soundFiles.map(({ uploadTask }) => uploadTask));

      // Get download URLs
      const coverDownloadURL = await getDownloadURL(coverImageRef);
      const audioDownloadURL = await getDownloadURL(audioRef);
      const soundDownloadURLs = await Promise.all(
        soundFiles.map(({ ref }) => getDownloadURL(ref))
      );

      let sounds = [];

      // Add sound URLs to data object

      for (let i = 0; i < soundDownloadURLs.length; i++) {
        let sound = soundDownloadURLs[i]
          ? {
              name: userData.id + "-" + media[`sound${i + 1}`].name,
              url: soundDownloadURLs[i],
            }
          : null;
        if (sound) {
          sounds.push(sound);
        }
      }
      const description = userData.description;
      const itemName = userData.itemName;
      const price = userData.price;
      const size = userData.size;
      const style = userData.style;
      const file = coverImage;

      console.log("coverImage", coverImage);

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "pinataMetadata",
        JSON.stringify({
          name: file.name,
          keyvalues: { itemName, description, price, size, style },
        })
      );

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: "180c95bb5dd9057b722b",
            pinata_secret_api_key:
              "ee8f10453fd7e2e4b52b48796e13f50b5b72c28f28f912e91bb7497e28be197d",
          },
        }
      );

      console.log(response);

      const signer = await KeyringProvider.fromMnemonic(mnemonic);
      const address = signer.instance.address;
      const sdk = createSdk(signer);
      const ipfs = response.data.IpfsHash;
      console.log("ipfs", ipfs);

      // Construct data object
      const data = {
        ...userData,
        audio: { name: audioName, url: audioDownloadURL },
        coverPhoto: { name: coverImageName, url: coverDownloadURL },
        sounds,
      };

      await createCollection(
        sdk,
        address,
        itemName,
        description,
        ipfs,
        data,
        setGetNFTs,
        getNFTs
      );
      // Create NFTs with updated data object

      resolve(); // Resolve the Promise when operations are completed successfully
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error(error.message);
      reject(error); // Reject the Promise if there's an error
    }
  });
};

const createNFts = async (data) => {
  try {
    await setDoc(doc(firestore, "NFTs", data.id), data);
    toast.success("NFT created successfully with new sounds...");
  } catch (e) {
    toast.error(e.message);
    console.error("Error adding document: ", e);
  }
};
export const userProfileUpdate = (user, userData, images) => {
  if (images.profile === null) {
    updateProfile(userData);
  } else {
    updateUserProfileImage(user, userData, images);
  }
};
const updateUserProfileImage = async (user, userData, images) => {
  try {
    const profile = images.profile;
    const profileName = user.id + "-" + profile.name;

    const profileImageRef = ref(storage, `images/${profile.name}`);
    const profileUploadTask = uploadBytesResumable(profileImageRef, profile);

    await Promise.all([profileUploadTask]); // Wait for both uploads to complete

    const profileDownloadURL = await getDownloadURL(profileImageRef);

    const data = {
      ...userData,
      profilePhoto: { name: profileName, url: profileDownloadURL },
    };
    updateProfile(data);
  } catch (error) {
    console.error("Error uploading images:", error);
  }
};
const updateProfile = async (data) => {
  try {
    await updateDoc(doc(firestore, "users", data.id), data);
    toast.success("User updated Successfully");
  } catch (e) {
    console.error("Error adding document: ", e);
    message.error("SomeThing went Wrong While Updating");
  }
};
