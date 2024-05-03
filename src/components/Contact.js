import React, {useRef} from "react";
import emailjs from 'emailjs-com';


export default function Contact() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    const form = useRef();
    const publicKey = process.env.REACT_APP_PUBLIC_KEY;
    const serviceID = process.env.REACT_APP_SERVICE_ID;
    const templateID = process.env.REACT_APP_PUBLIC_KEY;



    emailjs.init({
        publicKey: publicKey,
        // Do not allow headless browsers
        blockHeadless: true,
        blockList: {
            // Block the suspended emails
            list: [],
            // The variable contains the email address
            watchVariable: 'userEmail',
        },
        limitRate: {
            // Set the limit rate for the application
            id: 'app',
            // Allow 1 request per 30s
            throttle: 30000,
        },
    });

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .send(serviceID, templateID, form.current)
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    return (
        <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Message</label>
            <textarea name="message" />
            <input type="submit" value="Send" />
        </form>
    );
};