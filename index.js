import "dotenv/config";
import express from "express";
import connectDB from "./src/utils/db.js";


import userRoute from "./src/routes/user-routes.js"
import appsRoute from "./src/routes/apps-routes.js"

const app = express();
const port = process.env.PORT;
app.use(express.json());




app.use("/user",userRoute)
app.use("/apps",appsRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})



connectDB().then(()=>{
    app.listen(port, () => {
        console.log(`server running in port ${port}`);
      }); 
})

