const signup = async (e) => {
  e.preventDefault();
  const form = e.target;
  const elements = form.elements;

  const payload = {
    fullname: elements.fullname.value,
    mobile: elements.mobile.value,
    email: elements.email.value,
    password: elements.password.value,
  };
  const response = await axios.post("http://localhost:8080/signup", payload);
  console.log(response);
};
