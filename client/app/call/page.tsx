"use client";
import ContextProvider, { SocketContext } from "@/lib/context/context";
import { useContext, useEffect, useRef } from "react";
const Call = () => {
  const { socket, peer } = useContext(SocketContext);
  const callerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fn = () => {
      navigator?.mediaDevices
        ?.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          console.log({ stream });
          if (callerRef && callerRef.current) {
            callerRef.current.srcObject = stream;
          }
        });
    };
    fn();
  }, []);

  return (
    <ContextProvider>
      <main className="min-h-screen flex flex-col py-12 px-24">
        <div className="h-1 shadow-lg flex-grow bg-[#eee] relative">
          {/* the caller  */}

          <div className="size-56 absolute right-0 -bottom-12">
            <video
              src={callerRef.current?.srcObject as any}
              ref={callerRef}
              autoPlay
            ></video>
          </div>
        </div>
      </main>
    </ContextProvider>
  );
};

export default Call;
