import {Animal} from "./animal";
import {Ave} from "./ave";
import {Mamifero} from "./mamifero"

function newAnimals(animal: Animal) {
    animal.alimentar();
}

let Pato = new Ave();
let Lobo = new Mamifero();

newAnimals(Lobo);
