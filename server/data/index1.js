import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    firstName: "Shreyas",
    lastName: "Ugemuge",
    email: "shreyas@nksqr.com",
    password: "123456",
    picturePath: "su.jpeg",
    friends: [],
    location: "San Fran, CA",
    occupation: "Software Engineer",
    viewedProfile: 14561,
    impressions: 888822,
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    firstName: "Nikhil",
    lastName: "Kamath",
    email: "nk@gmail.com",
    password: "123456",
    picturePath: "nk.jpeg",
    friends: [],
    location: "New York, CA",
    occupation: "trader",
    viewedProfile: 12351,
    impressions: 55555,
    createdAt: 1595589072,
    updatedAt: 1595589072,
    __v: 0,
  },
  {
    _id: userIds[2],
    firstName: "Tanmay",
    lastName: "Bhat",
    email: "tb@gmail.com",
    password: "123456",
    picturePath: "tb.jpeg",
    friends: [],
    location: "Canada, CA",
    occupation: "Content Creator",
    viewedProfile: 45468,
    impressions: 19986,
    createdAt: 1288090662,
    updatedAt: 1288090662,
    __v: 0,
  },
  {
    _id: userIds[3],
    firstName: "Vedant",
    lastName: "Lamba",
    email: "vl@gmail.com",
    password: "123456",
    picturePath: "vl.jpeg",
    friends: [],
    location: "Korea, CA",
    occupation: "Businessman",
    viewedProfile: 41024,
    impressions: 55316,
    createdAt: 1219214568,
    updatedAt: 1219214568,
    __v: 0,
  },
  {
    _id: userIds[4],
    firstName: "Sharan",
    lastName: "Hegde",
    email: "shh@gmail.com",
    password: "123456",
    picturePath: "sh.jpeg",
    friends: [],
    location: "Utah, CA",
    occupation: "Content Creator",
    viewedProfile: 40212,
    impressions: 7758,
    createdAt: 1493463661,
    updatedAt: 1493463661,
    __v: 0,
  },
  {
    _id: userIds[5],
    firstName: "Ganesh",
    lastName: "Prasad",
    email: "gpp@gmail.com",
    password: "123456",
    picturePath: "gp.jpeg",
    friends: [],
    location: "Los Angeles, CA",
    occupation: "content creator",
    viewedProfile: 976,
    impressions: 4658,
    createdAt: 1381326073,
    updatedAt: 1381326073,
    __v: 0,
  },
  {
    _id: userIds[6],
    firstName: "Bimal",
    lastName: "Unnikrishnan",
    email: "buu@gmail.com",
    password: "123456",
    picturePath: "bu.jpeg",
    friends: [],
    location: "Chicago, IL",
    occupation: "Businessman",
    viewedProfile: 1510,
    impressions: 77579,
    createdAt: 1714704324,
    updatedAt: 1642716557,
    __v: 0,
  },
  {
    _id: userIds[7],
    firstName: "Vijay",
    lastName: "Subramanian",
    email: "vsss@gmail.com",
    password: "123456",
    picturePath: "vs.jpeg",
    friends: [],
    location: "Washington, DC",
    occupation: "Businessman",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
];
