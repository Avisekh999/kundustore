import express from "express";
const router = express.Router();
import {
    addOrderItems,
    getOrderItems,
    updateOrderToPaid,
    getMyOrders
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems);
router.route("/myorders").get(protect, getMyOrders)
router.route("/:id").get(protect,getOrderItems);
router.route("/:id/pay").put(protect, updateOrderToPaid);


export default router;
