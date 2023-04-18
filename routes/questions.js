import express from "express";
import {
  getQuestion,
  createQuestion,
  deleteQuestion,
  createOption,
} from "../controllers/pollingcontroller.js";

const router = express.Router();

//to get question
router.get("/:id", getQuestion);

//to create question
router.post("/create", createQuestion);

//to delete question
router.delete("/:id/delete", deleteQuestion);

//to create options
router.post("/:id/options/create", createOption);

export default router;
