const ShareModel = require("../model/share.model");
const nodemailer = require("nodemailer");

const conn = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const getEmailTemplate = (link) => {
  return `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>File Ready</title>

    <style>
      @media only screen and (max-width: 600px) {
        .container {
          width: 100% !important;
        }

        .mobile-padding {
          padding: 25px !important;
        }

        .mobile-title {
          font-size: 28px !important;
          line-height: 38px !important;
        }

        .mobile-text {
          font-size: 15px !important;
          line-height: 26px !important;
        }

        .mobile-btn {
          width: 100% !important;
          display: block !important;
          box-sizing: border-box !important;
        }

        .mobile-center {
          text-align: center !important;
        }

        .mobile-block {
          display: block !important;
          width: 100% !important;
        }

        .mobile-spacing {
          padding-bottom: 20px !important;
        }
      }
    </style>
  </head>

  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
      font-family: Arial, sans-serif;
    "
  >
    <table
      width="100%"
      border="0"
      cellspacing="0"
      cellpadding="0"
      style="padding: 20px"
    >
      <tr>
        <td align="center">
          <!-- Main Container -->
          <table
            class="container"
            width="600"
            border="0"
            cellspacing="0"
            cellpadding="0"
            style="
              width: 600px;
              max-width: 600px;
              background-color: #ffffff;
              border-radius: 20px;
              overflow: hidden;
            "
          >
            <!-- Header -->
            <tr>
              <td
                align="center"
                class="mobile-padding"
                style="
                  background: linear-gradient(
                    90deg,
                    #4f46e5,
                    #9333ea,
                    #ec4899
                  );
                  padding: 50px 40px;
                "
              >
                <!-- Icon -->
                <div
                  style="
                    width: 80px;
                    height: 80px;
                    line-height: 80px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    font-size: 40px;
                    color: white;
                    text-align: center;
                    margin: auto;
                  "
                >
                  ⬇️
                </div>

                <!-- Title -->
                <h1
                  class="mobile-title"
                  style="
                    color: white;
                    margin-top: 25px;
                    margin-bottom: 10px;
                    font-size: 36px;
                    line-height: 48px;
                  "
                >
                  Your File is Ready 🎉
                </h1>

                <!-- Description -->
                <p
                  class="mobile-text"
                  style="
                    color: #e0e7ff;
                    font-size: 16px;
                    line-height: 28px;
                    margin: 0;
                  "
                >
                  Your requested file has been generated successfully and is now
                  ready for secure download.
                </p>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td class="mobile-padding" style="padding: 40px">
                <!-- User Box -->
                <table
                  width="100%"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  style="
                    background: #f9fafb;
                    border: 1px solid #e5e7eb;
                    border-radius: 16px;
                    padding: 25px;
                  "
                >
                  <tr>
                    <!-- Name -->
                    <td
                      class="mobile-block mobile-spacing"
                      width="50%"
                      valign="top"
                    >
                      <p
                        style="
                          margin: 0;
                          color: #6b7280;
                          font-size: 14px;
                        "
                      >
                        Customer Name
                      </p>

                      <h2
                        style="
                          margin-top: 8px;
                          margin-bottom: 0;
                          color: #111827;
                          font-size: 26px;
                        "
                      >
                        John Doe
                      </h2>
                    </td>

                    <!-- Email -->
                    <td
                      class="mobile-block"
                      width="50%"
                      valign="top"
                    >
                      <p
                        style="
                          margin: 0;
                          color: #6b7280;
                          font-size: 14px;
                        "
                      >
                        Email Address
                      </p>

                      <h3
                        style="
                          margin-top: 8px;
                          margin-bottom: 0;
                          color: #4f46e5;
                          font-size: 18px;
                          word-break: break-word;
                        "
                      >
                        johndoe@example.com
                      </h3>
                    </td>
                  </tr>
                </table>

                <!-- Important Info -->
                <table
                  width="100%"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  style="
                    margin-top: 30px;
                    background: #eef2ff;
                    border-radius: 16px;
                    padding: 25px;
                  "
                >
                  <tr>
                    <td>
                      <h3
                        style="
                          margin-top: 0;
                          color: #111827;
                          font-size: 24px;
                        "
                      >
                        Important Information
                      </h3>

                      <p
                        class="mobile-text"
                        style="
                          color: #4b5563;
                          line-height: 30px;
                          font-size: 16px;
                        "
                      >
                        This download link will expire within
                        <strong style="color: #4f46e5">24 hours</strong>
                        for security purposes.
                      </p>

                      <p
                        class="mobile-text"
                        style="
                          color: #4b5563;
                          line-height: 30px;
                          font-size: 16px;
                        "
                      >
                        Please download your file before expiry time.
                      </p>
                    </td>
                  </tr>
                </table>

                <!-- Button -->
                <table
                  width="100%"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  style="margin-top: 40px"
                >
                  <tr>
                    <td align="center">
                      <a
                        href=${link}
                        class="mobile-btn"
                        download="demo.png"
                        style="
                          background: linear-gradient(
                            90deg,
                            #4f46e5,
                            #ec4899
                          );
                          color: white;
                          text-decoration: none;
                          padding: 18px 40px;
                          border-radius: 14px;
                          display: inline-block;
                          font-size: 18px;
                          font-weight: bold;
                        "
                      >
                        Download File 🚀
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                class="mobile-padding mobile-center"
                align="center"
                style="
                  background: #f9fafb;
                  padding: 30px;
                  border-top: 1px solid #e5e7eb;
                "
              >
                <p
                  style="
                    margin: 0;
                    color: #6b7280;
                    font-size: 14px;
                  "
                >
                  © 2026 Your Company. All rights reserved.
                </p>

                <p style="margin-top: 15px">
                  <a
                    href="#"
                    style="
                      color: #4f46e5;
                      text-decoration: none;
                      margin: 0 10px;
                    "
                  >
                    Website
                  </a>

                  <a
                    href="#"
                    style="
                      color: #4f46e5;
                      text-decoration: none;
                      margin: 0 10px;
                    "
                  >
                    Support
                  </a>

                  <a
                    href="#"
                    style="
                      color: #4f46e5;
                      text-decoration: none;
                      margin: 0 10px;
                    "
                  >
                    Contact
                  </a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};

const shareFile = async (req, res) => {
  try {
    const { email, fileId } = req.body;
    const link = `${process.env.DOMAIN}/api/file/download/${fileId}`;
    const options = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Filemoon - New File Received",
      html: getEmailTemplate(link),
    };

    const payload = {
      user: req.user.id,
      receiverEmail: email,
      file: fileId,
    };
    // await conn.sendMail(options);
    // await ShareModel.create(payload);
    await Promise.all([conn.sendMail(options), ShareModel.create(payload)]);

    res.send(200).json({ message: "Email sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const fetchShared = async (req, res) => {
  try {
    const history = await ShareModel.find({ user: req.user.id })
      // .populate(
      //   "user",
      //   "-password",
      // );
      .populate("file");
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  shareFile,
  fetchShared,
};
