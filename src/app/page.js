"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "./components/Loader";
import Header from "./components/Header";
import MeetingAction from "./components/MeetingAction";
import MeetingFeature from "./components/MeetingFeature";
import VideoGallery from "./components/VideoGallery"; // New component
import HelpSupport from "./components/HelpSupport"; // New component
import SystemSettings from "./components/SystemSettings"; // New component

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [recordedVideos, setRecordedVideos] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoading(false);

      const hasShownWelcome = localStorage.getItem("hasShownWelcome");
      if (!hasShownWelcome) {
        toast.success(`Welcome back, ${session?.user?.name}!`);
        localStorage.setItem("hasShownWelcome", "true");
      }

      // Fetch recorded videos
      fetch("/api/videos")
        .then((res) => res.json())
        .then((data) => setRecordedVideos(data))
        .catch((err) => console.error("Error fetching videos:", err));
    } else if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [status, session]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-bli text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <ul className="space-y-6">
          <li>
            <a
              href="#recorded-videos"
              className="text-lg block bg-white text-gray-900 hover:bg-gray-200 rounded-lg shadow-md p-4 transition transform hover:scale-105"
            >
              Recorded Videos
            </a>
          </li>
          <li>
            <a
              href="#help-support"
              className="text-lg block bg-white text-gray-900 hover:bg-gray-200 rounded-lg shadow-md p-4 transition transform hover:scale-105"
            >
              Help and Support
            </a>
          </li>
          <li>
            <a
              href="#system-settings"
              className="text-lg block bg-white text-gray-900 hover:bg-gray-200 rounded-lg shadow-md p-4 transition transform hover:scale-105"
            >
              System Settings
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900">
        {/* Header Section */}
        <Header />

        {/* Main Section */}
        <main className="px-6 py-12 sm:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            {/* Introduction Section */}
            <section className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
  Your ultimate video conferencing platform
</h1>
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">
                  Connect, collaborate, and achieve your goals with seamless video conferencing
                </p>
                <MeetingAction />
              </div>

              <div className="md:w-1/2">
                <MeetingFeature />
              </div>
            </section>

            {/* Recorded Videos Section */}
            <section id="recorded-videos" className="mt-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Recorded Meetings
              </h2>
              <VideoGallery videos={recordedVideos} />
            </section>

            {/* Help and Support Section */}
            <section id="help-support" className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <HelpSupport />
            </section>

            {/* System Settings Section */}
            <section id="system-settings" className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <SystemSettings />
            </section>
          </div>
        </main>

        {/* Footer Section */}
        <footer className="bg-gray-100 dark:bg-gray-800 text-center py-6 mt-auto">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} NASENIconnect. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
