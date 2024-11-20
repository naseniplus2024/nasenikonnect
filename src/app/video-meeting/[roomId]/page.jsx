"use client";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const VideoMeeting = () => {
  const params = useParams();
  const roomID = params.roomId;
  const { data: session, status } = useSession();
  const router = useRouter();
  const containerRef = useRef(null);
  const [zp, setZp] = useState(null);
  const [isInMeeting, setIsInMeeting] = useState(false);
  const [isRecording, setIsRecording] = useState(false); // State to track recording status

  useEffect(() => {
    if (status === "authenticated" && session?.user?.name && containerRef.current) {
      joinMeeting(containerRef.current);
    } else {
      console.log("Session not authenticated. Please sign in first.");
    }
  }, [session, status]);

  useEffect(() => {
    return () => {
      if (zp) {
        zp.destroy();
      }
    };
  }, [zp]);

  const joinMeeting = async (element) => {
    const appID = Number(process.env.NEXT_PUBLIC_ZEGOAPP_ID);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;

    if (!appID || !serverSecret) {
      throw new Error("Please provide both appID and serverSecret.");
    }

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      session?.user?.id || Date.now().toString(),
      session?.user?.name || "Guest"
    );

    const zegoInstance = ZegoUIKitPrebuilt.create(kitToken);
    setZp(zegoInstance);

    zegoInstance.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Join using this link",
          url: `${window.location.origin}/video-meeting/${roomID}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTurnOffRemoteCameraButton: true,
      showTurnOffRemoteMicrophoneButton: true,
      showRemoveUserButton: true,
      onJoinRoom: () => {
        toast.success("You have successfully joined the meeting.");
        setIsInMeeting(true);
      },
      onLeaveRoom: () => {
        endMeeting();
      },
    });
  };

  const startRecording = () => {
    if (zp) {
      zp.startRecording(); // Start the recording
      setIsRecording(true);
      toast.info("Recording started.");
    }
  };

  const stopRecording = () => {
    if (zp) {
      zp.stopRecording(); // Stop the recording
      setIsRecording(false);
      toast.info("Recording stopped.");
    }
  };

  const endMeeting = () => {
    if (zp) {
      zp.destroy();
    }
    toast.success("Meeting ended successfully.");
    setZp(null);
    setIsInMeeting(false);
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header Section with NASENI Logo and Participant Details */}
      <header className="bg-navy-blue p-4 text-center">
        <Image
          src="/images/logo.png"
          alt="NASENI Logo"
          width={350}
          height={250}
          className="mx-auto"
        />
        <h1 className="text-2xl font-bold text-white"> Video Conferencing Meeting Application</h1>
        <div className="mt-2 text-white">
          <p className="text-lg">
            Participant Name: <span className="font-semibold">{session?.user?.name || "Guest"}</span>
          </p>
          <p className="text-sm">Room ID: {roomID}</p>
        </div>
      </header>

      <main
        className={`flex-grow flex flex-col relative ${isInMeeting ? "h-screen" : ""}`}
      >
        <div
          ref={containerRef}
          className="video-container flex-grow"
          style={{ height: isInMeeting ? "100%" : "calc(100vh - 4rem)" }}
        ></div>
      </main>

      {/* Meeting Info and Features Section */}
      {!isInMeeting && (
        <div className="bg-gray-200 dark:bg-gray-800">
          <div className="p-6 text-center">
            <Button
              onClick={endMeeting}
              className="w-full bg-red-500 hover:bg-red-400 text-white"
            >
              Exit Meeting
            </Button>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default VideoMeeting;
