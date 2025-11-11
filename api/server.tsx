import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var ${name}`);
  return v;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, phone, details } = req.body || {};
  if (!name || !email || !phone || !details) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const user = requireEnv("GMAIL_USER");
    const pass = requireEnv("GMAIL_APP_PASSWORD");
    const company = process.env.COMPANY_EMAIL || user;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `Quote Bot <${user}>`,
      to: company,
      replyTo: email,
      subject: `New Quote Request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDetails:\n${details}`,
      html: `<h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Details:</strong><br/>${String(details).replace(/\n/g, '<br/>')}</p>`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
