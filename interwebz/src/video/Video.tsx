import * as React from 'react';
import './Video.css';

class Video extends React.Component<VideoProps> {
    public render() {

        const url = this.props.url;
        return (
            <div className="video">
                <iframe
                    width="560"
                    height="315"
                    src={url}
                    allow="autoplay; encrypted-media"
                />
            </div>
        );
    }
}

export interface VideoProps {
    url: string;
}

export default Video;