const express = require('express');
const app = express();
const cors =require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes')
const cookieParser =require('cookie-parser');
const captainRoute = require('./routes/captain.routes')
const mapRoutes = require('./routes/map.routes')
const rideRoutes = require('./routes/ride.routes')
connectToDb();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/users',userRoutes);
app.use('/captain',captainRoute);
app.use('/maps',mapRoutes);
app.use('/rides',rideRoutes);
app.get('/',(req,res)=>{
res.send('hello world');
})

module.exports =app;