import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Video from './Video';

it('displays a youtube video', () => {
    const props = {
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    };

    const video = document.createElement('div');
    ReactDOM.render(<Video {...props} />, video);

    const iframe = video.querySelector('iframe');
    expect(iframe).toBeTruthy();
    expect(iframe!.getAttribute('src')).toBe(props.url);
});
