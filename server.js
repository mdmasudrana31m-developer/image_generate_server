import express from 'express'
import cors from 'cors'
import { connectDB } from './DB/db.js';
import { router } from './routers/image.js';
import {config} from 'dotenv';


const app = express();
const PORT = process.env.PORT || 8000;
config({ path: './config/config.env' });
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
connectDB();

app.use("/api/image", router);


app.get('/', (req, res)=> {
  res.send('API is running....');
})

app.listen(PORT, () => {
  console.log(`server is  running on port http://localhost:${PORT}`);
});
