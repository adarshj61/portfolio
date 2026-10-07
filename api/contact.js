import nodemailer from "nodemailer";
import process from "node:process";
import { Buffer } from "node:buffer";

function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      success: false,
      error: "Method Not Allowed. Only POST requests are supported.",
    });
  }

  try {
    // Handle body parsing across different serverless runtime environments
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        return res
          .status(400)
          .json({ success: false, error: "Invalid JSON payload." });
      }
    } else if (!body && req.readable) {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      const raw = Buffer.concat(chunks).toString();
      try {
        body = JSON.parse(raw);
      } catch {
        return res
          .status(400)
          .json({ success: false, error: "Invalid JSON payload." });
      }
    }

    const { name, email, subject, message } = body || {};

    // Validate required fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return res
        .status(400)
        .json({ success: false, error: "Name is required." });
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return res
        .status(400)
        .json({ success: false, error: "Email is required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res
        .status(400)
        .json({ success: false, error: "A valid email address is required." });
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return res
        .status(400)
        .json({ success: false, error: "Message is required." });
    }

    if (message.trim().length > 5000) {
      return res.status(400).json({
        success: false,
        error: "Message is too long (maximum 5000 characters).",
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject && typeof subject === "string" ? subject.trim() : "";
    const trimmedMessage = message.trim();

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactTo = process.env.CONTACT_TO || "aj941545@gmail.com";

    if (!smtpUser || !smtpPass) {
      console.error(
        "SMTP credentials (SMTP_USER / SMTP_PASS) are not configured."
      );
      return res.status(500).json({
        success: false,
        error:
          "Email service is currently not configured. Please contact me directly using the email link.",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const emailSubject = trimmedSubject
      ? `Portfolio Contact: ${trimmedSubject} — ${trimmedName}`
      : `Portfolio Contact — ${trimmedName}`;

    const textContent = `New Portfolio Contact

Name: ${trimmedName}
Email: ${trimmedEmail}
Subject: ${trimmedSubject || "None"}

Message:
${trimmedMessage}
`;

    const htmlContent = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E5E5E5; border-radius: 12px; background-color: #ffffff; color: #111111;">
  <div style="border-bottom: 2px solid #2563EB; padding-bottom: 12px; margin-bottom: 20px;">
    <h2 style="margin: 0; color: #111111; font-size: 20px; font-weight: 700;">New Portfolio Contact</h2>
    <p style="margin: 4px 0 0; color: #6B6B6B; font-size: 13px;">Message received via your portfolio contact form</p>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
    <tr>
      <td style="padding: 8px 0; width: 90px; font-weight: 600; color: #6B6B6B;">Name:</td>
      <td style="padding: 8px 0; color: #111111; font-weight: 500;">${escapeHtml(trimmedName)}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: 600; color: #6B6B6B;">Email:</td>
      <td style="padding: 8px 0; color: #111111;"><a href="mailto:${escapeHtml(trimmedEmail)}" style="color: #2563EB; text-decoration: none;">${escapeHtml(trimmedEmail)}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: 600; color: #6B6B6B;">Subject:</td>
      <td style="padding: 8px 0; color: #111111;">${escapeHtml(trimmedSubject || "No subject provided")}</td>
    </tr>
  </table>

  <div style="margin-top: 16px; padding: 16px; background-color: #F8F8F6; border-radius: 8px; border-left: 3px solid #2563EB;">
    <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #6B6B6B;">Message</p>
    <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #111111;">${escapeHtml(trimmedMessage)}</p>
  </div>

  <p style="margin-top: 24px; font-size: 12px; color: #A3A3A3; text-align: center;">
    You can reply directly to this email to respond to ${escapeHtml(trimmedName)}.
  </p>
</div>
`;

    await transporter.sendMail({
      from: `"${trimmedName}" <${smtpUser}>`,
      to: contactTo,
      replyTo: trimmedEmail,
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (err) {
    console.error("Error processing contact form submission:", err);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again.",
    });
  }
}
