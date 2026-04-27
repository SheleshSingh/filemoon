const FileModel = require("../model/file.model");

const createFile = async (req, res) => {
  try {
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createFile,
};
