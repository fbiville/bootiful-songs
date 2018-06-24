import {Component, OnInit} from '@angular/core';
import {Video, VideoService} from "./video/video.service";
import {Observable} from "rxjs/internal/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Bootiful songs';
  video$: Observable<Video>;

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.video$ = this.videoService.getRandomVideo();
  }

}
