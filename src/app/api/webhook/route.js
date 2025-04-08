import { Order } from "@/models/Order";
import crypto from "crypto";

export async function POST(req) {
  const razorpaySignature = req.headers.get("x-razorpay-signature");
  const webhookSecret = process.env.TEST;



  let event;
  try {
    const reqBuffer = await req.text();
    console.log(reqBuffer);
    const razorpayOrderId = reqBuffer?.payload?.order?.entity?.receipt;
    const razorpayPaymentId = reqBuffer?.payload?.payment?.entity?.id;


    // Verify Razorpay Webhook Signature
    const expectedSignature = crypto.createHmac("sha256", webhookSecret)
      expectedSignature.update(razorpayOrderId+"|"+razorpayPaymentId);
      const digest = expectedSignature.digest("hex");

      console.log(digest,razorpaySignature);

    if (digest !== razorpaySignature) {
      console.error("Invalid Razorpay Signature");
      return Response.json({ error: "Invalid signature" }, { status: 400 });
    }

    event = JSON.parse(reqBuffer);
  } catch (e) {
    console.error("Razorpay Webhook Error:", e);
    return Response.json({ error: "Webhook error" }, { status: 400 });
  }

  if (event.event === "payment.captured") {
    console.log("Payment Captured Event:", event);

    const orderId = event.payload.payment.entity.notes?.orderId; // Extract orderId from Razorpay metadata
    const isPaid = event.payload.payment.entity.status === "captured";

    if (isPaid && orderId) {
      await Order.updateOne({ _id: orderId }, { paid: true });
    }
  }

console.log(event);

  return Response.json("ok", { status: 200 });
}
