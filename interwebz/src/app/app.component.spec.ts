import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {Component, Input} from "@angular/core";
import {Video} from "./video/video-uri-parser.service";
import {VideoComponent} from "./video/video.component";


@Component({
  selector: 'app-video',
  template: '<p id="mock-video">{{ rawVideo.uri }}</p>'
})
class MockVideoComponent {
  @Input("src") rawVideo: Video;
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let dom: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockVideoComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    dom = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it(`should have as title 'Bootiful songs'`, async(() => {
    expect(dom.querySelector('h1').textContent).toEqual('Welcome to Bootiful songs!');
  }));

  it('should show a bootiful video', () => {
    expect(dom.querySelector('#mock-video').textContent).toEqual('https://www.youtube.com/watch?v=zSVBcm_BZRs')
  });
});
