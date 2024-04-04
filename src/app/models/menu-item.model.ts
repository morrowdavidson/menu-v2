export class MenuItem {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public imagePath?: string,
    public isEditing?: boolean
  ) {}
}
