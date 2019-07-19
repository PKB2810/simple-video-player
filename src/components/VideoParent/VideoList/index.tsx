import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

interface IVideoObject {
  description: string;
  source: string;
  subtitle: string;
  thumb: string;
  title: string;
}

interface Props {
  videoList: IVideoObject[];
  playVideo: (videoUrl: string) => void;
  currentVideo: IVideoObject;
}
interface State {
  status: boolean;
}

class VideoList extends React.Component<Props, State> {
  state: State = {
    status: false
  };
  render() {
    let className = 'videoSelected';
    return (
      <section style={{ width: '30%', height: '100%' }}>
        <ListGroup>
          {this.props.videoList.map(video => {
            return (
              <ListGroupItem
                onClick={e => this.props.playVideo(video.source)}
                className={
                  video.source === this.props.currentVideo.source
                    ? className
                    : ''
                }>
                {video.source === this.props.currentVideo.source &&
                  'Now playing...'}

                <img
                  alt={video.title}
                  src={video.thumb}
                  width="100%"
                  height="80%"
                />
                <section> {video.title}</section>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </section>
    );
  }
}
export default VideoList;
