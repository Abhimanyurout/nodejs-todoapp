const express = require('express');
const app = express();
const port = 4000;
const userRouter=require("./routes/user.js");
const taskRouter=require("./routes/task.js");
const {connectDB}=require("./data/database.js");
const cors=require("cors");

const {config}=require("dotenv");
const cookieParser = require('cookie-parser');
const  errorMiddleware  = require("./middlewares/error.js");

config({
    path:"./data/config.env"
})


connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:[process.env.FRONTENT_URL],
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
}));

app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

//error middleware
app.use(errorMiddleware);


app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${port} in ${process.env.NODE_ENV} mode..`)
});