import {Injectable} from '@angular/core';

export interface Video {
  uri: URL
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
export class VideoUriParserService {

  constructor() { }

  parse(video: Video): EmbeddableContent | null {
    return new YoutubeVideo(video.uri.searchParams.get("v"))
  }
}
