const FileModel = require("../model/file.model");
const fs = require("fs");

const createFile = async (req, res) => {
  try {
    const file = req.file;
    const payload = {
      path: file.destination + file.filename,
      filename: file.filename,
      type: file.mimetype.split("/")[0],
      size: file.size,
    };
    const newFile = await FileModel.create(payload);
    res.status(200).json({ message: newFile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const fileFetch = async (req, res) => {
  try {
    const files = await FileModel.find();
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await FileModel.findByIdAndDelete(id);
    if (!file) return res.status(404).json({ message: "File not found" });
    res.status(200).json(file);
    fs.unlink(file.path);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateFile = (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  createFile,
  fileFetch,
  deleteFile,
};
