axios.defaults.baseURL = SERVER;

window.onload = () => {
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
          <td>
          <div class="space-x-3">
            <button class="bg-rose-400 px-2 py-1 text-white rounded hover:bg-rose-600">
              <i class="ri-delete-bin-4-line"></i>
            </button>
           </div>
          </td>
        </tr>
      `;
      table.innerHTML += ui;
    }
  } catch (err) {
    toast.error(err.response ? err.response.data.message : err.message);
  }
};
