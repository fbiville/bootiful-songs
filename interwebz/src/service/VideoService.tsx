import { HttpService } from './HttpService';
import { YoutubeVideo } from '../domain/VideoTypes';

export default class VideoService {
    static getRandomUrl(): Promise<YoutubeVideo> {
        return HttpService.fetch('api/videos/random', {
            method: 'POST'
        })
            .then(resp => {
                if (resp.status !== 200) {
                    // tslint:disable-next-line
                    console.log('something happened');
                    // tslint:disable-next-line
                    console.log(resp);
                    return { url: '', providerId: '' };
                }
                return resp.json();
            });
    }
}
