import nodemailer from "nodemailer";

const resetPassMail = async (options) => {
  const transporter = nodemailer.createTransport({
    // NM -> NODE-MAILER

    // host: process.env.NM_HOST,
    // port: process.env.NM_PORT,
    service: process.env.nm_service,
    auth: {
      user: process.env.nm_mail,
      pass: process.env.nm_pass,
    },
    // to get google app password -
    // google account -> security -> set 2 step verfication -> app password -> select app (custom name-nodemailer)
  });

  const mailOpts = {
    from: process.env.nm_mail,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(mailOpts);
};

const contactMail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.nm_service,
    auth: {
      user: process.env.nm_mail,
      pass: process.env.nm_pass,
    },
  });

  const mailOpts = {
    from: options.email,
    to: process.env.nm_mail,
    subject: "Message From Dummy Ecomm-App",
    html: `
            <div>
              <p>Name: <b>${options.name}</b></p>
              <p>Email: <b>${options.email}</b></p>
              <p>Message: <i>${options.msg}</i></p>
            </div>
        `,
  };

  await transporter.sendMail(mailOpts);
};

export { resetPassMail, contactMail };
