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
}
interface State {
  status: boolean;
}

class VideoList extends React.Component<Props, State> {
  state: State = {
    status: false
  };
  render() {
    return (
      <section style={{ width: '30%', height: '100%' }}>
        <ListGroup>
          {this.props.videoList.map(video => {
            return (
              <ListGroupItem onClick={e => this.props.playVideo(video.source)}>
                <img src={video.thumb} width="20px" height="20px" />
                {video.title}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </section>
    );
  }
}
export default VideoList;
