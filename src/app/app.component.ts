import { Component, inject } from '@angular/core';
import { PokemonService } from './+pokemon/pokemon.service';
import { PokemonCardComponent } from './+pokemon/pokemon-card/pokemon-card';

@Component({
  selector: 'app-root',
  imports: [PokemonCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  service = inject(PokemonService);
}
