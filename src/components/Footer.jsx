import { useState } from "react";

const Footer = () => {
    // Array of inspiring quotes to iterate through
    const inspiringQuotes = [
        "Be like a banana: Stay sweet on the inside, tough on the outside, and always ready to split when necessary.",
        "Success is like peeling a banana—sometimes it takes a few tries, but the reward is always worth it.",
        "Don't compare your ripeness to someone else's. Every banana ripens at its own pace.",
        "When life gives you bruises, remember: Even a bruised banana can make the sweetest smoothie.",
        "Like a banana, your potential is hidden beneath the peel—unwrap your greatness!",
        "Peel away your doubts and step into your greatness!",
        "A bunch is always stronger than a single banana—teamwork makes the dream work!",
        "Don't let life make you slip—find your balance and keep moving forward!",
        "Every day is a fresh banana. Don't let it go to waste!",
        "Even when the world seems bananas, stay positive and keep shining!",
    ];

    // useState to store the selected quote
    const [quote, setQuote] = useState(null);

    //Function to store the selected quote
    const generateRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * inspiringQuotes.length);
        setQuote(inspiringQuotes[randomIndex]);
    };

    return (
        <section 
        id="footer" 
        className="container mx-auto flex items-center justify-center gap-8 p-4">
            <p className="text-lg">Need Inspiration?</p>
                <button
                onClick={generateRandomQuote}
                className="btn btn-outline btn-primary">
                    Click here
                </button>
                {quote !== null && (
                <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-primary mb-16">
                        {quote}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Footer;