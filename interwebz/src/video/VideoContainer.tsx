import * as React from 'react';
import VideoService from '../service/VideoService';
import Video from './Video';

class VideoContainer extends React.Component {
    render() {
        return <Video url={this.getUrl()} />;
    }

    getUrl() {
        return VideoService.getRandomUrl();
    }
}

export default VideoContainer;
