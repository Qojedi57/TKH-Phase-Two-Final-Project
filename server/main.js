import createServer from "./server.js";

const server = createServer();
const PORT = process.env.PORT  || 8080;
server.listen(PORT, () => {
  console.log("https://finalprojectphase2.onrender.com");
  // localhost:8080
});