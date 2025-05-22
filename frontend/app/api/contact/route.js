import nodemailer from "nodemailer";
import { NextResponse } from 'next/server';
import ContactMe from '../../../models/ContactMe';
import dbConnect from '../../../lib/dbConnect';
import { createClient } from "../../../utils/supabase/server";



export async function POST(request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }

        // Connect to the database (assuming you have a dbConnect function)
        // await dbConnect();
            
        
        // Create a new contact entry
        // const contactEntry = new ContactMe({
        //     name,
        //     email,
        //     message,
        //     createdAt: new Date(),
        // });

        // Save to the database
        // await contactEntry.save();

    // Configure Nodemailer Transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

// Send the email
await transporter.sendMail({
    from: `"${name}" <${email}>`, // user.email, sender's name and email
    to: process.env.EMAIL_USER,  // admin's email
    subject: `New Contact Form Submission from ${name}`,
    html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #007BFF;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="background-color: #f9f9f9; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">${message}</p>
        <p style="margin-top: 20px; font-size: 0.9em; color: #555;">This is an automated message.</p>
        </div>
    `,
});


        return NextResponse.json({ success: true, message: 'Your message has been received.' });
    } catch (error) {
        console.error('Error handling contact form submission:', error);
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
}