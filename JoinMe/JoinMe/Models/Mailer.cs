using System;
using System.Net.Mail;

namespace JoinMeServices.Models
{
    public class Mailer
    {
        private void sendMail(object sender, EventArgs e)
        {
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

                mail.From = new MailAddress("Adresse mail");
                mail.To.Add("to_address");
                mail.Subject = "Recuperation de votre mot de passe.";
                mail.Body = "Suite à votre demande, votre mot de passe est : ";

                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("username", "password");
                SmtpServer.EnableSsl = true;

                SmtpServer.Send(mail);
                //MessageBox.Show("mail Send");
            }
            catch (Exception ex)
            {
                //MessageBox.Show(ex.ToString());
            }
        }
    }
}