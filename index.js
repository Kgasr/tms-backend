const express = require('express');
const session = require('express-session');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express();

const port = process.env.PORT;
const apiPrefix = process.env.API_PREFIX 
const corsOrigins = process.env.TMS_CORS_ORIGIN ? process.env.TMS_CORS_ORIGIN.split(',') : ['http://localhost:3001', 'http://localhost:90'];

//Middleware to parse JSON 
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: process.env.TMS_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.TMS_COOKIE_SECURE ? process.env.TMS_COOKIE_SECURE === 'true' : true, 
        maxAge: parseInt(process.env.TMS_COOKIE_AGE) || 5*60*1000},
    rolling: true
}));

app.use(cors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET','POST']
}));
app.use(fileUpload());

const loginRoutes = require('./routes/loginRoutes');
const {authMiddleWare} = require('./utils');
const logoutRoutes = require('./routes/logoutRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const projectRoutes = require('./routes/projectRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const activityRoutes = require('./routes/activityRoutes'); 
const taskRoutes = require('./routes/taskRoutes'); 
const subTaskRoutes = require('./routes/subTaskRoutes'); 
const workItemRoutes = require('./routes/workItemRoutes'); 
const workItemAssignmentRoutes = require('./routes/workItemAssignmentRoutes'); 
const reportRoutes = require('./routes/reportRoutes'); 

app.use(apiPrefix,loginRoutes);
app.use(authMiddleWare);
app.use(apiPrefix,sessionRoutes);
app.use(apiPrefix,logoutRoutes);
app.use(apiPrefix,employeeRoutes);
app.use(apiPrefix,projectRoutes);
app.use(apiPrefix,activityRoutes);
app.use(apiPrefix,taskRoutes);
app.use(apiPrefix,subTaskRoutes);
app.use(apiPrefix,workItemRoutes);
app.use(apiPrefix,workItemAssignmentRoutes);
app.use(apiPrefix,reportRoutes);

app.listen(port, ()=> {
});

