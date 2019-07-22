import React from "react";

interface Props {
  labelText: any;
  minVal: any;
  maxVal: any;
  currentVal: any;
  stepVal: any;
  rangeRef: any;
  labelMaxVal: any;
  onChangeHandler: (e: any) => void;
  render: (props: any) => any;
}
class VideoSeekControl extends React.Component<Props, any> {
  render() {
    return this.props.render(this.props);
  }
}

export default VideoSeekControl;
