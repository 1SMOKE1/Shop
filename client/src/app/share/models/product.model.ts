export class Product{
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public category: string,
    public _id: number = 0,
    public imageSrc: string = '',
    )
    {}
}