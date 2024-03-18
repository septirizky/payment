import "dotenv/config.js";
import express from "express";
import cors from "cors";
import router from "./routing/route.js";

const app = express();
const PORT = process.env.PORT || 7200;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
