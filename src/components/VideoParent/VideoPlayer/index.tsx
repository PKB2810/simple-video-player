import React from "react";
import { IVideoObject } from "../../VideoParent";
import VideoDescription from "../VideoDescription";
import Video from "../Video";
import VideoSeekControl from "../VideoSeekControl";
import VideoButton from "../VideoButton";
import Heading from "../../Heading";
import VideoFullScreen from "../VideoFullScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeMute,
  faPlay,
  faPause,
  faForward,
  faBackward,
  faCaretLeft,
  faCaretRight,
  faExpand,
  faCompress
} from "@fortawesome/free-solid-svg-icons";

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
      this.video.current.totalMinutes = 0;
      this.video.current.totalSeconds = 0;
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
    this.video.current.totalMinutes = Math.floor(
      parseFloat(this.video.current.duration) / 60
    );
    this.video.current.totalSeconds = (
      parseFloat(this.video.current.duration) -
      this.video.current.totalMinutes * 60
    ).toFixed(0);
  };
  setCurrentTime = (e: any) => {
    // change currentTime of video when slider changes or onTimeUpdate event of video
    if (e.target.type === "range") {
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
    if (e.target.type === "range") {
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

  setShowControls = (e: Event) => {
    //  e.stopPropagation();
    this.setState({
      showControls: !this.state.showControls
    });
    if (this.showControlTimeout) {
      clearTimeout(this.showControlTimeout);
    }
    this.showControlTimeout = setTimeout(() => {
      //to hide controls after 5 sec
      if (this.state.showControls) {
        this.setState({
          showControls: !this.state.showControls
        });
      }
    }, 50000000);
  };

  renderControls = () => {
    return (
      <>
        <span
          style={{
            color: "white",
            position: "absolute",
            marginLeft: "2px",
            top: "30%",
            left: "10%",
            fontSize: "50px"
          }}
          onClick={this.props.playPreviousVideo}
        >
          <FontAwesomeIcon icon={faCaretLeft} />
        </span>
        <span
          style={{
            color: "white",
            position: "absolute",
            marginLeft: "2px",
            top: "30%",
            left: "50%",
            fontSize: "50px"
          }}
          onClick={this.props.toggleStatus}
        >
          <FontAwesomeIcon
            icon={this.props.currentVideo.status ? faPause : faPlay}
          />
        </span>
        <span
          style={{
            color: "white",
            position: "absolute",
            marginLeft: "2px",
            top: "30%",
            left: "90%",
            fontSize: "50px"
          }}
          onClick={this.props.playNextVideo}
        >
          <FontAwesomeIcon icon={faCaretRight} />
        </span>

        <section
          style={{
            zIndex: 2,
            position: "relative",
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            overflow: "auto"
          }}
          onClick={(e: any) => e.stopPropagation()}
        >
          <span
            style={{
              color: "white",
              display: "flex",
              marginLeft: "2px"
            }}
            onClick={this.props.toggleStatus}
          >
            <FontAwesomeIcon
              style={{ marginTop: "5px" }}
              icon={this.props.currentVideo.status ? faPause : faPlay}
            />
          </span>

          <VideoSeekControl
            labelText={
              this.video.current.minutes + ":" + this.video.current.seconds
            }
            rangeRef={this.slider}
            minVal="0"
            maxVal={this.props.currentVideo.duration.toString()}
            currentVal={this.props.currentVideo.currentTime.toString()}
            stepVal="1"
            labelMaxVal={
              this.video.current.totalMinutes.toString() +
              ":" +
              this.video.current.totalSeconds
            }
            onChangeHandler={this.setCurrentTime}
            render={props => (
              <>
                <span
                  style={{
                    color: "white",
                    display: "flex",
                    marginLeft: "2px"
                  }}
                >
                  {props.labelText}
                  <input
                    style={{
                      backgroundColor: "transparent",
                      marginLeft: "2px",
                      marginRight: "2px"
                    }}
                    type="range"
                    ref={props.rangeRef}
                    min={props.minVal}
                    max={props.maxVal}
                    value={props.currentVal}
                    step={props.stepVal}
                    onChange={e => props.onChangeHandler(e)}
                  />
                  <span>{props.labelMaxVal}</span>
                </span>
              </>
            )}
          />
          <VideoSeekControl
            labelText={
              <FontAwesomeIcon
                style={{ marginTop: "5px" }}
                icon={faVolumeMute}
              />
            }
            rangeRef={this.volumeSlider}
            minVal="0.0"
            maxVal="1.0"
            currentVal={this.state.volume}
            stepVal="0.1"
            labelMaxVal="100%"
            onChangeHandler={this.setVolume}
            render={props => (
              <>
                <span
                  style={{
                    color: "white",
                    display: "flex",
                    marginLeft: "2px"
                  }}
                >
                  {props.labelText}
                  <input
                    style={{
                      backgroundColor: "transparent",
                      marginLeft: "2px",
                      marginRight: "2px"
                    }}
                    type="range"
                    ref={props.rangeRef}
                    min={props.minVal}
                    max={props.maxVal}
                    value={props.currentVal}
                    step={props.stepVal}
                    onChange={e => props.onChangeHandler(e)}
                  />
                  <span>{props.labelMaxVal}</span>
                </span>
              </>
            )}
          />
          <span
            style={{
              color: "white",
              display: "flex",
              marginLeft: "2px"
            }}
            onClick={this.skipBackBy30Sec}
          >
            <FontAwesomeIcon style={{ marginTop: "5px" }} icon={faBackward} />
            30
          </span>
          <span
            style={{
              color: "white",
              display: "flex",
              marginLeft: "2px"
            }}
            onClick={this.skipForwardBy30Sec}
          >
            30
            <FontAwesomeIcon style={{ marginTop: "5px" }} icon={faForward} />
          </span>
          <span
            style={{
              color: "white",
              display: "flex",
              marginLeft: "2px"
            }}
            onClick={this.goFullScreen}
          >
            {this.state.fullScreen ? (
              <FontAwesomeIcon style={{ marginTop: "5px" }} icon={faCompress} />
            ) : (
              <FontAwesomeIcon style={{ marginTop: "5px" }} icon={faExpand} />
            )}
          </span>
        </section>
      </>
    );
  };

  render() {
    if (this.props.currentVideo.source.trim() !== "") {
      return (
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
            height: "100%"
          }}
        >
          <section style={{ width: "100%" }}>
            <Heading textSize="lg">{this.props.currentVideo.title}</Heading>
            <Heading textSize="md">{this.props.currentVideo.subtitle}</Heading>
            <section
              style={{ width: "100%" }}
              onClick={(e: any) => this.setShowControls(e)}
            >
              {this.state.fullScreen ? (
                <VideoFullScreen
                  currentVideo={this.props.currentVideo}
                  showFlag={this.state.fullScreen}
                  goFullScreen={this.goFullScreen}
                >
                  <Video
                    videoSrc={this.props.currentVideo.source}
                    videoRef={this.video}
                    setVideoDuration={this.setVideoDuration}
                    setVolume={this.setVolume}
                    setCurrentTime={this.setCurrentTime}
                  />
                  {this.state.showControls && this.renderControls()}
                </VideoFullScreen>
              ) : (
                <>
                  {" "}
                  <section
                    style={{
                      backgroundColor: "black",
                      width: "100%",
                      position: "relative"
                    }}
                  >
                    <Video
                      videoSrc={this.props.currentVideo.source}
                      videoRef={this.video}
                      setVideoDuration={this.setVideoDuration}
                      setVolume={this.setVolume}
                      setCurrentTime={this.setCurrentTime}
                    />
                    {this.state.showControls && this.renderControls()}
                  </section>
                  <VideoDescription>
                    Description:{this.props.currentVideo.description}
                  </VideoDescription>
                </>
              )}
            </section>
          </section>
        </section>
      );
    }
    return (
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          width: "70%",
          height: "100%"
        }}
      >
        Click on any video
      </section>
    );
  }
}
export default VideoPlayer;
