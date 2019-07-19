import React from 'react';
import { IVideoObject } from '../../VideoParent';
import VideoDescription from '../VideoDescription';
import Video from '../Video';
import VideoSeekControl from '../VideoSeekControl';
import VideoButton from '../VideoButton';
import Heading from '../../Heading';
import VideoFullScreen from '../VideoFullScreen';

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
  fullScreen: boolean;
  mouseX: any;
  mouseY: any;
}

class VideoPlayer extends React.Component<Props, State> {
  video: any;
  slider: any;
  volumeSlider: any;
  showControlTimeout: any;

  constructor(props: Props) {
    super(props);
    // create a ref to store the  DOM elements
    this.video = React.createRef();
    this.slider = React.createRef();
    this.volumeSlider = React.createRef();
    this.showControlTimeout = null;
  }
  state: State = {
    volume: 0.5,
    autoPlay: false,
    videoEnded: false,
    showControls: false,
    fullScreen: false,
    mouseX: 0,
    mouseY: 0
  };
  componentDidMount() {
    if (!this.video.current) return;
    else {
      this.video.current.minutes = 0;
      this.video.current.seconds = 0;
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
  componentWillUnmount() {
    clearTimeout(this.showControlTimeout);
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
      this.video.current.minutes = Math.floor(
        parseFloat(this.video.current.currentTime) / 60
      );
      this.video.current.seconds = (
        parseFloat(this.video.current.currentTime) -
        this.video.current.minutes * 60
      ).toFixed(0);
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
        this.video.current.minutes = Math.floor(
          parseFloat(this.video.current.currentTime) / 60
        );
        this.video.current.seconds = (
          parseFloat(this.video.current.currentTime) -
          this.video.current.minutes * 60
        ).toFixed(0);
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
    this.setState({
      fullScreen: !this.state.fullScreen
    });
  };

  setShowControls = (e: any) => {
    this.setState({
      showControls: !this.state.showControls
    });

    this.showControlTimeout = setTimeout(() => {
      //to hide controls after 5 sec
      if (this.state.showControls) {
        this.setState({
          showControls: !this.state.showControls
        });
      }
    }, 5000);
  };
  render() {
    if (this.props.currentVideo.source.trim() !== '') {
      return (
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '70%',
            height: '100%'
          }}>
          <section style={{ width: '100%' }}>
            <Heading textSize="lg">{this.props.currentVideo.title}</Heading>
            <Heading textSize="md">{this.props.currentVideo.subtitle}</Heading>
            <section style={{ width: '100%' }} onClick={this.setShowControls}>
              {this.state.fullScreen ? (
                <VideoFullScreen
                  currentVideo={this.props.currentVideo}
                  showFlag={this.state.fullScreen}
                  goFullScreen={this.goFullScreen}>
                  <Video
                    videoSrc={this.props.currentVideo.source}
                    videoRef={this.video}
                    setVideoDuration={this.setVideoDuration}
                    setVolume={this.setVolume}
                    setCurrentTime={this.setCurrentTime}
                  />
                </VideoFullScreen>
              ) : (
                <>
                  {' '}
                  <Video
                    videoSrc={this.props.currentVideo.source}
                    videoRef={this.video}
                    setVideoDuration={this.setVideoDuration}
                    setVolume={this.setVolume}
                    setCurrentTime={this.setCurrentTime}
                  />
                  <VideoDescription>
                    Description:{this.props.currentVideo.description}
                  </VideoDescription>
                </>
              )}
            </section>
            {this.state.showControls && (
              <section
                style={{
                  zIndex: 2,
                  position: 'absolute',
                  top: '50%',
                  left: '50%'
                }}>
                <section>
                  <VideoButton onClickHandler={this.props.playPreviousVideo}>
                    Play Previous
                  </VideoButton>
                  <VideoButton onClickHandler={this.props.toggleStatus}>
                    {this.props.currentVideo.status ? 'Pause' : 'Play'}
                  </VideoButton>
                  <VideoButton onClickHandler={this.props.playNextVideo}>
                    Play Next
                  </VideoButton>
                </section>
                <section className="slidecontainer">
                  <VideoSeekControl
                    labelText={
                      this.video.current.minutes +
                      ':' +
                      this.video.current.seconds
                    }
                    rangeRef={this.slider}
                    minVal="0"
                    maxVal={this.props.currentVideo.duration.toString()}
                    currentVal={this.props.currentVideo.currentTime.toString()}
                    stepVal="1"
                    onChangeHandler={this.setCurrentTime}
                    render={props => (
                      <>
                        <span>{props.labelText}</span>
                        <input
                          type="range"
                          ref={props.rangeRef}
                          min={props.minVal}
                          max={props.maxVal}
                          value={props.currentVal}
                          step={props.stepVal}
                          onChange={e => props.onChangeHandler(e)}
                        />
                      </>
                    )}
                  />
                </section>
                <section className="volumeSlider">
                  <VideoSeekControl
                    labelText={'Volume:'}
                    rangeRef={this.volumeSlider}
                    minVal="0.0"
                    maxVal="1.0"
                    currentVal={this.state.volume}
                    stepVal="0.1"
                    onChangeHandler={this.setVolume}
                    render={props => (
                      <>
                        <span>{props.labelText}</span>
                        <input
                          type="range"
                          ref={props.rangeRef}
                          min={props.minVal}
                          max={props.maxVal}
                          value={props.currentVal}
                          step={props.stepVal}
                          onChange={e => props.onChangeHandler(e)}
                        />
                      </>
                    )}
                  />
                </section>
                <section>
                  <VideoButton onClickHandler={this.skipForwardBy30Sec}>
                    +30
                  </VideoButton>
                  <VideoButton onClickHandler={this.skipBackBy30Sec}>
                    -30
                  </VideoButton>
                </section>
                <section>
                  <VideoButton onClickHandler={this.goFullScreen}>
                    Fullscreen
                  </VideoButton>
                </section>
              </section>
            )}
          </section>
        </section>
      );
    }
    return (
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '70%',
          height: '100%'
        }}>
        Click on any video
      </section>
    );
  }
}
export default VideoPlayer;
