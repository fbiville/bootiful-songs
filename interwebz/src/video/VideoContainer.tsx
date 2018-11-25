import * as React from 'react';
import VideoService from '../service/VideoService';
import Video from './Video';
import {YoutubeVideo} from "../domain/VideoTypes";

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
            url: this.getEmbedUrl(video)
        });
    }

    getEmbedUrl(video: YoutubeVideo) {
        return 'https://www.youtube.com/embed/' + video.providerId
    }

    render() {
        return <Video url={this.state.url} />;
    }
}

export default VideoContainer;
