import express from 'express'
import { config } from 'dotenv'
import path from 'path'
import { connectionDB } from './DB/conecctionDB.js'
import { iniateApp } from './Src/utils/initateApp.js'

config({path: path.resolve('./config/config.env')});
const app=express();
iniateApp(app,express);

