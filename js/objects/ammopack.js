import * as PIXI from "pixi.js";

export class AmmoPack {
    constructor(startx, starty) {
        this.cur_x = startx;
        this.cur_y = starty;
        this.r = 10;
    }

    draw() {
        // http://pixijs.download/dev/docs/PIXI.Graphics.html
        const graphics = new PIXI.Graphics();

        graphics.beginFill(0x00CED1);
        graphics.drawCircle(this.cur_x, this.cur_y, this.r);
        graphics.endFill();

        return graphics
    }
}