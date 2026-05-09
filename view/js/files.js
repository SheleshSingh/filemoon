axios.defaults.baseURL = SERVER;

window.onload = () => {
  fetchFiles();
};
const toggleDrawer = () => {
  const drawer = document.getElementById("drawer");
  const drawerValue = drawer.style.right;
  if (drawerValue === "0px") {
    drawer.style.right = "-33.33%";
  } else {
    drawer.style.right = "0px";
  }
};
const toast = new Notyf({
  position: {
    x: "center",
    y: "top",
  },
});
const logout = () => {
  localStorage.clear();
  location.href = "/login";
};

const uploadFile = async (e) => {
  try {
    e.preventDefault();
    const form = e.target;
    const uploadButton = document.getElementById("upload-btn");
    const progress = document.getElementById("progress");
    const formdata = new FormData(form);

    // validation file size
    const file = formdata.get("file");
    const size = getSize(file.size);
    if (size > 200)
      return toast.error("File size too large max size 200mb allowed");

    const options = {
      onUploadProgress: (e) => {
        const loaded = e.loaded;
        const total = e.total;
        const percentageValue = Math.floor((loaded * 100) / total);
        progress.style.width = percentageValue + "%";
        progress.innerHTML = percentageValue + "%";
      },
    };

    uploadButton.disabled = true;

    const { data } = await axios.post("api/file", formdata, options);
    toast.success(`${data.filename} has been uploaded !`);
    fetchFiles();
    progress.style.width = 0;
    progress.innerHTML = "";
    form.reset();
    toggleDrawer();
  } catch (err) {
    toast.error(err.response ? err.response.data.message : err.message);
  } finally {
    uploadButton.disabled = false;
  }
};

const getSize = (size) => {
  const mb = size / 1000 / 1000;
  return mb.toFixed(1);
};
const fetchFiles = async () => {
  try {
    const { data } = await axios("api/file");
    const tableBody = document.getElementById("files-table");
    tableBody.innerHTML = "";
    for (file of data) {
      const ui = `
       <tr class="text-gray-500 border-b border-gray-200">
              <td class="pl-6 py-4 capitalize">${file.filename}</td>
              <td class="capitalize">${file.type}</td>
              <td>${getSize(file.size)} Mb</td>
              <td>${moment(file.createdAt).format("DD MMM YYYY, hh:mm A")}</td>
              <td>
                <div class="space-x-3">
                  <button
                    class="bg-rose-400 px-2 py-1 text-white rounded hover:bg-rose-600"
                    onclick="deleteFiles('${file._id}', this)"
                  >
                    <i class="ri-delete-bin-4-line"></i>
                  </button>

                  <button
                  onclick="downloadFiles('${file._id}', '${file.filename}', this)"
                    class="bg-green-400 px-2 py-1 text-white rounded hover:bg-green-500"
                  >
                    <i class="ri-download-line"></i>
                  </button>

                  <button
                    class="bg-amber-400 px-2 py-1 text-white rounded hover:bg-amber-600"
                  >
                    <i class="ri-share-line"></i>
                  </button>
                </div>
              </td>
            </tr>
      `;
      tableBody.innerHTML += ui;
    }
  } catch (err) {
    toast.error(err.response ? err.response.data.message : err.message);
  }
};

const deleteFiles = async (id) => {
  try {
    button.innerHTML = '<i class="animate-spin ri-loader-4-line"></i>';
    button.disabled = true;
    const { data } = await axios.delete(`api/file/${id}`);
    toast.success("File deleted !");
    fetchFiles();
  } catch (err) {
    toast.error(err.response ? err.response.data.message : err.message);
  } finally {
    button.innerHTML = '<i class="ri-delete-bin-4-line"></i>';
    button.disabled = false;
  }
};

const downloadFiles = async (id, filename, button) => {
  try {
    button.innerHTML = '<i class="animate-spin ri-loader-4-line"></i>';
    button.disabled = true;
    const options = {
      responseType: "blob",
    };
    const { data } = await axios(`api/file/download/${id}`, options);
    const ext = data.type.split("/").pop();
    const url = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.${ext}`;
    a.click();
    a.remove();
  } catch (err) {
    if (!err.response) return toast.error(err.message);

    const error = await err.response.data.text();
    const { message } = JSON.parse(error);
    toast.error(message);
  } finally {
    button.innerHTML = '<i class="ri-download-line"></i>';
    button.disabled = false;
  }
};
