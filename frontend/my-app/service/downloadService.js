import axios from "axios";
let token = null;
try {
  token = localStorage.access_token
    ? JSON.parse(localStorage.access_token)
    : null;
} catch (e) {
  console.error("Error parsing token from localStorage:", e);
}

const downloadFile = async (name) => {
  try {
    const response = await axios.get(`http://localhost:3030/download-stream/${name}`, {
      responseType: "blob", // important
      headers: {
        Authorization: `Bearer ${token}`, // Add your authorization header here
      },
    });
    console.log('response downlaod : ', response)
    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    var test = name.match(/(.+)\.(.+)/);
    var extension = test[2];
    console.log('extention :', extension)
    link.setAttribute("download", `bukti transaksi.${extension}`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url); 
    return response;
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

export default downloadFile;
