import { Router } from "express";
import { z } from "zod";
import multer from "multer";
import { sendQuoteEmail } from "../lib/sendEmail";

const router = Router();

const quoteSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  details: z.string().min(1), // Removed min length limit
});

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1, // Only one file allowed
  },
  fileFilter: (req, file, cb) => {
    // Allow PDF, DWG, DXF, and images
    const allowedTypes = /\.(pdf|dwg|dxf|jpg|jpeg|png|gif|bmp|tiff)$/i;
    if (allowedTypes.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF, DWG, DXF, and image files are allowed."));
    }
  },
});

router.post("/", upload.single("drawing"), async (req, res) => {
  const parse = quoteSchema.safeParse(req.body);
  if (!parse.success) {
    console.warn("Quote submission validation failed", { body: req.body, issues: parse.error.issues });
    return res.status(400).json({ error: "Invalid input", issues: parse.error.issues });
  }

  try {
    const { name, email, phone, details } = parse.data;
    const file = req.file;
    
    await sendQuoteEmail({ 
      name, 
      email, 
      phone, 
      details,
      attachment: file ? {
        filename: file.originalname,
        content: file.buffer,
        contentType: file.mimetype,
      } : undefined
    });
    
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
