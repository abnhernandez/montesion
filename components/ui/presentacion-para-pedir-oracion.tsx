"use client";

import { useEffect, useState } from "react";

export default function PrayerSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function DynamicIsland() {
    return (
      <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-black shadow-lg">
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-black rounded-full shadow-md border border-gray-700 animate-pulse"></div>
        <iframe
          src="https://achieved-chocolate-7a6.notion.site/ebd/1ae9dbdb43a28092b88ff68f7b046982"
          className="absolute top-0 left-0 w-full h-full border-0 rounded-3xl"
          allowFullScreen
        />
      </div>
    );
  }

  function MacOSFrame() {
    return (
      <div className="relative w-full pb-[50.00%] mb-6 rounded-lg overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-8 z-10 flex items-center px-3 rounded-t-lg">
          <div className="flex space-x-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>
        </div>
        <iframe
          src="https://achieved-chocolate-7a6.notion.site/ebd/1ae9dbdb43a28092b88ff68f7b046982"
          className="absolute top-0 left-0 w-full h-full border-0 rounded-lg border-gray-300"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 max-w-3xl`}>
      {isMobile ? <DynamicIsland /> : <MacOSFrame />}
    </div>
  );
}