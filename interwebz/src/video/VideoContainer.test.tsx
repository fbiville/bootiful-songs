import * as React from 'react';
import VideoContainer from './VideoContainer';
import * as ReactDOM from "react-dom";

jest.mock('../service/VideoService', () => ({
    getRandomUrl: jest.fn().mockReturnValue('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
}));

it('renders a video from its id', () => {
    const container = document.createElement('div');
    ReactDOM.render(<VideoContainer />, container);

    expect(container!.querySelector('iframe')).toBeTruthy();
    const video =container!.querySelector('iframe')!;
    expect(video.getAttribute('src')).toBe('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
});
