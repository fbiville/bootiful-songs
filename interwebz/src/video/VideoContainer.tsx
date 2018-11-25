import * as React from 'react';
import VideoService from '../service/VideoService';
import Video from './Video';

class VideoContainer extends React.Component<{}, {url: string}> {
    constructor(props: {}) {
        super(props);

        this.state = {
            url: ''
        };
    }

    async componentDidMount() {
        const video = await VideoService.getRandomUrl();
        this.setState({
            url: video.url
        });
    }

    render() {
        return <Video url={this.state.url} />;
    }
}

export default VideoContainer;
