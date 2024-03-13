const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

const emailTemplatePath = path.join(__dirname, '..', 'View', 'email.ejs');
const generateEmailTemplate = async (data, subject, msg, url,params) => {
    try {
        return await ejs.renderFile(emailTemplatePath, {
            subject: { Subject: subject },
            message: { msg: msg },
            verificationLink: `${process.env.CLIENT_URL}/${url}?${params}=${encodeURIComponent(data)}`
        });
    } catch (error) {
        console.error("Error rendering email template:", error);
        throw error;
    }
};

module.exports = generateEmailTemplate;
