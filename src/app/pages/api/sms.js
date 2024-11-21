// pages/api/send-sms.js
import { Twilio } from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ message: "Missing 'to' or 'message' field" });
  }

  try {
    // Use environment variables to secure sensitive data
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !twilioPhoneNumber) {
      throw new Error("Twilio credentials are not set in environment variables.");
    }

    // Initialize Twilio client
    const client = new Twilio(accountSid, authToken);

    // Send SMS
    const response = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to,
    });

    return res.status(200).json({
      success: true,
      message: "SMS sent successfully!",
      sid: response.sid,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send SMS",
      error: error.message,
    });
  }
}
