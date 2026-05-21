axios.defaults.baseURL = SERVER;

const logout = () => {
  localStorage.clear();
  location.href = "/login";
};

window.onload = () => {
  showUserDetails();
  fetchRecentFiles();
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

const showUserDetails = async () => {
  const session = await getSession();
  const fullname = document.getElementById("fullname");
  const email = document.getElementById("email");
  fullname.innerHTML = session.fullname;
  email.innerHTML = session.email;
};

const getSize = (size) => {
  const mb = size / 1000 / 1000;
  return mb.toFixed(1);
};

const fetchRecentFiles = async () => {
  try {
    const { data } = await axios(`/api/file?limit=3`, getToken());
    const recentFileBox = document.getElementById("recent-file-box");
    for (let item of data) {
      const ui = `
               <div class="flex justify-between items-start">
                  <div>
                    <h1 class="text-zinc-500 font-medium">
                      ${item.filename}
                    </h1>
                    <small class="text-gray-500 text-sm">${getSize(item.size)} Mb</small>
                  </div>
                  <p class="text-gray-600 text-sm">${moment().format("DD MMM YYYY")}</p>
                </div>
      `;
      recentFileBox.innerHTML += ui;
    }
  } catch (err) {
    toast.error(err.response ? err.response.data.message : err.message);
  }
};
