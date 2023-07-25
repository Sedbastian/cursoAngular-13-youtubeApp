import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/youtube-models';
import { YoutubeService } from 'src/app/services/youtube.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  videos: Video[] = [];

  constructor(private youtubeService: YoutubeService) {}

  ngOnInit(): void {
    this.cargarVideos();
  }

  cargarVideos() {
    this.youtubeService.getVideos().subscribe((resp) => {
      this.videos.push(...resp);
      console.log(this.videos);
    });
  }

  siguientePagina() {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool',
    });
  }

  mostrarVideo(video: Video) {
    console.log(video);
    Swal.fire({
      html: `
      <h4>${video.title}</h4>
      <iframe
      width="${1268 / 2.8}"
      height="${480 / 2.8}"
      src="https://www.youtube.com/embed/${video.resourceId.videoId}"
      title="qwik - Route Loader y Remote Procedures + Prisma"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>`,
    });
  }
}
