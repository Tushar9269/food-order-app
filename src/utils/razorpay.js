export async function loadRazorpay() {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(window.Razorpay);
        return;
      }
  
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(window.Razorpay);
      };
      script.onerror = () => {
        console.error("Failed to load Razorpay SDK");
        resolve(null);
      };
  
      document.body.appendChild(script);
    });
  }
  