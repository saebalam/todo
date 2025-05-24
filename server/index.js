const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth");
const todoRouter = require("./routes/todo");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

app.use('/',authRouter)
app.use('/',todoRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
