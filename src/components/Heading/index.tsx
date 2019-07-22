import React from 'react';

interface Props {
  children: any;
  textSize: string;
}
class Heading extends React.Component<Props, any> {
  render() {
    if (this.props.textSize === 'lg') return <h1>{this.props.children}</h1>;
    else return <h3>{this.props.children}</h3>;
  }
}

export default Heading;
