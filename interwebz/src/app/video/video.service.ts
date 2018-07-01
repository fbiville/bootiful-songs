import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {filter, map} from "rxjs/operators";


interface JsonVideo {
  url: string,
  providerId: string
}
interface JsonCount {
  count: number
}

export interface Video {
  url: URL
  providerId: string
}

@Injectable({providedIn: "root"})
export class VideoService {

  constructor(private http: HttpClient) { }

  getRandomVideo(): Observable<Video> {
    return this.http.post<JsonVideo>('/api/videos/random', null)
      .pipe(
        filter((_) => _ != null),
        map((data: JsonVideo) => {
          return <Video>{url: new URL(data.url), providerId: data.providerId};
        }));
  }

  likeVideo(video: Video): Observable<Object> {
    return this.http.put(`/api/likes/${video.providerId}`, null);
  }

  getLikes(video: Video): Observable<number> {
    return this.http.get(`/api/likes/${video.providerId}`)
      .pipe(map((data: JsonCount) => {
        return data.count;
      }));
  }
}
