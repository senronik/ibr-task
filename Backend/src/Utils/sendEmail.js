const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    try {
        const emailOptions = {
            from: process.env.EMAIL,
            to: options.email,
            subject: options.subject,
            html: options.html,
            attachments: options.attachments // Attachments array
        }
        const transporter = nodemailer.createTransport({
            host: process.env.SMPT_HOST,
            service: process.env.SMPT_SERVICE,
            port: process.env.SMPT_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            },
        });

        await transporter.sendMail(emailOptions);
        console.log("email sent sucessfully");
    } catch (error) {
        console.log("email not sent");
        console.log(error);
    }
};

module.exports = sendEmail;