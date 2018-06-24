import { Component } from '@angular/core';
import {Video} from "./video/video-uri-parser.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bootiful songs';
  video: Video = {uri : new URL("https://www.youtube.com/watch?v=zSVBcm_BZRs")}
}
