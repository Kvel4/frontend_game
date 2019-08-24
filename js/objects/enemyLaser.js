import * as PIXI from "pixi.js";


export class Laser {
    constructor(cur_x, cur_y, dist_x, dist_y) {
        this.cur_x = cur_x;
        this.cur_y = cur_y;
        this.r = 5;

        this.dist_x = dist_x;
        this.dist_y = dist_y;

        this.deltax = dist_x-cur_x;
        this.deltay = dist_y-cur_y;

        this.sin = this.deltay / (this.deltax ** 2 + this.deltay ** 2)** 0.5 ;
        this.cos = this.deltax / (this.deltax ** 2 + this.deltay ** 2) ** 0.5;
        this.k = 10;
        this.speed_x = this.cos * this.k;
        this.speed_y = this.sin * this.k;
    }

    // ToDo: Сделать метод, который вычисляет новый x и y
    move(){
        if (Math.abs(this.dist_y-this.cur_y) < Math.abs(this.speed_y)){
            this.speed_y =  this.dist_y-this.cur_y
        }
        if (Math.abs(this.dist_x-this.cur_x) < Math.abs(this.speed_x)){
            this.speed_x =  this.dist_x-this.cur_x
        }
        this.cur_x += this.speed_x;
        this.cur_y += this.speed_y;

    }

    draw() {
        this.move()
        // http://pixijs.download/dev/docs/PIXI.Graphics.html
        const graphics = new PIXI.Graphics();

        graphics.beginFill(0x00CED1);
        graphics.drawCircle(this.cur_x, this.cur_y, this.r);
        graphics.endFill();

        return graphics
    }
}