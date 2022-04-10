import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import albumData from '../data/SearchResultsAlbums.json';
import artistData from '../data/SearchResultsArtist.json';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {
  public albums: any;
  public artist: any;
  private querySub: any;

  constructor(private musicDataService : MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {

   /* this.artist = artistData;
    this.albums = albumData.items.filter((curValue, index, self) => self.findIndex(t => t.name.toUpperCase() === curValue.name.toUpperCase()) === index);*/

    this.querySub = this.route.params.subscribe(params => {
      this.musicDataService.getArtistById(params['id']).subscribe(data => this.artist = data);
    });
    this.querySub = this.route.params.subscribe(params => {
      this.musicDataService.getAlbumsByArtistId(params['id']).subscribe(data => this.albums=data.items.filter((curValue, index, self) => self.findIndex(t => t.name.toUpperCase() === curValue.name.toUpperCase()) === index))
    });

    

    
  }

}
