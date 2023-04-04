import express from "express";

const router = express.Router();

router.get("/");
router.post("/create");
router.delete("/:id");
router.post("/:id/update_quantity/?number");

export default router;
