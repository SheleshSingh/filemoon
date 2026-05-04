const getSession = () => {
  const session = localStorage.getItem("authToken");

  if (!session) {
    location.href = "../index.html";
    return;
  }

  if (
    session !==
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoZWxlc2hzaW5naDc1NUBnbWFpbC5jb20iLCJtb2JpbGUiOiIzNDU2Nzg4NzYiLCJmdWxsbmFtZSI6InNoZWxlc2ggc2luZ2giLCJpZCI6IjY5ZjQ5Mzg1NjlmY2Q3OGI1NjcwMGVkMyIsImlhdCI6MTc3Nzg5MDMzMSwiZXhwIjoxNzc4NDk1MTMxfQ.CWrOZAqr-Ki1ISKjC4tRmaLCy0AeCQ4z9c7wgVCktu8"
  ) {
    location.href = "../index.html";
    return;
  }
  alert("Success");
};
getSession();
