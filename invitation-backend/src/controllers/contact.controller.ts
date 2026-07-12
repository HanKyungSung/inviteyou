import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

const contactTransport = nodemailer.createTransport({
  sendmail: true,
  newline: 'unix',
  path: '/usr/sbin/sendmail'
});

const recipientEmail =
  process.env.CONTACT_RECIPIENT_EMAIL || 'general.inviteyou@gmail.com';
const senderEmail =
  process.env.CONTACT_FROM_EMAIL || 'InviteYou Website <website@inviteyou.ca>';
const allowedIndustries = new Set(['tech', 'finance', 'healthcare', 'other']);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getTrimmedString = (value: unknown): string =>
  typeof value === 'string' ? value.trim() : '';

export const sendContactInquiry = async (req: Request, res: Response) => {
  const name = getTrimmedString(req.body.name);
  const email = getTrimmedString(req.body.email);
  const industry = getTrimmedString(req.body.industry);
  const message = getTrimmedString(req.body.message);
  const companyWebsite = getTrimmedString(req.body.companyWebsite);

  if (companyWebsite) {
    console.warn('Blocked contact-form honeypot submission');
    return res.status(200).json({ message: 'Inquiry received.' });
  }

  if (
    !name ||
    name.length > 100 ||
    !emailPattern.test(email) ||
    email.length > 254 ||
    !allowedIndustries.has(industry) ||
    !message ||
    message.length > 5000
  ) {
    return res
      .status(400)
      .json({ message: 'Please provide valid contact details and a message.' });
  }

  const safeSubjectName = name.replace(/[\r\n]+/g, ' ');

  try {
    await contactTransport.sendMail({
      from: senderEmail,
      to: recipientEmail,
      replyTo: email,
      subject: `Website inquiry from ${safeSubjectName}`,
      text: [
        'A new inquiry was submitted through inviteyou.ca.',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Industry: ${industry}`,
        '',
        'Message:',
        message
      ].join('\n')
    });

    return res.status(200).json({ message: 'Inquiry sent.' });
  } catch (error) {
    console.error('Failed to send contact inquiry', error);
    return res.status(502).json({
      message: 'The inquiry could not be sent. Please try again later.'
    });
  }
};
