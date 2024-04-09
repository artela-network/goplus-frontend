import React from "react";
import './video.css'
const Video = () => {
    return (
        <>
            <div className="rug_pull_video_box">
                <div className="rug_pull_video_bk">
                    <video className="rug_pull_video-background" src="https://framerusercontent.com/assets/thoVJI505450y1BDDWkUogY7o5U.mp4" loop
                      autoPlay  muted data-relingo-block="true"></video>
                </div>
            </div>
        </>
    )
}
export default Video;