import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";


interface JsonVideo {
  url: string
}

export interface Video {
  url: URL
}

export interface EmbeddableContent {
  id: string
}

export class YoutubeVideo implements EmbeddableContent {
  id: string;
  constructor(id: string) {
    this.id = id
  }
}

@Injectable({providedIn: "root"})
export class VideoService {

  constructor(private http: HttpClient) { }

  parseUri(video: Video): EmbeddableContent | null {
    return new YoutubeVideo(video.url.searchParams.get("v"))
  }

  getRandomVideo(): Observable<Video> {
    return this.http.post<JsonVideo>('/videos/random', null)
      .pipe(map((data: JsonVideo) => {
        return <Video>{url: new URL(data.url)};
      }))
  }
}
