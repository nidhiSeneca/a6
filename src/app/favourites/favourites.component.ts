import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  favourites: Array<any> = [];

  private favouriteSub: Subscription | undefined;
  private removeFavouriteSub: Subscription | undefined;

  constructor(private musicDataService: MusicDataService) { }

  ngOnInit(): void {
    this.favouriteSub = this.musicDataService.getFavourites().subscribe(data=>{
      this.favourites = data.tracks;
    });
  }

  removeFromFavourites(id: string){
    this.removeFavouriteSub = this.musicDataService.removeFromFavourites(id).subscribe(data=>{
      this.favourites = data.tracks;
    });
  }

  ngOnDestroy(): void{
    this.favouriteSub?.unsubscribe();
    this.removeFavouriteSub?.unsubscribe();
  }

}
