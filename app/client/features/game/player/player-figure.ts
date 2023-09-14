import { createImage } from '../utils';
import { GAME_GRAVITY } from '../contants';

import spriteStandRight from './spriteStandRight.png';
import spriteStandLeft from './spriteStandLeft.png';
import spriteRunRight from './spriteRunRight.png';
import spriteRunLeft from './spriteRunLeft.png';

const FRAMECUT_FOR_STAND = 59;
const FRAMECUT_FOR_RUN = 29;
const BOTTOM_OFFSET = 60;

type PlayerPosition = {
  x: number;
  y: number;
};

type Sprites = {
  stand: Sprite;
  run: Sprite;
};

type Sprite = {
  right: HTMLImageElement;
  left: HTMLImageElement;
  crop: number;
  width: number;
};

export type PlayerFigureProps = {
  scrollOffset: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
};

export class PlayerFigure {
  position: PlayerPosition;
  velocity: PlayerPosition;
  width: number;
  height: number;
  speed: number;
  frames: number;
  crop: number;
  image: HTMLImageElement;
  currentSprite: HTMLImageElement;
  sprites: Sprites;
  readonly canvas?: HTMLCanvasElement;
  scrollOffset: number;
  readonly context: CanvasRenderingContext2D | null;

  constructor({ scrollOffset, canvas, context }: PlayerFigureProps) {
    this.context = context;
    this.scrollOffset = scrollOffset;
    this.canvas = canvas;
    this.position = {
      x: 100,
      y: 100,
    };
    this.speed = 14;
    this.width = 66;
    this.height = 150;
    this.frames = 0;
    this.crop = 177;
    this.image = createImage(spriteStandRight);
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.sprites = {
      stand: {
        right: createImage(spriteStandRight),
        left: createImage(spriteStandLeft),
        crop: 177,
        width: 66,
      },

      run: {
        right: createImage(spriteRunRight),
        left: createImage(spriteRunLeft),
        crop: 341,
        width: 128,
      },
    };

    this.currentSprite = this.sprites.stand.right;
  }

  draw() {
    this.context &&
      this.context.drawImage(
        this.currentSprite,
        this.crop * this.frames,
        0,
        this.crop,
        400,
        this.position.x,
        this.position.y,
        this.width,
        this.height,
      );
  }

  update() {
    this.frames++;
    if (
      this.frames > FRAMECUT_FOR_STAND &&
      (this.currentSprite === this.sprites.stand.left ||
        this.currentSprite === this.sprites.stand.right)
    ) {
      this.frames = 0;
    } else if (
      this.frames > FRAMECUT_FOR_RUN &&
      (this.currentSprite === this.sprites.run.left ||
        this.currentSprite === this.sprites.run.right)
    ) {
      this.frames = 0;
    }
    const check =
      this.scrollOffset > 0 ? this.canvas?.height || 0 : (this.canvas?.height || 0) - BOTTOM_OFFSET;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    const val = this.height + this.position.y + this.velocity.y;
    if (val <= check) {
      this.velocity.y += GAME_GRAVITY;
    } else {
      this.velocity.y = 0;
    }

    this.draw();
  }
}
