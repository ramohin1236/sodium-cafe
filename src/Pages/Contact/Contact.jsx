import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement form submission logic
        console.log(formData);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
         
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                    <p className="text-lg text-gray-600">Get in touch with us for any questions or concerns</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        {/* Info Cards */}
                        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <FaPhone className="h-6 w-6 text-red-500" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900">Phone</p>
                                        <p className="text-sm text-gray-600">+880 1234-567890</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <FaEnvelope className="h-6 w-6 text-red-500" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900">Email</p>
                                        <p className="text-sm text-gray-600">info@sodiumcafe.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <FaMapMarkerAlt className="h-6 w-6 text-red-500" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900">Address</p>
                                        <p className="text-sm text-gray-600">123 Restaurant Lane<br />Dhaka, Bangladesh</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Find Us</h2>
                            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                <iframe
                                    title="Sodium Cafe Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.3701967527755!2d90.37484661534916!3d23.755241084590352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b7a55cd36f%3A0xd8d5905615a67e24!2sDhanmondi%2C%20Dhaka%201205!5e0!3m2!1sen!2sbd!4v1620834567890!5m2!1sen!2sbd"
                                    className="w-full h-full border-0"
                                    allowFullScreen=""
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Follow Us</h2>
                            <div className="flex space-x-6">
                                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                                    <FaFacebook className="h-6 w-6" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                                    <FaTwitter className="h-6 w-6" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                                    <FaInstagram className="h-6 w-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;