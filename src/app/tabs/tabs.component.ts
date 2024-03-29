import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  receivedData: any;
  id: any;
  pokemonSpeciesdata: any;
  speciesNames: any;

  constructor(private route: ActivatedRoute, public api: ApiService) {

  }

  ngOnInit() {
    this.receivedData = history.state.data;
    this.id = history.state.id;

  }

  tabChanged(event: any) {

    if (event.index == 1) {
      try {
        this.api.getPokemonspecies(this.id).subscribe((res: any) => {
          this.pokemonSpeciesdata = res;
          this.api.evolutionchain(res.evolution_chain.url).then((x: any) => {
            console.log(x)
            this.speciesNames = this.api.getAllSpeciesData(x);
            console.log(this.speciesNames);

          })
        }, error => {
          console.log(error)
        })
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  getSpeciesId(url: string): number {
    return Number(url.split('/')[6]);
  }

}
