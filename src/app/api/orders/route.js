import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {Order} from "@/models/Order";
import {isAdmin} from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";
const Razorpay = require("razorpay");


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const admin = await isAdmin();


  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  const id = url.searchParams.get('id');
  // For Redirect from All Orders
  if (id) {
    const response=Response.json( await Order.findOne({_id: id}));
    console.log(response);
    return response;
  }
  // For Redirect from Cart
  if (_id) {
    const response=await razorpay.orders.fetch(_id);
    const res2=Response.json( await Order.findOne({_id: response?.receipt}));
    return res2;
  }



    if (admin) {
        return Response.json( await Order.find() );
    }

    if(userEmail){
        return Response.json( await Order.find({userEmail}) );
    }

}