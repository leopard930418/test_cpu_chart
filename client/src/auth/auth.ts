export default function authHeader() {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      return { 'x-access-token': accessToken };       // for Node.js Express back-end
    } else {
      return { 'x-access-token': '' }; // for Node Express back-end
    }
  }
  