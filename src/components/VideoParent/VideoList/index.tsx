import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

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
    const { playVideo, currentVideo, videoList } = this.props;
    let className = "videoSelected";
    return (
      <ListGroup>
        {videoList.map(video => {
          return (
            <ListGroupItem
              onClick={e => playVideo(video.source)}
              className={video.source === currentVideo.source ? className : ""}
            >
              {video.source === currentVideo.source && "Now playing..."}

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
    );
  }
}
export default VideoList;
