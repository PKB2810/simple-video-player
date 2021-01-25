import React from "react";

interface Props {
  videoSrc: string;
  videoRef: any;
  setVideoDuration: () => void;
  setVolume: () => void;
  setCurrentTime: (e: any) => void;
}
class Video extends React.Component<any, any> {
  render() {
    const {
      setVideoDuration,
      setVolume,
      setCurrentTime,
      videoSrc,
      videoRef
    } = this.props;
    return (
      <video
        width="100%"
        height="80%"
        src={videoSrc}
        ref={videoRef}
        onCanPlay={e => {
          setVideoDuration();
          setVolume(e);
        }}
        onTimeUpdate={e => setCurrentTime(e)}
      />
    );
  }
}

export default Video;
