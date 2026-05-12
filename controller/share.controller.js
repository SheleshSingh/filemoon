const ShareModel = require("../model/share.model");
const nodemailer = require("nodemailer");

const conn = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const getEmailTemplate = () => {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Enquiry Email</title>

    <!-- Tailwind CSS -->
   <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  </head>

  <body class="bg-gray-100 py-10 px-4">
    <div
      class="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
    >
      <!-- Header -->
      <div class="bg-indigo-600 px-8 py-6 text-white">
        <h1 class="text-3xl font-bold">New Enquiry</h1>
        <p class="text-indigo-100 mt-2">
          You have received a new enquiry from your website.
        </p>
      </div>

      <!-- Content -->
      <div class="p-8">
        <div class="grid gap-5">
          <!-- Name -->
          <div>
            <p class="text-sm text-gray-500 font-medium">Full Name</p>
            <div
              class="mt-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800"
            >
              John Doe
            </div>
          </div>

          <!-- Email -->
          <div>
            <p class="text-sm text-gray-500 font-medium">Email Address</p>
            <div
              class="mt-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800"
            >
              johndoe@example.com
            </div>
          </div>

          <!-- Phone -->
          <div>
            <p class="text-sm text-gray-500 font-medium">Phone Number</p>
            <div
              class="mt-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800"
            >
              +91 9876543210
            </div>
          </div>

          <!-- Subject -->
          <div>
            <p class="text-sm text-gray-500 font-medium">Subject</p>
            <div
              class="mt-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800"
            >
              Website Development Enquiry
            </div>
          </div>

          <!-- Message -->
          <div>
            <p class="text-sm text-gray-500 font-medium">Message</p>
            <div
              class="mt-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-4 text-gray-800 leading-7"
            >
              Hello, I want to know more about your web development services.
              Please contact me with pricing and timeline details.
            </div>
          </div>
        </div>

        <!-- Button -->
        <div class="mt-8 text-center">
          <a
            href="mailto:johndoe@example.com"
            class="inline-block bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold px-6 py-3 rounded-lg"
          >
            Reply to Enquiry
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="bg-gray-50 border-t border-gray-200 px-8 py-5 text-center text-sm text-gray-500"
      >
        © 2026 Your Company. All rights reserved.
      </div>
    </div>
  </body>
</html>
  `;
};

const shareFile = async (req, res) => {
  const payload = req.body;
  const options = {
    from: process.env.SMTP_EMAIL,
    to: "vipinkumar94997@gmail.com",
    subject: "Filemoon - New File Received",
    html: getEmailTemplate(),
  };
  await conn.sendMail(options);
  res.send(200).json({ message: "Email send" });
};

module.exports = {
  shareFile,
};
