import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VideoComponent} from './video.component';
import {VideoUriParserService, YoutubeVideo} from "./video-uri-parser.service";
import {BrowserModule} from "@angular/platform-browser";

describe('VideoComponent', () => {
  let fixture: ComponentFixture<VideoComponent>;
  let component: VideoComponent;
  let dom: any;
  let parserSpy: jasmine.SpyObj<VideoUriParserService>;

  beforeEach(async(() => {
    parserSpy = jasmine.createSpyObj<VideoUriParserService>(['parse']);
    parserSpy.parse.and.returnValue(new YoutubeVideo("B_VJe5iHrJw"));

    TestBed.configureTestingModule({
      declarations: [ VideoComponent ],
      providers: [
        { provide: VideoUriParserService, useValue: parserSpy }
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
    fixture.detectChanges();
  });

  it('should embed Youtube videos', () => {
    const embeddedVideo = dom.querySelector('iframe');

    expect(embeddedVideo).toBeTruthy()
    expect(embeddedVideo.src).toEqual("https://www.youtube.com/embed/B_VJe5iHrJw?rel=0")
  })
});
