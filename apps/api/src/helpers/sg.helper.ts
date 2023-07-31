import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { EMAIL_SENDER, SENDGRID_API_KEY } from '../config';

export async function sendEmail(to: string, subject: string, html: string) {
  sgMail.setApiKey(SENDGRID_API_KEY as string);

  const msg: MailDataRequired = {
    to,
    from: EMAIL_SENDER as string,
    subject,
    html,
  };

  try {
    const [response] = await sgMail.send(msg);
    return { response: response.statusCode === 202 };
  } catch (error: any) {
    console.error(error);
  }
}
