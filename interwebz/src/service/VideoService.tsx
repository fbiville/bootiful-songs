import { HttpService } from './HttpService';
import {YoutubeVideo} from "../domain/VideoTypes";

export default class VideoService {
    static getRandomUrl(): Promise<YoutubeVideo> {
        return HttpService.fetch('api/videos/random', {
            method: 'POST'
        })
            .then(resp => resp.json());
    }
}
