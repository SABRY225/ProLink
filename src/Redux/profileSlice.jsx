import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: "",
  Name: "",
  backImage: "",
  cv: "",
  description: "",
  followersCount: "",
  isFollowed: false,
  isFriend: false,
  jopTitle: "",
  phoneNumber: "",
  profilePicture: "",
  rate: "",
  rateCount: "",
  email: "",
  changePassword: false,
  skill: [],
  idOtherUser:"",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setIdOtherUser: (state, { payload }) => {
      state.idOtherUser = payload;
    },
    setId: (state, { payload }) => {
      state.id = payload;
    },
    setName: (state, { payload }) => {
      state.Name = payload;
    },
    setBackImage: (state, { payload }) => {
      state.backImage = payload;
    },
    setCv: (state, { payload }) => {
      state.cv = payload;
    },
    setDescription: (state, { payload }) => {
      state.description = payload;
    },
    setChangePassword: (state, { payload }) => {
      state.changePassword = payload;
    },
    setFollowersCount: (state, { payload }) => {
      state.followersCount = payload;
    },
    setIsFollowed: (state, { payload }) => {
      state.isFollowed = payload;
    },
    setEmail: (state, { payload }) => {
      state.email = payload;
    },
    setIsFriend: (state, { payload }) => {
      state.isFriend = payload;
    },
    setJopTitle: (state, { payload }) => {
      state.jopTitle = payload;
    },
    setPhoneNumber: (state, { payload }) => {
      state.phoneNumber = payload;
    },
    setProfilePicture: (state, { payload }) => {
      state.profilePicture = payload;
    },
    setRate: (state, { payload }) => {
      state.rate = payload;
    },
    setRateCount: (state, { payload }) => {
      state.rateCount = payload;
    },
    setSkill: (state, { payload }) => {
      state.skill = payload;
    },
  },
});

export const {
  setId,
  setName,
  setBackImage,
  setCv,
  setDescription,
  setFollowersCount,
  setIsFollowed,
  setIsFriend,
  setJopTitle,
  setPhoneNumber,
  setProfilePicture,
  setRate,
  setRateCount,
  setSkill,
  setEmail,
  setChangePassword,
  setIdOtherUser
} = profileSlice.actions;

export default profileSlice.reducer;
