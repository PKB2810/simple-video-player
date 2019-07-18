import React from 'react';
import { IVideoObject } from '../../VideoParent';
import { Button } from 'reactstrap';
interface Props {
  currentVideo: IVideoObject;
  toggleStatus: () => void;
  changeCurrentTime: (currentTime: any) => void;
  setDuration: (videoDuration: any) => void;
  playPreviousVideo: () => void;
  playNextVideo: () => void;
}

interface State {
  volume: number;
  autoPlay: boolean;
  videoEnded: boolean;
  showControls: boolean;
  mouseX:any;
  mouseY:any;
}

class VideoPlayer extends React.Component<Props, State> {
  video: any;
  slider: any;
  volumeSlider: any;
  constructor(props: Props) {
    super(props);
    // create a ref to store the  DOM elements
    this.video = React.createRef();
    this.slider = React.createRef();
    this.volumeSlider = React.createRef();
  }
  state: State = {
    volume: 0.5,
    autoPlay: false,
    videoEnded: false,
    showControls: false,
    mouseX:0,
    mouseY:0
  };
  componentDidMount() {
    if (!this.video.current) return;
    else {
      this.video.current.minutes=0;
      this.video.current.seconds=0;
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
      this.video.current.play();
    } else {
      this.video.current.pause();
    }
  }
  setVideoDuration = () => {
    //duration of video is set when browser is ready to play the video,onCanPlay event
    this.props.setDuration(this.video.current.duration);
  };
  setCurrentTime = (e: any) => {
    // change currentTime of video when slider changes or onTimeUpdate event of video
    if (e.target.type === 'range') {
      this.props.changeCurrentTime(this.slider.current.value); //set current time to slider value so as it reflects in slider
      this.video.current.currentTime = this.slider.current.value; //play video from current time set
      this.video.current.minutes = Math.floor( parseFloat(this.video.current.currentTime) /60);
      this.video.current.seconds = (parseFloat(this.video.current.currentTime)- this.video.current.minutes * 60).toFixed(0);
    } else {
      if (!this.slider.current) return;
      if (
        this.video.current.currentTime.toString() ===
        this.slider.current.max.toString()
      ) {
        //     this.setState({ videoEnded: true });
        this.video.current.pause();
        this.props.toggleStatus();
      } else {
        this.props.changeCurrentTime(this.video.current.currentTime); //update current time so as to reflect in slider
        this.video.current.minutes = Math.floor( parseFloat(this.video.current.currentTime) /60);
        this.video.current.seconds = (parseFloat(this.video.current.currentTime)- this.video.current.minutes * 60).toFixed(0);;
      }
    }
  };

  setVolume = (e: any) => {
    if (e.target.type === 'range') {
      this.setState(
        { volume: parseFloat(this.volumeSlider.current.value) },
        () => {
          this.video.current.volume = parseFloat(
            this.volumeSlider.current.value
          );
        }
      );
    } else {
      this.video.current.volume = this.state.volume;
    }
  };
  skipForwardBy30Sec = () => {
    this.slider.current.value =
      parseFloat(this.slider.current.value) + 30 >
      parseFloat(this.slider.current.max)
        ? this.slider.current.max
        : (parseFloat(this.slider.current.value) + 30).toString();
    this.props.changeCurrentTime(this.slider.current.value); //set current time to slider value so as it reflects in slider
    this.video.current.currentTime = this.slider.current.value; //play video from current time set
  };

  skipBackBy30Sec = () => {
    this.slider.current.value =
      parseFloat(this.slider.current.value) - 30 <
      parseFloat(this.slider.current.min)
        ? this.slider.current.min
        : (parseFloat(this.slider.current.value) - 30).toString();
    this.props.changeCurrentTime(this.slider.current.value); //set current time to slider value so as it reflects in slider
    this.video.current.currentTime = this.slider.current.value; //play video from current time set
  };

  goFullScreen = () => {
    this.video.current.webkitEnterFullscreen();
  };

  setShowControls = (e:any) => { 
        this.setState({
          showControls:!this.state.showControls
      });  
  };
  render() {
    if (this.props.currentVideo.source.trim() !== '') {
      return (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '70%',
              height: '100%'
            }}>
            <div style={{ width: '100%' }}>
              <div style={{ width: '100%' }} onClick={this.setShowControls}>
                <video
                  width="100%"
                  height="100%"
                  src={this.props.currentVideo.source}
                  ref={this.video}
                  onCanPlay={e => {
                    this.setVideoDuration();
                    this.setVolume(e);
                  }}
                  onTimeUpdate={e => this.setCurrentTime(e)}
                />
              </div>
              {this.state.showControls && (
                <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
                  {this.props.currentVideo.status ? (
                    <>
                      <div>
                        <button onClick={this.props.playPreviousVideo}>
                          Play Previous
                        </button>
                        <button onClick={this.props.toggleStatus}>Pause</button>
                        <button onClick={this.props.playNextVideo}>
                          Play Next
                        </button>
                      </div>

                      <div className="slidecontainer">
                      <span>{this.video.current.minutes + ':' +  this.video.current.seconds}</span>
                        <input
                          type="range"
                          ref={this.slider}
                          min="0"
                          max={this.props.currentVideo.duration.toString()}
                          value={this.props.currentVideo.currentTime.toString()}
                          step="1"
                          onChange={e => this.setCurrentTime(e)}
                        />
                      </div>
                      <div className="volumeSlider">
                      <span>Volume:</span>
                        <input
                          type="range"
                          ref={this.volumeSlider}
                          min="0.0"
                          max="1.0"
                          value={this.state.volume}
                          step="0.1"
                          onChange={this.setVolume}
                        />
                      </div>
                      <div>
                        <button onClick={this.skipForwardBy30Sec}>+30</button>
                        <button onClick={this.skipBackBy30Sec}>-30</button>
                      </div>
                      <div>
                        <button onClick={this.goFullScreen}>Fullscreen</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <button onClick={this.props.playPreviousVideo}>
                          Play Previous
                        </button>
                        <button onClick={this.props.toggleStatus}>Play</button>
                        <button onClick={this.props.playNextVideo}>
                          Play Next
                        </button>
                      </div>

                      <div className="slidecontainer">
                      <span>{this.video.current.minutes + ':' +  this.video.current.seconds}</span>
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
                      <div className="volumeSlider">
                      <span>Volume:</span>
                        <input
                          type="range"
                          ref={this.volumeSlider}
                          min="0.0"
                          max="1.0"
                          value={this.state.volume}
                          step="0.1"
                          onChange={this.setVolume}
                        />
                      </div>
                      <div>
                        <button onClick={this.skipForwardBy30Sec}>+30</button>
                        <button onClick={this.skipBackBy30Sec}>-30</button>
                      </div>
                      <div>
                        <button onClick={this.goFullScreen}>Fullscreen</button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      );
    }
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '70%',
          height: '100%'
        }}>
        Click on any video
      </div>
    );
  }
}
export default VideoPlayer;
