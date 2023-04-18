import express from "express";
import question from "./questions.js";
import option from "./options.js";

const router = express.Router();

router.use("/questions", question);
router.use("/options", option);

export default router;
