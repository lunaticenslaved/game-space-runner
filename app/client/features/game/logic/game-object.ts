type Position = {
  x: number;
  y: number;
};

type Size = {
  width?: number;
  height?: number;
};

export type GameObjectType = 'platform' | 'decoration' | 'finish';

export type GameObjectProps = {
  context: CanvasRenderingContext2D | null;
  position: Position;
  image: HTMLImageElement;
  size?: Size;
  speedCoef?: number;
  type?: GameObjectType;
};

export class GameObject {
  readonly context: CanvasRenderingContext2D | null;
  image: HTMLImageElement;
  size: Required<Size>;
  position: Position;
  speedCoef = 1;
  type: GameObjectType;

  constructor({ context, size, position, image, speedCoef, type = 'platform' }: GameObjectProps) {
    this.context = context;
    this.image = image;
    this.speedCoef = speedCoef || 1;
    this.type = type;
    this.position = { ...position };
    this.size = {
      height: size?.height || image.height,
      width: size?.width || image.width,
    };
  }

  draw() {
    this.context?.drawImage(this.image, this.position.x, this.position.y);
  }
}
