const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new Schema(
  {
    fullname: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },

    mobile: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid Email",
      ],
    },

    password: {
      type: String,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  const count = await model("User").countDocuments({ email: this.email });
  if (count > 0) throw new Error("Email already exist");
});

userSchema.pre("save", async function () {
  const encryptedPassword = await bcrypt.hash(this.password.toString(), 12);
  this.password = encryptedPassword;
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
