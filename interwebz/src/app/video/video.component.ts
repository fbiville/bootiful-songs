import {Component, Input, OnInit} from '@angular/core';
import {Video, VideoService} from "./video.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  @Input("src") rawVideo: Video;
  embeddedUrl: SafeResourceUrl;
  clicked = false;
  likeCount$;

  constructor(private service: VideoService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    let embedUrl = `https://www.youtube.com/embed/${this.rawVideo.providerId}?rel=0`;
    this.embeddedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  sendLike() {
    if (!this.clicked) {
      this.clicked = true;
      this.service.likeVideo(this.rawVideo).subscribe(() => {
        this.likeCount$ = this.service.getLikes(this.rawVideo);
      });
    }
  }

}
