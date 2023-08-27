import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:"a.d.keness@gmail.com",
        pass: "qlefyulvgcvybrso"
    }
});

const mailOptions = {
    from: "a.d.keness@gmail.com",
    to: "z5371654@ad.unsw.edu.au",
    subject: "Accommodation Notification",
    text: "Wow, it works!"
}

export function sendNotif(response: any) {
    if (response.res24) {
        mailOptions.text = "Applications are now open for 2024!";
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    }
}

export default sendNotif;