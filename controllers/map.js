import { Router } from "express";

const api = Router();

api.get("/", (req, res) => {
	res.json({
		route: "map"
	});
});

export default api;