// Math and Linear Algebra Tools
// =============================

export type vec2 = Vector_2D
export type box = Box

export class Vector_2D {
  constructor(readonly x: number, readonly y: number) { }

  plus(v: vec2): vec2 {
    return new Vector_2D(this.x + v.x, this.y + v.y)
  }

  minus(v: vec2): vec2 {
    return new Vector_2D(this.x - v.x, this.y - v.y)
  }

  scale(r: number): vec2 {
    return new Vector_2D(r * this.x, r * this.y)
  }

  times(v: vec2): vec2 {
    return new Vector_2D(this.x * v.x, this.y * v.y)
  }

  inv(): vec2 {
    return new Vector_2D(1 / this.x, 1 / this.y)
  }

  floor(): vec2 {
    return new Vector_2D(Math.floor(this.x), Math.floor(this.y))
  }

  ceil(): vec2 {
    return new Vector_2D(Math.ceil(this.x), Math.ceil(this.y))
  }

  perp(): vec2 {
    return new Vector_2D(-this.y, this.x)
  }

  dot(v: vec2): number {
    return this.x * v.x + this.y * v.y
  }

  norm(): number {
    return Math.sqrt(this.dot(this))
  }

  unit(): vec2 {
    return this.scale(1 / this.norm())
  }

  angle(): number {
    return Math.atan2(this.y, this.x)
  }

  to(v: vec2): vec2 {
    return v.minus(this)
  }

  angle_to(v: vec2): number {
    return this.to(v).angle()
  }

  distance_to(v: vec2): number {
    return this.to(v).norm()
  }

  copy(): vec2 {
    return new Vector_2D(this.x, this.y)
  }

  equals(v: vec2): boolean {
    return this.x == v.x && this.y == v.y
  }

  toString(precision = 2): string {
    return `(${this.x.toFixed(precision)}, ${this.y.toFixed(precision)})`
  }
}

export class Box {
  constructor(public position: vec2, public size: vec2) { }

  center(): vec2 {
    return this.position.plus(this.size.scale(.5))
  }
}

export const v00 = new Vector_2D(0, 0)
export const v10 = new Vector_2D(1, 0)
export const v01 = new Vector_2D(0, 1)
export const v11 = new Vector_2D(1, 1)

export function vec2(x: number, y: number): vec2 {
  return new Vector_2D(x, y)
}

export function client_position(e: MouseEvent): vec2 {
  return vec2(e.clientX, e.clientY)
}

export function dom_bounding_box(e: HTMLElement): box {
  let r = e.getBoundingClientRect()
  return new Box(vec2(r.x, r.y), vec2(r.width, r.height))
}
