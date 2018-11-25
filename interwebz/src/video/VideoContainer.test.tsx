import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Sinon from 'sinon';
import VideoService from '../service/VideoService';
import VideoContainer from './VideoContainer';
import { SinonStub } from 'sinon';

let getUrlStub: SinonStub;
let urlPromise: Promise<string>;

beforeEach(() => {
    getUrlStub = Sinon.stub(VideoService, 'getRandomUrl');

    urlPromise = Promise.resolve('https://www.youtube.com/watch?v=supercoolvideo');
    getUrlStub.returns(urlPromise);
});

afterEach(() => {
    getUrlStub.restore();
});

it('renders a video from its id', async () => {
    const container = document.createElement('div');
    ReactDOM.render(<VideoContainer/>, container);

    await urlPromise;

    expect(container!.querySelector('iframe')).toBeTruthy();
    const video = container!.querySelector('iframe')!;
    expect(video.getAttribute('src')).toBe('https://www.youtube.com/watch?v=supercoolvideo');
});
