import { HttpService } from './HttpService';
import {Video} from "../domain/VideoTypes";

export default class VideoService {
    static getRandomUrl(): Promise<Video> {
        return HttpService.fetch('api/videos/random', {
            method: 'POST'
        })
            .then(resp => resp.json());
    }
}
