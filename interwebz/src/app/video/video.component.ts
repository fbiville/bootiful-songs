import {Component, Input, OnInit} from '@angular/core';
import {Video, VideoUriParserService} from "./video-uri-parser.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  @Input("src") rawVideo: Video;
  embeddedUrl: SafeResourceUrl;

  constructor(private parser: VideoUriParserService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const video = this.parser.parse(this.rawVideo);
    this.embeddedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video.id}?rel=0`);
  }

}
