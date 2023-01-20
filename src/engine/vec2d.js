const clip = (minValue, value, maxValue) => {
    if (value < minValue) {
        return minValue;
    }

    if (value > maxValue) {
        return maxValue;
    }

    return value;
}

export class Vec2d {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    static of(x, y) {
        return new Vec2d(x, y);
    }

    static fromArray(array = [0, 0]) {
        const [x, y] = array;
        return Vec2d.of(x, y);
    }

    toArray() {
        return [this._x, this._y];
    }

    add(other) {
        return Vec2d.of(this.x + other.x, this.y + other.y);
    }

    clip(min, max) {
        return Vec2d.of(
            clip(min.x, this.x, max.x),
            clip(min.y, this.y, max.y)
        );
    }
}