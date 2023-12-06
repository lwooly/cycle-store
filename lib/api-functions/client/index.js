const { headers } = require("@/next.config")
const { Content } = require("next/font/google")

export const sendEmail = async (vals) => {
    try {
        const response = await fetch('/api/contact', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json; Charset="UTF8"'
        },
        body: JSON.stringify(vals)
    });

    if (!response.ok) throw response;
    console.log('Email sent');
    //Todo - hook up to snackbar
    } catch (err) {
        console.log(err)
    }
}