import * as nodemailer from "nodemailer";

let emailConfig = {
	host: "smtp.office365.com",
	port: 587,
	secure: false,
	tls:{
         rejectUnauthorized: false,
         ciphers:'SSLv3'  
  },
	auth: {
		user: 'trialforce@outlook.com.br',
		pass: 'Dungo022',
	},
}

let mailOptions = {
  from: "trialforce@outlook.com.br",
  to: "trialforce@gmail.com",
  subject: "Estou enviando um e-mail pelo node TS",
  html: "Só um e-mail de <i>exemplo</i>, com <b>html</b> e acentuação (ts)."
};

let transporter = nodemailer.createTransport(emailConfig);

transporter.sendMail(mailOptions, function(error, info)
{
  if (error) 
  {
    console.log('Erro ao enviar email:' + error);
  } 
  else 
  {
    console.log('Email enviado: ' + info.response);
  }
});