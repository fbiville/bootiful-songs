import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VideoComponent} from './video.component';
import {VideoService} from "./video.service";
import {BrowserModule} from "@angular/platform-browser";
import { of } from "rxjs";



describe('VideoComponent ->', () => {
  let fixture: ComponentFixture<VideoComponent>;
  let component: VideoComponent;
  let dom: any;
  let videoServiceSpy: jasmine.SpyObj<VideoService>;

  beforeEach(async(() => {
    videoServiceSpy = jasmine.createSpyObj<VideoService>(['likeVideo', 'getLikes']);
    videoServiceSpy.likeVideo.and.returnValue(of({}));
    videoServiceSpy.getLikes.and.returnValue(of(42));

    TestBed.configureTestingModule({
      declarations: [ VideoComponent ],
      providers: [
        { provide: VideoService, useValue: videoServiceSpy }
      ],
      imports: [
        BrowserModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoComponent);
    component = fixture.componentInstance;
    dom = fixture.debugElement.nativeElement;

    component.rawVideo = {
      url: new URL("https://www.youtube.com/watch?v=B_VJe5iHrJw"),
      providerId: "B_VJe5iHrJw"
    };

    fixture.detectChanges();
  });

  it('should embed Youtube videos', () => {
    const embeddedVideo = dom.querySelector('iframe');

    expect(embeddedVideo).toBeTruthy();
    expect(embeddedVideo.src).toEqual("https://www.youtube.com/embed/B_VJe5iHrJw?rel=0")
  });


  describe("Like button ->", () => {
    let likeButton: any;

    beforeEach(() => {
      likeButton = dom.querySelector('#like');
    });

    it('should be included', () => {
      expect(likeButton).toBeTruthy();
    });

    it('should be clickable', () => {
      likeButton.click();

      expect(videoServiceSpy.likeVideo).toHaveBeenCalled();
    });

    it('should be clickable only once', () => {
      likeButton.click();
      fixture.detectChanges();

      expect(videoServiceSpy.likeVideo).toHaveBeenCalledTimes(1);
      expect(likeButton.disabled).toBeTruthy();

      videoServiceSpy.likeVideo.calls.reset();
      likeButton.click();
      fixture.detectChanges();

      expect(videoServiceSpy.likeVideo).not.toHaveBeenCalled();
      expect(likeButton.disabled).toBeTruthy();
    });

    it('should display likes after click', () => {
      likeButton.click();
      fixture.detectChanges();

      expect(dom.querySelector('#likeCount').textContent).toEqual("42 ♡");
    });
  });


});
