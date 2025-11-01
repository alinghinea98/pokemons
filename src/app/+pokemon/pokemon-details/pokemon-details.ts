import { Component, effect, inject, input, signal } from '@angular/core';
import { PokemonService, PokemonDetails } from '../pokemon.service';

@Component({
  selector: 'pokemon-details',
  templateUrl: './pokemon-details.html',
})
export class PokemonDetailsComponent {
  pokemonService = inject(PokemonService);

  id = input.required<number>();
  
  details = signal<PokemonDetails>({ types: [], experience: 0 });
  loading = signal(true);

  constructor() {
    effect(() => {
      const pokemonId = this.id();
      if (!pokemonId) return;
      this.loadData(pokemonId);
    });
  }

  private async loadData(id: number) {
    this.loading.set(true);
    try {
      const details = await this.pokemonService.getPokemonDetails(id);
      this.details.set(details);
    } catch (error) {
      console.error('Error loading Pokemon details:', error);
    } finally {
      this.loading.set(false);
    }
  }
}
