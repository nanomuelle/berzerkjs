const BLUE = '\u001b[34m';
const WHITE = '\u001b[37m';
const BLACK = '\u001b[30m';
const RED = `\u001b[31m`;
const GREEN = `\u001b[32m`;
const YELLOW = `\u001b[33m`;
const MAGENTA = `\u001b[35m`;
const CYAN = `\u001b[36m`;

const BLUE_BRICK = `${ BLUE }█`;
const RED_CLOSED_BRICK_H = `${ CYAN }─`;
const RED_CLOSED_BRICK_V = `${ CYAN }|`;

export const SPRITES = {    
    ANDROID: [
        //  ╒═╕    ╒═╕    ╒═╕
        // ▐▐█▌▌  ▐▐█▌▌  ▐▐█▌▌
        //  ▐ ▌    ▀ ▌    ▐ ▀
        //  ▀ ▀      ▀    ▀

        // N
        [
            [`${ WHITE } `, '╒', '═', '╕', ' '],  //  ╒═╕
            [`${ WHITE }▐`, '▐', '█', '▌', '▌'],  // ▐▐█▌▌
            [`${ WHITE } `, '▐', ' ', '▌', ' '],  //  ▐ ▌
            [`${ WHITE } `, '▀', ' ', '▀', ' ']   //  ▀ ▀
        ]
    ],
    PLAYER: [
        // N
        [
            [`${ GREEN } `, `■`, ' ' ],
            [`${ GREEN }/`, `║`, '\\'],
            [`${ GREEN } `, `╨`, ' ' ],
        ],
        // E
        [
            [`${ GREEN } `, `■`, ' ' ],
            [`${ GREEN }\\`,`║`, '\\'],
            [`${ GREEN } `, `╙`, ' ' ],
        ],
        // S
        [
            [`${ GREEN } `, `■`, ' ' ],
            [`${ GREEN }│`, `║`, '│' ],
            [`${ GREEN } `, `╨`, ' ' ],
        ],
        // O
        [
            [`${ GREEN } `, `■`, ' ' ],
            [`${ GREEN }/`, `║`, '/' ],
            [`${ GREEN } `, `╜`, ' ' ],
        ]
    ],
    BULLET: [[`${ WHITE }·`]],
    WALL_H: [[BLUE_BRICK,BLUE_BRICK,BLUE_BRICK,BLUE_BRICK,BLUE_BRICK,BLUE_BRICK,BLUE_BRICK,BLUE_BRICK,BLUE_BRICK,BLUE_BRICK]],
    WALL_V: [
        [BLUE_BRICK], 
        [BLUE_BRICK], 
        [BLUE_BRICK], 
        [BLUE_BRICK], 
        [BLUE_BRICK]
    ],
    EXIT_OPEN_H: [[' ', ' ', ' ',' ',' ',' ',' ',' ',' ',' ']],
    EXIT_OPEN_V: [
        [' '], 
        [' '], 
        [' '], 
        [' '], 
        [' ']
    ],
    EXIT_CLOSED_H: [[RED_CLOSED_BRICK_H,RED_CLOSED_BRICK_H,RED_CLOSED_BRICK_H,RED_CLOSED_BRICK_H,RED_CLOSED_BRICK_H,RED_CLOSED_BRICK_H,RED_CLOSED_BRICK_H,RED_CLOSED_BRICK_H,RED_CLOSED_BRICK_H,RED_CLOSED_BRICK_H]],
    EXIT_CLOSED_V: [
        [RED_CLOSED_BRICK_V], 
        [RED_CLOSED_BRICK_V], 
        [RED_CLOSED_BRICK_V], 
        [RED_CLOSED_BRICK_V], 
        [RED_CLOSED_BRICK_V]
    ]
};