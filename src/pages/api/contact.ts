import type { APIRoute } from "astro";
import nodemailer from "nodemailer";
import type { Address } from "nodemailer/lib/mailer";

// IF A ROUTE SHOULD BE SSR NOT SSG
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 },
    );
  }

  const toEmail = import.meta.env.TO_EMAIL;
  const toEmailPassword = import.meta.env.TO_EMAIL_PASSWORD;

  const mailOptions = {
    from: email as unknown as Address,
    to: toEmail,
    subject: "New Portfolio Site Contact Form Submission!",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: toEmail,
      pass: toEmailPassword,
    },
  });

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({
        message: "Successfully sent message!",
      }),
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        message: "Failed to send message",
        error,
      }),
      { status: 500 },
    );
  }
};
