import * as React from 'react';
import Video from './Video';
const VideoService = require("../service/VideoService");

class VideoContainer extends React.Component {
    render() {
        return <Video url={this.getUrl()} />
    }

    getUrl() {
        return VideoService.getRandomUrl();
    }
}

export default VideoContainer;
