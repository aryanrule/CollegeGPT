const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const uploadRouter = require('./routes/upload');
dotenv.config();

const app = express();

/* middlewares */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* health route */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CollegeGPT Backend Running",
  });
});

app.use("/api/v1" , uploadRouter);

app.use((req,res)=>{
  res.status(404).json({ message:"Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});