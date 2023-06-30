import createServer from "./server.js";

const server = createServer();
const PORT = process.env.PORT  || 8080;
server.listen(PORT, () => {
  console.log("Server is listening at https://tkh-phase-two-final-project-production.up.railway.app ");
  // localhost:8080
});