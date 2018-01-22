import { Item } from "./item.interface";
export class Recipe {
  constructor(
    public title: string,
    public description: string,
    public dificulty: string,
    public items: Item[]
  ){}
}
