const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DB);

const express = require("express");
const { v4: uniqueId } = require("uuid");
const cors = require("cors")

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, res, next) => {
    next(null, "files/");
  },
  filename: (req, file, next) => {
    const nameArr = file.originalname.split(".");
    const ext = nameArr.pop();
    const name = `${uniqueId()}.${ext}`;
    next(null, name);
  },
});
const upload = multer({ storage: storage });

const { signup, login } = require("./controller/user.controller");
const {
  createFile,
  fileFetch,
  deleteFile,
  downloadFile,
} = require("./controller/file.controller");
const { fetchDashboard } = require("./controller/dashboard.controller");
const app = express();
app.listen(process.env.PORT || 8080);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("view"));
app.use(cors({
  origin:"http://127.0.0.1:5501"
}))

app.post("/signup", signup);
app.post("/login", login);
app.post("/file", upload.single("file"), createFile);
app.get("/file", fileFetch);
app.delete("/file/:id", deleteFile);
app.get("/file/download/:id", downloadFile);
app.get("/dashboard", fetchDashboard);
