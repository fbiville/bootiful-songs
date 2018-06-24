import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {Component, Input, OnInit} from "@angular/core";
import {Video, VideoService} from "./video/video.service";
import {VideoComponent} from "./video/video.component";
import {Subject} from "rxjs/internal/Subject";


@Component({
  selector: 'app-video',
  template: '<p id="mock-video">{{ rawVideo.url }}</p>'
})
class MockVideoComponent {
  @Input("src") rawVideo: Video;
}

describe('AppComponent ->', () => {
  const videoSubject = new Subject<Video>();
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let dom: any;

  beforeEach(async(() => {
    const videoServiceSpy = jasmine.createSpyObj<VideoService>(['getRandomVideo']);
    videoServiceSpy.getRandomVideo.and.returnValue(videoSubject.asObservable());

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockVideoComponent
      ],
      providers: [
        { provide: VideoService, useValue: videoServiceSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    dom = fixture.debugElement.nativeElement;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it(`should have as title 'Bootiful songs'`, async(() => {
    expect(dom.querySelector('h1').textContent).toEqual('Welcome to Bootiful songs!');
  }));

  it('should show a bootiful video', () => {
    const videoUrl = 'https://www.youtube.com/watch?v=e4Ao-iNPPUc';
    videoSubject.next(<Video> {url : new URL(videoUrl)});
    fixture.detectChanges();

    expect(dom.querySelector('#mock-video').textContent).toEqual(videoUrl);
  });
});
