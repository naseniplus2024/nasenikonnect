"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const page = () => {
    const [isLoading, setIsLoading] = useState(false);
    const url = process.env.NEXTAUTH_URL;

    useEffect(() => {
        localStorage.removeItem("hasShownWelcome");
    }, []);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            await signIn("google", { callbackUrl: url });
            toast.info("Logging in with Google to access NASENIconnect...");
        } catch (error) {
            toast.error("Failed to login with Google, please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
           <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 to-purple-800 py-6 flex justify-between items-center shadow-lg">
    <div className="flex items-center ml-4">
            <Image
            src="/images/logo.png" // Replace with the correct NASENI logo path
            width={350}
            height={250}
            alt="NASENI Logo"

            
        />
         <span className="text-white text-2xl font-bold mr-2">connect</span>
    </div>
    <Button
        className="mr-4 bg-white text-black hover:bg-blue-600 dark:bg-gray-800 dark:text-white"
        onClick={handleLogin}
    >
        LOGIN WITH GOOGLE
    </Button>
      </header>

            {/* Section 1 */}
            <section
                className="flex items-center justify-center text-white text-center h-screen"
                style={{
                    backgroundImage: "url('/images/slider3.jpg')", // Replace with your image path
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="bg-black bg-opacity-60 p-8 rounded-lg shadow-xl">
                    <h1 className="text-5xl font-bold mb-4 text-blue-300">
                        NASENIconnect
                    </h1>
                    <p className="text-lg">
                    Connect with your team anytime, anywhere</p>
                </div>
            </section>

            {/* Features Section */}
            <section
                className="flex flex-col items-center justify-center py-20 bg-cover bg-center bg-gray-800 text-white"
                style={{ backgroundImage: "url('images/slider2.jpg')" }}
            >
                <h2 className="text-3xl font-bold mb-8">Why Choose NASENIconnect?</h2>
                <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                    {[ // Feature list
                        { title: "High-Quality Video and Audio", text: "Experience crystal-clear video and audio quality. Enjoy smooth communication without interruptions." },
                        { title: "Screen Sharing", text: "Easily share your screen to enhance collaboration. Present projects and brainstorm ideas in real-time." },
                        { title: "Secure Meetings", text: "End-to-end encryption ensures your meetings are confidential and secure for sensitive discussions." },
                        { title: "User-Friendly Interface", text: "A streamlined design makes hosting and joining meetings effortless, so you can focus on collaboration." },
                        { title: "Multi-Device Support", text: "Stay connected from any device, whether you're on a computer, tablet, or smartphone." },
                        { title: "Meeting Recording", text: "Record your sessions for later reference, ensuring important discussions are saved and accessible." },
                    ].map((feature, index) => (
                        <div key={index} className="bg-gray-700/80 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-green-300">{feature.title}</h3>
                            <p className="text-gray-300 mt-2">{feature.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section
                className="flex flex-col items-center justify-center py-20 bg-cover bg-center bg-blue-900 text-white"
                style={{ backgroundImage: "url('images/slider2.jpeg')" }}
            >
                <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
                <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                    {[
                        { feedback: "The NASENIconnect Video Conferencing Application has transformed how we communicate. The quality is unmatched!", user: "Dr. Mustapha." },
                        { feedback: "I love the screen sharing feature! It's so easy to collaborate with my team.", user: "Mr. Danladi Isah." },
                        { feedback: "Security is a huge concern for us, and NASENIconnect meets all our expectations.", user: "Fatima Lare." },
                        { feedback: "The user interface is fantastic! I can set up a meeting in no time.", user: "Musa Muhammed." },
                        { feedback: "The recording feature is a lifesaver for important sessions.", user: "Zainab Musa." },
                        { feedback: "I can connect from anywhere. Perfect for remote work!", user: "Dr. Samuel Kehinde." },
                        { feedback: "Hosting webinars has never been easier. My team loves the ease of use.", user: "Engr. Saheed M. Shuaibu" },
                        { feedback: "The multi-device support is brilliant; I can switch between devices seamlessly.", user: "Engr. Omlenyi Godwin" },
                        { feedback: "The platform is so reliable for our large team meetings. It's a game changer!", user: "Dr. Binta Yakubu" }, // Added testimonial
                    ].map((testimonial, index) => (
                        <div key={index} className="bg-gray-700/80 p-6 rounded-lg shadow-lg">
                            <p className="text-gray-300">"{testimonial.feedback}"</p>
                            <p className="text-gray-500 mt-2">- {testimonial.user}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer Section */}
            <footer className="flex flex-col items-center justify-center py-6 bg-gray-800 text-white">
                <p className="text-sm mb-2">&copy; 2024 NASENI. All rights reserved.</p>
                <p className="text-sm">
                    Follow us on{" "}
                    <a href="#" className="text-green-300">Facebook</a>,{" "}
                    <a href="#" className="text-green-300">Twitter</a>, and{" "}
                    <a href="#" className="text-green-300">LinkedIn</a>.
                </p>
            </footer>

            {isLoading && <Loader />}
        </div>
    );
};

export default page;
