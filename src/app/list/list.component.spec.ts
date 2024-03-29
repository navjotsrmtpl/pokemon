import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { ApiService } from '../api.service';
import { of } from 'rxjs';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getPokemon']);

    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      providers: [{ provide: ApiService, useValue: mockApiService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load more Pokémon on scroll', fakeAsync(() => {
    // Mock initial data
    const initialPokemonData = {
      results: [{ name: 'bulbasaur' }, { name: 'charmander' }]
    };

    // Mock additional data to be loaded
    const additionalPokemonData = {
      results: [{ name: 'squirtle' }, { name: 'pikachu' }]
    };

    // Return initial data when getPokemon is called initially
    mockApiService.getPokemon.and.returnValue(of(initialPokemonData));

    // Simulate the initial load of Pokémon
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    // Expect initial data to be loaded
    expect(component.pokemons.length).toBe(2);

    // Spy on loadPokemon method
    spyOn(component, 'loadPokemon').and.callThrough();

    // Mock window.scrollY to simulate scrolling to the bottom
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(document.body.scrollHeight);

    // Return additional data when getPokemon is called after scrolling
    mockApiService.getPokemon.and.returnValue(of(additionalPokemonData));

    // Trigger the scroll event
    window.dispatchEvent(new Event('scroll'));
    tick();

    // Expect loadPokemon method to be called
    expect(component.loadPokemon).toHaveBeenCalled();

    // Expect additional data to be loaded
    expect(component.pokemons.length).toBe(4); // Total 4 Pokémon after loading more
  }));
});
