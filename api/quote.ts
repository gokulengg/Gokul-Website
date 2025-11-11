import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import formidable from "formidable";
import fs from "fs/promises";

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

  try {
    // Parse multipart form data
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      maxFiles: 1,
      filter: ({ name, originalFilename }) => {
        if (name === "drawing" && originalFilename) {
          const allowedTypes = /\.(pdf|dwg|dxf|jpg|jpeg|png|gif|bmp|tiff|doc|docx)$/i;
          return allowedTypes.test(originalFilename);
        }
        return true;
      },
    });

    const [fields, files] = await form.parse(req);
    
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
    const phone = Array.isArray(fields.phone) ? fields.phone[0] : fields.phone;
    const details = Array.isArray(fields.details) ? fields.details[0] : fields.details;

    if (!name || !email || !phone || !details) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = requireEnv("GMAIL_USER");
    const pass = requireEnv("GMAIL_APP_PASSWORD");
    const company = process.env.COMPANY_EMAIL || user;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: { user, pass },
    });

    const mailOptions: any = {
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
    };

    // Handle file attachment if present
    const drawingFile = files.drawing?.[0];
    if (drawingFile && drawingFile.filepath) {
      try {
        const fileContent = await fs.readFile(drawingFile.filepath);
        mailOptions.attachments = [{
          filename: drawingFile.originalFilename || "drawing",
          content: fileContent,
          contentType: drawingFile.mimetype || "application/octet-stream",
        }];
      } catch (fileErr) {
        // Continue sending email without attachment
      }
      
      // Clean up temporary file
      try {
        await fs.unlink(drawingFile.filepath).catch(() => {});
      } catch (cleanupErr) {
        // Silently ignore cleanup errors
      }
    }

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Email handler error:", err);
    return res.status(500).json({ error: "Failed to send email: " + String(err) });
  }
}

// Disable body parsing for multipart form data
export const config = {
  api: {
    bodyParser: false,
  },
};
