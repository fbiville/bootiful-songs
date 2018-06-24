import {Video, VideoService, YoutubeVideo} from './video.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";

describe('VideoService ->', () => {

  describe('when parsing videos ->', () => {
    const httpMock = jasmine.createSpyObj<HttpClient>(["post"]);
    httpMock.post.and.returnValue(Observable.create());
    const service = new VideoService(httpMock);

    it('should support Youtube', () => {
      const result = service.parseUri({url: new URL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")});

      expect(result).toEqual(new YoutubeVideo("dQw4w9WgXcQ"))
    });
  });

  describe('when fetching videos ->', () => {
    let httpMock: HttpTestingController;
    let service: VideoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [VideoService]
      });

      httpMock = TestBed.get(HttpTestingController);
      service = TestBed.get(VideoService);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should get one at random', () => {
      service.getRandomVideo().subscribe((video: Video) => {
        expect(video).toEqual(<Video> {url: new URL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")});
      });

      const req = httpMock.expectOne(`/videos/random`);
      expect(req.request.method).toBe("POST");
      req.flush({"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"});
    });
  });
});
