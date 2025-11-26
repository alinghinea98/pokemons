import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import {
  form,
  required,
  Field
} from '@angular/forms/signals';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-add-pokemon-dialog',
  imports: [Field],
  templateUrl: './add-pokemon-dialog.html',
  styleUrl: './add-pokemon-dialog.scss'
})
export class AddPokemonDialogComponent {

    private readonly pokemonService = inject(PokemonService);
  
    @Output() close = new EventEmitter<void>();
    pokemonModel = signal<PokemonData>({
        name: '',
        image: '',
        xp: 0,
        types: ''
    });

    pokemonForm = form(this.pokemonModel, (schema) => {
      required(schema.name, { message: 'Name is required' });
      required(schema.image, { message: 'Image is required' });
    });

    addPokemon(e: Event) {
      e.preventDefault();
      if (this.pokemonForm().invalid()) return;
      const formValue = this.pokemonModel();
      this.pokemonService.addPokemon({
        ...formValue,
        id: Date.now(),
      });
      this.closeModal();
    }

    closeModal() {
      this.close.emit();
    }
}

export interface PokemonData {
    name: string;
    image: string;
    xp: number;
    types: string;
}

