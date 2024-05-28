import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Hls from 'hls.js';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    const video = this.videoElement.nativeElement;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource('https://devstreaming-cdn.apple.com/videos/streaming/examples/adv_dv_atmos/main.m3u8');
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = 'https://devstreaming-cdn.apple.com/videos/streaming/examples/adv_dv_atmos/main.m3u8';
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }
  }
}