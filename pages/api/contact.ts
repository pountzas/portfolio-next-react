import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

// Validate required environment variables
const { RESEND_API_KEY, CONTACT_EMAIL, RESEND_FROM_EMAIL } = process.env;

if (!RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY environment variable is required");
}

if (!CONTACT_EMAIL) {
  throw new Error("CONTACT_EMAIL environment variable is required");
}

const resend = new Resend(RESEND_API_KEY);

// HTML escape function to prevent XSS injection
const escapeHtml = (s: string): string =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Validate required environment variables at runtime
    if (!RESEND_API_KEY) {
      return res.status(500).json({ message: "Server email provider is not configured" });
    }
    if (!CONTACT_EMAIL) {
      return res
        .status(500)
        .json({ message: "Server recipient email is not configured" });
    }

    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address"
      });
    }

    // Escape user input to prevent HTML injection
    const safeName = escapeHtml(String(name));
    const safeEmail = escapeHtml(String(email));
    const safeSubject = escapeHtml(String(subject));
    const safeMessage = escapeHtml(String(message));

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      subject: `Portfolio Contact: ${safeSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="margin: 20px 0;">
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #0066cc;">${safeEmail}</a></p>
            <p><strong>Subject:</strong> ${safeSubject}</p>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${safeMessage}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

          <p style="color: #666; font-size: 12px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
      replyTo: email
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({
        message: "Failed to send email. Please try again later."
      });
    }

    res.status(200).json({
      message: "Message sent successfully! I'll get back to you soon."
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later."
    });
  }
}
