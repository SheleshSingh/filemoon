axios.defaults.baseURL = SERVER;

window.onload = () => {
  fetchImage();
  fetchHistory();
};

const logout = () => {
  localStorage.clear();
  location.href = "/login";
};

const toast = new Notyf({
  position: {
    x: "center",
    y: "top",
  },
});

const getToken = () => {
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };
  return options;
};

const fetchHistory = async () => {
  try {
    const { data } = await axios("/api/share", getToken());
    const table = document.getElementById("tableBody");
    const notFoundUi = `
        <div class="p-16 text-center">
             <h1 class="text-gary-500 text-4xl">Oops ! you have not shared any files yet</h1>
        </div>
    `;
    if (data.length === 0) {
      table.innerHTML = notFoundUi;
      return;
    }

    for (let item of data) {
      const ui = `
        <tr class="text-gray-500 border-b border-gray-200">
          <td class="pl-6 py-4 capitalize">${item.file.filename}</td>
          <td>${item.receiverEmail}</td>
          <td>${moment(item.createdAt).format("DD MMM YYYY hh:mm A")}</td>
        </tr>
      `;
      table.innerHTML += ui;
    }
  } catch (err) {
    toast.error(err.response ? err.response.data.message : err.message);
  }
};

const uploadImage = () => {
  try {
    const input = document.createElement("input");
    const image = document.getElementById("image");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const pic = document.getElementById("pic");
      const formdata = new FormData();
      formdata.append("file", file);
      const { data } = await axios.post(
        "/api/profile-picture",
        formdata,
        getToken(),
      );
      const url = URL.createObjectURL(file);
      pic.src = url;
    };
  } catch (err) {
    toast.error(err.response ? err.response.data.message : err.message);
  }
};

const fetchImage = async () => {
  try {
    const options = {
      responseType: "blob",
      ...getToken(),
    };
    const { data } = await axios.get("/api/profile-picture", options);
    const url = URL.createObjectURL(data);
    const pic = document.getElementById("pic");
    pic.src = url;
  } catch (err) {
    if (!err.response) return toast.error(err.message);

    const error = await err.response.data.text();
    const { message } = JSON.parse(error);
    toast.error(message);
  }
};
