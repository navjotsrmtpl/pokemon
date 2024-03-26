import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }


  getPokemon(offset: number, limit: number): Observable<any> {
    const url = `${this.baseUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get(url);
  }


  getPokemonspecies(id: number): Observable<any> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon-species/' + id);
  }


  evolutionchain(url: string): Promise<any> {
    return this.http.get<any>(url).toPromise();
  }

  getAllSpeciesData(data: any): { name: string, url: string }[] {
    const speciesData: { name: string, url: string }[] = [];

    function extractData(chain: any) {
      if (chain.species) {
        speciesData.push({
          name: chain.species.name,
          url: chain.species.url
        });
      }
      if (chain.evolves_to && chain.evolves_to.length > 0) {
        chain.evolves_to.forEach((evo: any) => extractData(evo));
      }
    }

    extractData(data.chain);
    return speciesData;
  }
}
