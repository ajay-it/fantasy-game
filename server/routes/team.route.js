import express from "express";
import { createTeam, getTeam } from "../controllers/teams.controller.js";

const router = express.Router();

router.post("/create", createTeam);
router.get("/:id", getTeam);

export default router;
