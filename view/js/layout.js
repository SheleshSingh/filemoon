const toggleSidebar = () => {
  const sidebar = document.getElementById("sidebar");
  const section = document.getElementById("section");
  const defaultWidth = sidebar.style.width;

  if (defaultWidth === "0px") {
    sidebar.style.width = "240px";
    section.style.marginLeft = "240px";
  } else {
    sidebar.style.width = "0px";
    section.style.marginLeft = "0px";
  }
};
