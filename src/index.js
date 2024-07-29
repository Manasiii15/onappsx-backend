import "dotenv/config";
import express from "express";
import connectDB from "./utils/db.js";


import userRoute from "./routes/user-routes.js"
import appsRoute from "./routes/apps-routes.js"

const app = express();
const port = process.env.PORT;
app.use(express.json());




app.use("/user",userRoute)
app.use("/apps",appsRoute)





connectDB().then(()=>{
    app.listen(port, () => {
        console.log(`server running in port ${port}`);
      }); 
})

