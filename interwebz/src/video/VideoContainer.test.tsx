import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Sinon from 'sinon';
import VideoService from '../service/VideoService';
import VideoContainer from './VideoContainer';

beforeEach(() => {
    const getUrlStub = Sinon.stub(VideoService, 'getRandomUrl');

    getUrlStub.returns('https://www.youtube.com/watch?v=supercoolvideo');
});

it('renders a video from its id', () => {
    const container = document.createElement('div');
    ReactDOM.render(<VideoContainer />, container);

    expect(container!.querySelector('iframe')).toBeTruthy();
    const video = container!.querySelector('iframe')!;
    expect(video.getAttribute('src')).toBe('https://www.youtube.com/watch?v=supercoolvideo');
});
