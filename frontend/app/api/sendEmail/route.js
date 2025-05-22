import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import os from "os";

export async function POST(req) {
  try {
    const { area, coordinates, biomass, email } = await req.json();
    const { biomass: biomassValue, raster_map, message } = biomass || {};

    console.error("Received data:", { area, coordinates, biomassValue, email });

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, message: "Recipient email is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Convert base64 image to PNG file
    const imageBuffer = Buffer.from(raster_map, "base64");
    const tempDir = os.tmpdir();
    const imagePath = path.join(tempDir, `biomass_${Date.now()}.png`);
    await fs.writeFile(imagePath, imageBuffer);

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h2 style="color: #2e6c80;">🌿 Biomass Calculation Report</h2>
        <p>Dear User,</p>
        <p>Here is your biomass calculation result based on the data provided:</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="background-color: #f0f0f0;">
            <td style="padding: 10px; font-weight: bold;">📍 Area</td>
            <td style="padding: 10px;">${area}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">🌐 Coordinates</td>
            <td style="padding: 10px;"><pre style="margin: 0;">${JSON.stringify(coordinates, null, 2)}</pre></td>
          </tr>
          <tr style="background-color: #f0f0f0;">
            <td style="padding: 10px; font-weight: bold;">🌲 Estimated Biomass</td>
            <td style="padding: 10px;">${biomassValue}</td>
          </tr>
        </table>

        <p style="margin-top: 30px;">📷 A biomass visualization is attached to this email as an image.</p>

        <p style="margin-top: 30px;">If you have any questions or need further analysis, feel free to reply to this email.</p>
        <p style="margin-top: 20px;">Best regards,<br/><strong>ARForestApp Team</strong></p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "🌿 Biomass Calculation Results",
      html: emailHtml,
      attachments: [
        {
          filename: "biomass_result.png",
          path: imagePath,
          cid: "biomass_image", // Not embedded in this case, but usable if needed
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    // Clean up the image file after sending
    await fs.unlink(imagePath);

    return new Response(JSON.stringify({ success: true, message: "Email sent successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ success: false, message: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}