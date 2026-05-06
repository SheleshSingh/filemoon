const toggleDrawer = () => {
  const drawer = document.getElementById("drawer");
  const drawerValue = drawer.style.right;
  if (drawerValue === "0px") {
    drawer.style.right = "-33.33%";
  } else {
    drawer.style.right = "0px";
  }
};

const uploadFile = async (e) => {
  try {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { data } = await axios.post("http://localhost:8080/file", formData);
  } catch (err) {
    console.log(err);
  }
};
