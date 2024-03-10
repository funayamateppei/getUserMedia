import "./App.css";
import * as MUI from "@mui/material";
import { useState, useRef } from "react";

function App() {
    const [videoStream, setVideoStream] = useState<MediaStream>();
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleStart = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setVideoStream(stream);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Error accessing video stream: ", error);
        }
    };

    const handleStop = () => {
        if (videoStream) {
            videoStream.getTracks().forEach((track) => track.stop());
            setVideoStream(undefined);
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <video ref={videoRef} autoPlay />

                <MUI.Stack direction="row" gap={1}>
                    <MUI.Button variant="contained" onClick={handleStart}>
                        Start
                    </MUI.Button>
                    <MUI.Button variant="contained" onClick={handleStop}>
                        Stop
                    </MUI.Button>
                </MUI.Stack>
            </header>
        </div>
    );
}

export default App;
