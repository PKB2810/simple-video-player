import React from 'react';
import { Modal } from 'react-bootstrap';

interface Props {
  showFlag: boolean;
  children: any;
  currentVideo: any;
  goFullScreen: () => void;
}

class VideoFullScreen extends React.Component<Props, any> {
  render() {
    return (
      <section
        style={{
          visibility: this.props.showFlag ? 'visible' : 'hidden',
          zIndex: 2,
          position: 'fixed',
          backgroundColor: 'black',
          top: '0%',
          left: '0%',
          width: '100%',
          height: '100%'
        }}>
        <button onClick={this.props.goFullScreen}>Exit full screen</button>
        {this.props.children}
      </section>
    );
  }
}
export default VideoFullScreen;
