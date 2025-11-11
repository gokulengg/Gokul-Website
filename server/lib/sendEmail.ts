import nodemailer from "nodemailer";

interface QuoteData {
  name: string;
  email: string;
  phone: string;
  details: string;
  attachment?: {
    filename: string;
    content: Buffer;
    contentType: string;
  };
}

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var ${name}`);
  return v;
}

export async function sendQuoteEmail(data: QuoteData) {
  console.log("Attempting to send email for:", data.name);
  
  const user = requireEnv("GMAIL_USER");
  const pass = requireEnv("GMAIL_APP_PASSWORD");
  const company = process.env.COMPANY_EMAIL || user;

  console.log("Creating transporter with user:", user);

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user, pass },
    debug: true,
    logger: true,
  });

  // Test connection
  try {
    await transporter.verify();
    console.log("SMTP connection verified successfully");
  } catch (err) {
    console.error("SMTP verification failed:", err);
    throw new Error("Email service unavailable");
  }

  const html = `<h2>New Quote Request</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Details:</strong><br/>${data.details.replace(/\n/g, '<br/>')}</p>`;

  const mailOptions: any = {
    from: `Quote<${user}>`,
    to: company,
    replyTo: data.email,
    subject: `New Quote Request from ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nDetails:\n${data.details}${data.attachment ? `\n\nAttachment: ${data.attachment.filename}` : ''}`,
    html,
  };

  if (data.attachment) {
    mailOptions.attachments = [{
      filename: data.attachment.filename,
      content: data.attachment.content,
      contentType: data.attachment.contentType,
    }];
  }

  console.log("Sending email...");
  const result = await transporter.sendMail(mailOptions);
  console.log("Email sent successfully:", result.messageId);
  return result;
}
