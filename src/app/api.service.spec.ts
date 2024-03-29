import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';


describe('PokemonService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return Pokémon data', () => {
    const mockPokemonData = { results: [{ name: 'bulbasaur' }, { name: 'charmander' }] };

    service.getPokemon(0, 2).subscribe((data: any) => {
      expect(data.results.length).toBe(2);
      expect(data.results[0].name).toEqual('bulbasaur');
      expect(data.results[1].name).toEqual('charmander');
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemonData);
  });

  it('should return Pokémon species data', () => {
    const mockSpeciesData = { name: 'bulbasaur', flavor_text_entries: [{ flavor_text: 'Sample text' }] };

    service.getPokemonspecies(1).subscribe((data: any) => {
      expect(data.name).toEqual('bulbasaur');
      expect(data.flavor_text_entries[0].flavor_text).toEqual('Sample text');
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon-species/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockSpeciesData);
  });
});