import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const slides = [
  {
    image: "/images/evc.jpeg", // Replace with the actual public URL
    title: "Get a link you can share",
    description:
      "Click New meeting to get a link you can send to people you want to meet with",
  },
  {
    image: "/images/slide1.jpg", // Replace with the actual public URL
    title: "Plan ahead",
    description:
      "Click New meeting to schedule meetings in Google Calendar and send invites to participants",
  },
  {
    image: "/images/data.jpg", // Replace with the actual public URL
    title: "Your meeting is safe",
    description:
      "No one can join a meeting unless invited or admitted by the host",
  },
  {
    image: "/images/slider3.jpg", // Replace with the actual public URL
    title: "Collaborate effectively",
    description:
      "Host meetings with tools designed to enhance team collaboration and productivity.",
  },
  {
    image: "/images/global.png", // Replace with the actual public URL
    title: "Global access",
    description:
      "Connect with anyone, anywhere in the world with NASENIplus seamless video conferencing application.",
  },
  {
    image: "/images/data.jpg", // Replace with the actual public URL
    title: "Data security guaranteed",
    description:
      "Our platform ensures your data is secure with industry-standard encryption.",
  },
];

const MeetingFeature = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % slides.length;
    setCurrentSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    setCurrentSlide(prevIndex);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <Image
          src={slides[currentSlide].image}
          alt="meeting_feature"
          width={300}
          height={300}
          className="rounded-full w-40 h-40 md:w-64 md:h-64"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 -left-10 transform -translate-y-1/2 -translate-x-full"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 -right-10 transform -translate-y-1/2 translate-x-full"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-900 dark:text-white">
        {slides[currentSlide].title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-center max-w-sm">
        {slides[currentSlide].description}
      </p>
      <div className="flex justify-center space-x-2 mt-4">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default MeetingFeature;
