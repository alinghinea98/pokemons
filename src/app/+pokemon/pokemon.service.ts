import { computed, Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    pokemons = signal<Pokemon[]>([]);
    loading = signal<boolean>(false);

    // Using computed() signal for derived state - Angular 16+ feature
    pokemonCount = computed(() => this.pokemons().length);
    hasPokemons = computed(() => this.pokemonCount() > 0);

    constructor() {
        this.loadPokemons();
    }

    async loadPokemons() {
        this.loading.set(true);
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');
        const data = await response.json();
        const pokemonsWithImages = await Promise.all(data.results.map(async (pokemon: any) => {
            const imageResponse = await fetch(pokemon.url);
            const imageData = await imageResponse.json();
            return {
                id: imageData.id,
                name: pokemon.name,
                image: imageData.sprites.front_default
            };
        }));
        this.pokemons.set(pokemonsWithImages);
        this.loading.set(false);
    }

    async getPokemonDetails(id: number): Promise<PokemonDetails> {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch Pokemon details: ${res.status}`);
        }
        const data = await res.json();
        return {
            types: data.types.map((t: any) => t.type.name),
            experience: data.base_experience
        };
    }

    addPokemon(pokemon: Pokemon) {
        this.pokemons.update(pokemons => [pokemon, ...pokemons]);
    }
}

export interface Pokemon {
    id: number;
    name: string;
    image: string;
}

export interface PokemonDetails {
    types: string[];
    experience: number;
}