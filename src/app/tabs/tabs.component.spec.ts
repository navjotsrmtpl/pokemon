import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TabsComponent } from './tabs.component';
import { ApiService } from '../api.service';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;
  let mockActivatedRoute: any;
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        data: {
          data: { name: 'bulbasaur' },
          id: 1
        }
      }
    };

    mockApiService = jasmine.createSpyObj('ApiService', ['getPokemonspecies', 'evolutionchain', 'getAllSpeciesData']);

    await TestBed.configureTestingModule({
      declarations: [TabsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ApiService, useValue: mockApiService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load Pokémon species data on tab change', () => {
    const mockSpeciesData = { name: 'bulbasaur', evolution_chain: { url: 'https://pokeapi.co/api/v2/evolution-chain/1' } };
    const mockEvolutionChainData = { species: { name: 'bulbasaur' } };
    let mockSpeciesNames: any = ['bulbasaur'];

    mockApiService.getPokemonspecies.and.returnValue(of(mockSpeciesData));
    mockApiService.evolutionchain.and.returnValue(Promise.resolve(mockEvolutionChainData));
    mockApiService.getAllSpeciesData.and.returnValue(mockSpeciesNames);

    component.tabChanged({ index: 1 });

    expect(component.pokemonSpeciesdata).toEqual(mockSpeciesData);
    expect(mockApiService.getPokemonspecies).toHaveBeenCalledWith(1);
    expect(mockApiService.evolutionchain).toHaveBeenCalledWith('https://pokeapi.co/api/v2/evolution-chain/1');
    expect(component.speciesNames).toEqual(mockSpeciesNames);
  });

});
