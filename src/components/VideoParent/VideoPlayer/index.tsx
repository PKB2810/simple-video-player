import React from 'react';
import { IVideoObject } from '../../VideoParent';
import { Button } from 'reactstrap';
interface Props {
  currentVideo: IVideoObject;
  toggleStatus: () => void;
  changeCurrentTime: (currentTime: any) => void;
  setDuration: (videoDuration: any) => void;
}

class VideoPlayer extends React.Component<Props, any> {
  video: any;
  slider: any;
  constructor(props: Props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.video = React.createRef();
    this.slider = React.createRef();
  }
  componentDidMount() {
    if (!this.video.current) return;
    else {
      if (this.props.currentVideo.status) {
        this.video.current.play();
      } else {
        this.video.current.pause();
      }
    }
  }
  componentDidUpdate() {
    if (!this.video.current) return;
    if (this.props.currentVideo.status) {
      // this.props.setDuration(this.video.current.duration);
      this.video.current.play();
    } else {
      this.video.current.pause();
    }
  }
  setVideoDuration = () => {
    this.props.setDuration(this.video.current.duration);
  };
  setCurrentTime = (e: any) => {
    // console.log(this.slider.current);
    if (e.target.type === 'range') {
      this.props.changeCurrentTime(this.slider.current.value);
      this.video.current.currentTime = this.slider.current.value;
    } else {
      this.props.changeCurrentTime(this.video.current.currentTime);
    }
  };

  setCurrentTimeFromSlider = () => {
    console.log(this.slider.current.value);
    this.props.changeCurrentTime(this.slider.current.value);
  };

  render() {
    if (this.props.currentVideo.source.trim() !== '') {
      return (
        <>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <video
              width="500px"
              height="200px"
              autoPlay
              src={this.props.currentVideo.source}
              ref={this.video}
              onCanPlay={this.setVideoDuration}
              onTimeUpdate={e => this.setCurrentTime(e)}
            />
            {this.props.currentVideo.status ? (
              <>
                <button onClick={this.props.toggleStatus}>Pause</button>
                <div className="slidecontainer">
                  <input
                    type="range"
                    ref={this.slider}
                    min="0"
                    max={this.props.currentVideo.duration.toString()}
                    value={this.props.currentVideo.currentTime.toString()}
                    id="myRange"
                    step="1"
                    onChange={e => this.setCurrentTime(e)}
                  />
                </div>
              </>
            ) : (
              <>
                <button onClick={this.props.toggleStatus}>Play</button>
                <div className="slidecontainer">
                  <input
                    type="range"
                    min="0"
                    ref={this.slider}
                    max={this.props.currentVideo.duration.toString()}
                    value={this.props.currentVideo.currentTime.toString()}
                    id="myRange"
                    step="1"
                    onChange={e => this.setCurrentTime(e)}
                  />
                </div>
              </>
            )}
          </div>
        </>
      );
    }
    return <>Click to play Video</>;
  }
}
export default VideoPlayer;
