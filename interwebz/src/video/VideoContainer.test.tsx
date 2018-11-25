import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Sinon from 'sinon';
import VideoService from '../service/VideoService';
import VideoContainer from './VideoContainer';
import { SinonStub } from 'sinon';
import { YoutubeVideo } from '../domain/VideoTypes';

let getUrlStub: SinonStub;
let videoPromise: Promise<YoutubeVideo>;

const VIDEO: YoutubeVideo = {
    url: 'https://www.youtube.com/watch?v=supercoolvideo',
    providerId: 'supercoolvideo'
};

beforeEach(() => {
    getUrlStub = Sinon.stub(VideoService, 'getRandomUrl');

    videoPromise = Promise.resolve(VIDEO);
    getUrlStub.returns(videoPromise);
});

afterEach(() => {
    getUrlStub.restore();
});

it('renders a video from its id', async () => {
    const container = document.createElement('div');
    ReactDOM.render(<VideoContainer/>, container);

    await videoPromise;

    expect(container!.querySelector('iframe')).toBeTruthy();
    const video = container!.querySelector('iframe')!;
    expect(video.getAttribute('src')).toBe('https://www.youtube.com/embed/supercoolvideo');
});
