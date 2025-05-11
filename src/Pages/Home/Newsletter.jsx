import React, { useState, useEffect } from 'react';
import { FaPaperPlane, FaEnvelope, FaCheck, FaTimes } from 'react-icons/fa';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');
    const [subscribers, setSubscribers] = useState([]);

    useEffect(() => {
        const savedSubscribers = localStorage.getItem('newsletterSubscribers');
        if (savedSubscribers) {
            setSubscribers(JSON.parse(savedSubscribers));
        }
    }, []);

    const validateEmail = (email) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateEmail(email)) {
            setStatus('error');
            setMessage('Please enter a valid email address');
            return;
        }

        if (subscribers.includes(email)) {
            setStatus('error');
            setMessage('This email is already subscribed!');
            return;
        }

        const updatedSubscribers = [...subscribers, email];
        localStorage.setItem('newsletterSubscribers', JSON.stringify(updatedSubscribers));
        setSubscribers(updatedSubscribers);

        setStatus('success');
        setMessage('Thank you for subscribing!');
        setEmail('');

        setTimeout(() => {
            setStatus('');
            setMessage('');
        }, 3000);
    };

    return (
        <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            {/* Red Accent Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-500/20 to-transparent"></div>

            <div className="container mx-auto px-4 relative">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Icon */}
                    <div className="inline-block p-4 bg-red-500/20 rounded-full backdrop-blur-sm mb-8 hover:bg-red-500/30 transition-colors duration-300">
                        <FaEnvelope className="w-8 h-8" />
                    </div>

                    <h2 className="text-4xl font-bold mb-4">Stay Connected with Us</h2>
                    <p className="text-lg mb-8 text-white/90">
                        Subscribe to our newsletter for exclusive offers, mouthwatering recipes, 
                        and special events right in your inbox.
                    </p>

                    <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
                        <div className="relative flex items-center">
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address" 
                                className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all duration-300 pr-36"
                            />
                            <button 
                                type="submit"
                                className="absolute right-2 px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 flex items-center gap-2 group"
                            >
                                <span>Subscribe</span>
                                <FaPaperPlane className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Status Message */}
                        {status && (
                            <div className={`absolute -bottom-12 left-0 right-0 text-center ${
                                status === 'success' ? 'text-green-300' : 'text-red-300'
                            } flex items-center justify-center gap-2`}>
                                {status === 'success' ? (
                                    <FaCheck className="inline-block" />
                                ) : (
                                    <FaTimes className="inline-block" />
                                )}
                                {message}
                            </div>
                        )}
                    </form>

                    {/* Additional Info */}
                    <p className="mt-16 text-sm text-white/70">
                        Join our {subscribers.length} subscribers and never miss out on exclusive updates!
                    </p>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-500/10 rounded-full blur-2xl"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-500/10 rounded-full blur-2xl"></div>
        </section>
    );
};

export default Newsletter;