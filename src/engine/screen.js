const cursorUp = n => `\u001b[${ n }A`;
const cursorDown = n => `\u001b[${ n }B`;
const cursorRight = n => `\u001b[${ n }C`;
const cursorLeft = n => `\u001b[${ n }D`;

const createBuffer = (w, h) => {
    const buffer = new Array(h);
    for (let row = 0; row < buffer.length; row += 1) {
        buffer[row] = new Array(w);
    }

    return buffer;
}

export class Screen {
    constructor(w, h) {
        this._w = w;
        this._h = h;
        this._buffer = createBuffer(w, h);
        this.clearBuffer();
    }

    indexOf(row, col) {
        return (row * this._w) + col;
    }

    printAt(row, col, value) {
        if (row < 0 || row >= this._h || col < 0 || col >= this._w) {
            return;
        }
        this._buffer[row][col] = value;
    }

    printSprite(row, col, sprite) {
        for (let spriteRow = 0; spriteRow < sprite.length; spriteRow++) {
            for (let spriteCol = 0; spriteCol < sprite[spriteRow].length; spriteCol++) {
                this.printAt(row + spriteRow, col + spriteCol, sprite[spriteRow][spriteCol]);
            }
        }
    }

    clearBuffer() {
        this._buffer.forEach(row => row.fill(' '));
    }

    render() {
        process.stdout.write(`${ cursorLeft(this._w) }${ cursorUp(this._h) }`);
        this._buffer.forEach(
            row => process.stdout.write(`${ row.join('') }\n`)
        );
    }
}