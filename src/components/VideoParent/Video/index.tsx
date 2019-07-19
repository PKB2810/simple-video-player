import React from 'react';

interface Props {
  videoSrc: string;
  videoRef: any;
  setVideoDuration: () => void;
  setVolume: () => void;
  setCurrentTime: (e: any) => void;
}
class Video extends React.Component<any, any> {
  render() {
    return (
      <video
        width="100%"
        height="100%"
        src={this.props.videoSrc}
        ref={this.props.videoRef}
        onCanPlay={e => {
          this.props.setVideoDuration();
          this.props.setVolume(e);
        }}
        onTimeUpdate={e => this.props.setCurrentTime(e)}
      />
    );
  }
}

export default Video;
