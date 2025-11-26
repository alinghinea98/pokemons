import { Component, inject, viewChild, signal } from '@angular/core';
import { PokemonService } from './+pokemon/pokemon.service';
import { PokemonCardComponent } from './+pokemon/pokemon-card/pokemon-card';
import { AddPokemonDialogComponent, PokemonData } from './+pokemon/add-pokemon-dialog/add-pokemon-dialog';

@Component({
  selector: 'app-root',
  imports: [PokemonCardComponent, AddPokemonDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  service = inject(PokemonService);
  showDialog = signal(false);
}
