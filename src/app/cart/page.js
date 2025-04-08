'use client';
import {CartContext, cartProductPrice} from "@/components/AppContext";
import DataInputs from "@/components/layout/DataInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import {useProfile} from "@/components/UseProfile";
import CartProduct from "@/components/menu/CartProduct";
import {useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";
import { loadRazorpay } from "@/utils/razorpay";


export default function CartPage(){

    const {cartProducts,removeCartProduct} = useContext(CartContext);
    const [data, setData] = useState({});
    const {data:profileData} = useProfile();

    useEffect(() => {
      if (typeof window !== "undefined") {
        if (window.location.href.includes("canceled=1")) {
          toast.error("Payment failed 😔");
        }
      }
    }, []);

    let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }


    useEffect(() => {
        if (profileData?.phone) {
          const {phone, dept, register} = profileData;
          const dataFromProfile = {
            phone,
            dept,
            register,
          };
          setData(dataFromProfile);
        }
      }, [profileData]);


  function handleDataChange(propName, value) {
    setData(prevData => ({...prevData, [propName]:value}));
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault();

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, cartProducts }),
    });

    if (!response.ok) {
      toast.error("Something went wrong... Please try again later");
      return;
    }

    const { id, amount, currency } = await response.json();
    const razorpay = await loadRazorpay();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount,
      currency,
      name: "North East",
      description: "Order Payment",
      order_id: id,
      handler: function (response) {
        toast.success("Payment successful!");
        window.location.href = `/orders/${id}?clear-cart=1`;
      },
      prefill: {
        name: profileData?.name || "",
        email: profileData?.email || "",
        contact: data.phone || "",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new razorpay(options);
    const var123 = rzp1.open();
    console.log(rzp1);
    console.log(var123);
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }


    return(
        <section className="mt-8">
            <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
        {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 && cartProducts.map((product, index) => (
           <CartProduct
           key={index}
           product={product}
           onRemove={removeCartProduct}
           />
          ))}
          <div className="py-2 text-right pr-17">
            <span className="text-gray-500">SubTotal:</span>
            <span className="text-lg font-semibold pl-2">₹{subtotal}</span>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
        <h2>Checkout</h2>
        <form onSubmit={proceedToCheckout}>
            <DataInputs dataProps={data} setDataProp={handleDataChange}/>
            <button type="submit" className=" mt-4 bg-primary text-white px-4 py-2 rounded-full ">
             Pay ₹{subtotal}
            </button>
        </form>
        </div>
      </div>
        </section>
    );
}
