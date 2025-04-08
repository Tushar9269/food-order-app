import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MenuItem } from "@/models/MenuItem";
import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);

  const { cartProducts, data } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderDoc = await Order.create({
    userEmail,
    ...data,
    cartProducts,
    paid: false,
  });

  let totalAmount = 0;
  for (const cartProduct of cartProducts) {
    const productInfo = await MenuItem.findById(cartProduct._id);
    let productPrice = productInfo.basePrice;
    if (cartProduct.size) {
      const size = productInfo.sizes.find(
        (size) => size._id.toString() === cartProduct.size._id.toString()
      );
      productPrice += size.price;
    }
    if (cartProduct.extras?.length > 0) {
      for (const cartProductExtraThing of cartProduct.extras) {
        const productExtras = productInfo.extraIngredientPrices;
        const extraThingInfo = productExtras.find(
          (extra) => extra._id.toString() === cartProductExtraThing._id.toString()
        );
        productPrice += extraThingInfo.price;
      }
    }
    totalAmount += productPrice;
  }


  const razorpayOrder = await razorpay.orders.create({
    amount: totalAmount * 100,
    currency: "INR",
    receipt: orderDoc._id.toString(),
    notes: {
      orderId: orderDoc._id.toString(),
      userEmail,
    },
  });

  return Response.json({ id: razorpayOrder.id, currency: "INR", amount: totalAmount * 100 });
}
