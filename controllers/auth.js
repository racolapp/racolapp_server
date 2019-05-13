import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import Users from "../models/Users";
import {now} from "moment";


const api = Router();

// api login
api.post("/login",  (req, res) => {
	passport.authenticate("local", { session: false }, (err, user) => {
		if (err) {
			res.status(400).json({
				error: { message: err }
			});
		}

		const { pseudo, password } = user;
		const payload = { pseudo, password };
		const token = jwt.sign(payload, process.env.Token);

		res.status(200).json({ data: { user }, meta: { token } });
	})(req, res);
});

// Register users
api.post("/register", async (req, res) => {
	const createdAt = new now();
	const { pseudo, mail, password, password_confirm } = req.body;
	
	try {
		const user = new Users({
			pseudo,
			mail,
			password,
			password_confirm,
			active: 1,
			premium: 0,
			img_profil: null,
			created_at: createdAt
		});
		console.log(user);
		
		await user.save();
		const payload = { pseudo, password };
		const token = jwt.sign(payload, process.env.Token);
		res.status(201).json({ data: { user }, meta: { token } });
	} catch (error) {
		console.log(error.message);
		res.json({ error: error.message }).status(400);
	}
});

export default api;
