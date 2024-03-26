import { Component, HostListener, ViewChild } from '@angular/core';

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  pokemons: any[] = [];
  loading = false;
  offset = 0;
  limit = 20; // 3 columns * 4 rows

  constructor(private pokeApiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadPokemon();

  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.loadPokemon();
    }
  }

  loadPokemon(): void {
    if (!this.loading) {
      this.loading = true;
      this.pokeApiService.getPokemon(this.offset, this.limit).subscribe(response => {

        this.pokemons = this.pokemons.concat(response.results.map((pokemon: any) => ({
          name: pokemon.name,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`,
        })));
        this.offset += this.limit;
        this.loading = false;
      });
    }
  }

  gotoPage(pokemon: any) {
    console.log(pokemon);
    if (pokemon) {

      let id = pokemon.imageUrl.substring(pokemon.imageUrl.lastIndexOf("/") + 1, pokemon.imageUrl.lastIndexOf("."))
      this.router.navigate(['/detail'], {
        state: { data: pokemon, id: Number(id) }
      })
    }
  }


}
