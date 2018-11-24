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
        const url = await VideoService.getRandomUrl();
        this.setState({
            url: url
        });
    }

    render() {
        return <Video url={this.state.url} />;
    }
}

export default VideoContainer;
