import * as Sinon from "sinon";
import {HttpService} from "./HttpService";
import {SinonStub} from "sinon";
import VideoService from "./VideoService";

let fetchStub: SinonStub;
let httpPromise: Promise<Response>;

beforeEach(() => {
    fetchStub = Sinon.stub(HttpService, 'fetch');

    const headers = new Headers();
    headers.set('Content-type', 'application/json');
    httpPromise = Promise.resolve(
        new Response(JSON.stringify('http://wwww.youtube.com/embed/mockedVideo'),
            {
                status: 200,
                headers: headers
            })
    );
    fetchStub.returns(httpPromise);
});

afterEach(() => {
    fetchStub.restore();
});

it('calls the http service', async () => {
    VideoService.getRandomUrl();

    expect(fetchStub.calledOnce).toBeTruthy();
    expect(fetchStub.args[0]).toEqual(['api/videos/random'])
});

it('retrieves a random video url', async () => {
    const result = await VideoService.getRandomUrl();

    expect(result).toBe('http://wwww.youtube.com/embed/mockedVideo');
});
