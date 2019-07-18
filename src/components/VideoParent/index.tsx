import React from 'react';
import VideoList from './VideoList';
import VideoPlayer from './VideoPlayer';

export interface IVideoObject {
  description: string;
  source: string;
  subtitle: string;
  thumb: string;
  title: string;
  status: boolean;
  currentTime: number;
  duration: number;
}

interface State {
  videoList: IVideoObject[];
  currentVideo: IVideoObject;
}
class VideoParent extends React.Component<any, State> {
  state: State = {
    videoList: [
      {
        description:
          "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
        source:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        subtitle: 'By Blender Foundation',
        thumb: 'images/BigBuckBunny.jpg',
        title: 'Big Buck Bunny',
        status: false,
        currentTime: 0,
        duration: 0
      },
      {
        description: 'The first Blender Open Movie from 2006',
        source:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        subtitle: 'By Blender Foundation',
        thumb: 'images/ElephantsDream.jpg',
        title: 'Elephant Dream',
        status: false,
        currentTime: 0,
        duration: 0
      },
      {
        description:
          'HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.',
        source:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        subtitle: 'By Google',
        thumb: 'images/ForBiggerBlazes.jpg',
        title: 'For Bigger Blazes',
        status: false,
        currentTime: 0,
        duration: 0
      }
    ],
    currentVideo: {
      description: '',
      source: '',
      subtitle: '',
      thumb: '',
      title: '',
      status: false,
      currentTime: 0,
      duration: 0
    }
  };
  toggleStatus = () => {
    this.setState(prevState => ({
      currentVideo: {
        // object that we want to update
        ...prevState.currentVideo, // keep all other key-value pairs
        status: !prevState.currentVideo.status // update the value of specific key
      }
    }));
  };

  changeCurrentTime = (currentTime: any) => {
    this.setState(prevState => ({
      currentVideo: {
        // object that we want to update
        ...prevState.currentVideo, // keep all other key-value pairs
        currentTime: currentTime // update the value of specific key
      }
    }));
  };

  //sets duration of video
  setDuration = (videoDuration: any) => {
    this.setState(prevState => ({
      currentVideo: {
        // object that we want to update
        ...prevState.currentVideo, // keep all other key-value pairs
        duration: videoDuration // update the value of specific key
      }
    }));
  };

  playVideo = (videoUrl: string): void => {
    this.setState({
      currentVideo: this.state.videoList.filter(
        video => video.source === videoUrl
      )[0]
    });
  };

  playPreviousVideo = (): void => {
    let index: any = this.state.videoList.findIndex(
      video => video.source === this.state.currentVideo.source
    );
    --index;
    if (index < 0) {
      return;
    } else {
      this.setState({
        currentVideo: this.state.videoList[index]
      });
    }
  };
  playNextVideo = (): void => {
    let index: any = this.state.videoList.findIndex(
      video => video.source === this.state.currentVideo.source
    );
    ++index;
    if (index === this.state.videoList.length) {
      return;
    } else {
      this.setState({
        currentVideo: this.state.videoList[index]
      });
    }
  };
  render() {
    return (
      <section
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-around'
        }}>
        <VideoList
          videoList={this.state.videoList}
          playVideo={this.playVideo}
        />
        <VideoPlayer
          currentVideo={this.state.currentVideo}
          toggleStatus={this.toggleStatus}
          changeCurrentTime={this.changeCurrentTime}
          setDuration={this.setDuration}
          playPreviousVideo={this.playPreviousVideo}
          playNextVideo={this.playNextVideo}
        />
      </section>
    );
  }
}
export default VideoParent;
