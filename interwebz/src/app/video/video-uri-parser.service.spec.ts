import {VideoUriParserService, YoutubeVideo} from './video-uri-parser.service';

describe('VideoUriParserService', () => {
  const service = new VideoUriParserService();

  it('should detect Youtube videos', () => {
    const result = service.parse({uri: new URL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")});

    expect(result).toEqual(new YoutubeVideo("dQw4w9WgXcQ"))
  });
});
