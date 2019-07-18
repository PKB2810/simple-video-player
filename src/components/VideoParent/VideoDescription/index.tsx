import React from 'react';



  class VideoDescription extends React.Component<any, any>{
    render(){
            return(
                <h3 style={{textAlign:'left'}}>{this.props.children}</h3>

            )

    }

  }
  
  export default VideoDescription