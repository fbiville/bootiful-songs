import {Video, VideoService} from './video.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";

describe('VideoService ->', () => {

  describe('when interacting with video API ->', () => {
    const providerId = "dQw4w9WgXcQ";
    const rawUrl = "https://www.youtube.com/watch?v=" + providerId;
    const video = <Video> {url: new URL(rawUrl), providerId: providerId};

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

    it('should get one at random', (done: DoneFn) => {
      service.getRandomVideo().subscribe((video: Video) => {
        expect(video).toEqual(<Video> {
          url: new URL(`https://www.youtube.com/watch?v=${providerId}`),
          providerId: providerId
        });
        done();
      });

      const req = httpMock.expectOne(`/api/videos/random`);
      expect(req.request.method).toBe("POST");
      req.flush({"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "providerId": providerId});
    });

    it('should not retrieve anything when there are no videos', () => {
      service.getRandomVideo().subscribe(() => {
        fail("thou shalt not pass!");
      });

      const req = httpMock.expectOne(`/api/videos/random`);
      expect(req.request.method).toBe("POST");
      req.flush(null);
    });

    it('should post a like', (done: DoneFn) => {
      service.likeVideo(video).subscribe(() => {
        done();
      });

      const req = httpMock.expectOne(`/api/likes/${providerId}`);
      expect(req.request.method).toBe("PUT");
      req.flush({});
    });

    it("should retrieve likes", (done: DoneFn) => {
      service.getLikes(video).subscribe((count: number) => {
        expect(count).toEqual(42);
        done();
      });

      const req = httpMock.expectOne(`/api/likes/${providerId}`);
      expect(req.request.method).toBe("GET");
      req.flush({count: 42});
    });
  });
});
