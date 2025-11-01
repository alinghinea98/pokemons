import { Component, input, signal } from "@angular/core";
import { Pokemon } from "../pokemon.service";
import { PokemonDetailsComponent } from "../pokemon-details/pokemon-details";

@Component({
    selector: 'app-pokemon-card',
    templateUrl: './pokemon-card.html',
    styleUrl: './pokemon-card.scss',
    imports: [PokemonDetailsComponent],
})
export class PokemonCardComponent {
    pokemon = input.required<Pokemon>();
    showDetails = signal(false);

    toggleDetails() {
        this.showDetails.update(v => !v);
    }
}