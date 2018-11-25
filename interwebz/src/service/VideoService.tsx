import { HttpService } from './HttpService';

export default class VideoService {
    static getRandomUrl(): Promise<string> {
        return HttpService.fetch('api/videos/random').then(resp => resp.json());
    }
}
