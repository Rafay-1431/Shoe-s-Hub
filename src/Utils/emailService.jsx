import emailjs from '@emailjs/browser';

export const sendOrderEmail = async (orderDetails) => {
  try {
    const result = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        customer_name: orderDetails.customerName,
        customer_email: orderDetails.email,
        order_total: orderDetails.totalAmount,
        order_items: orderDetails.itemsSummary,
      },
     import.meta.env.VITE_EMAILJS_PUBLIC_KEY     
    );
    console.log("Email sent successfully:", result.text);
    return result;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};