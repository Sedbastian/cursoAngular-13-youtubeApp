import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YouTubeResponse } from '../models/youtube-models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  // YouTube API Key: AIzaSyCoDtnlavEeBqW7D8kA4p4OusU9tybg5i8
  // DevTalles Id: UCuaPTYj15JSkETGnEseaFFg
  // DevTalles Uploads Id:UUuaPTYj15JSkETGnEseaFFg
  private youtubeUrl = 'https://youtube.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyCoDtnlavEeBqW7D8kA4p4OusU9tybg5i8';
  private playlist = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';

  constructor(private http: HttpClient) {}

  getVideos() {
    const url = `${this.youtubeUrl}/playlistItems`;
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '10')
      .set('playlistId', this.playlist)
      .set('key', this.apiKey)
      .set('pageToken', this.nextPageToken);

    return this.http
      .get<YouTubeResponse>(url, {
        params,
        headers: {
          accept: 'application/json',
          Authorization: this.apiKey,
        },
      })
      .pipe(
        map((resp) => {
          this.nextPageToken = resp.nextPageToken;
          return resp.items;
        }),
        map((items) => items.map((video) => video.snippet))
      );
  }
}
