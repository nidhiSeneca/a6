import { Component, OnInit } from '@angular/core';
import data from '../data/NewReleasesAlbums.json';
import { MusicDataService } from '../music-data.service';

interface NewRel {  
  releases: any;
}  

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {
  releases: any;
  
  constructor(private musicDataService : MusicDataService) { 
    
  }

  ngOnInit(): void {
    let data=JSON.stringify(this.releases);
   // console.log("hiii" + data);
    this.musicDataService.getNewReleases().subscribe(data => {
      this.releases = data.albums.items;
      console.log(data);
    });
  }

}
