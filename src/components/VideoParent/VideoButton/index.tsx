import React from 'react';

interface Props {
  children: any;
  onClickHandler: (e: any) => void;
}
class VideoButton extends React.Component<Props, any> {
  render() {
    return (
      <button onClick={this.props.onClickHandler}>{this.props.children}</button>
    );
  }
}

export default VideoButton;
