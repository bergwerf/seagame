// http://themadcreator.github.io/gifler/
// ======================================

declare global {
  export interface Gif {
    get(): Promise<Animator>
  }

  export interface Animator {
    start(): void
    stop(): void
    animateInCanvas(canvas: HTMLCanvasElement): void
  }

  export function gifler(src: string): Gif
}

// This is some kind of hack.
export { }
