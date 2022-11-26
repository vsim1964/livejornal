import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // через middleware

import authRoute from './routes/auth.js'

const app = express();
// создание приложения
dotenv.config()
// подкобючаем dotenv

// Constants
const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// Middleware
app.use(cors())
app.use(express.json())

// Routes
// http://localhost:3002
app.use('/api/auth', authRoute)
// app.use('/api/posts', postRoute)
// app.use('/api/comments', commentRoute)


async function start() {
	try {
		await mongoose.connect(
			`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.jrqwefm.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
		)
	} catch (error) {
		console.log(error);
	}
	app.listen(PORT, () => {
		console.log(`Started now on port: ${PORT}!`);
	})
}
start()
