import * as PIXI from "pixi.js";

export class Enemy {
    constructor(startx, starty) {
        this.cur_x = startx;
        this.cur_y = starty;
        this.k = 2.5;
        this.r = 10;
    }

    to_player_move(dest_x, dest_y){
        this.deltax = dest_x - this.cur_x;
        this.deltay = dest_y - this.cur_y;

        this.sin = this.deltay / (this.deltax ** 2 + this.deltay ** 2) ** 0.5;
        this.cos = this.deltax / (this.deltax ** 2 + this.deltay ** 2) ** 0.5;

        this.cur_x += this.cos * this.k;
        this.cur_y += this.sin * this.k;
    }

    draw(dest_x, dest_y) {
        this.to_player_move(dest_x, dest_y);
        // http://pixijs.download/dev/docs/PIXI.Graphics.html
        const graphics = new PIXI.Graphics();

        graphics.beginFill(0x800000);
        graphics.drawCircle(this.cur_x, this.cur_y, this.r);
        graphics.endFill();

        return graphics
    }
}