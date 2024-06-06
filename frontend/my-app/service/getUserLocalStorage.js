var x = localStorage.getItem("user");
let userLocalStorage = JSON.parse(x);
setRoleName(userLocalStorage?.name);
if (userLocalStorage?.name !== "Admin") {
  setUserIdParam(userLocalStorage?.id);
} else {
  setUserIdParam(null);
}
if (userLocalStorage?.name == "Admin") {
  setIsAdmin(true);
}
