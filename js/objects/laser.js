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

        /*
        this.speed_x = 5;
        this.speed_y = 5;

        this.deltax = dist_x-cur_x;
        this.deltay = dist_y-cur_y;

        if (this.deltax !== 0) {
            this.k = this.deltay / this.deltax;
        }
        this.b = this.cur_y  - this.k * this.cur_x
        */
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

        /*
        if (Math.abs(this.dist_y-this.cur_y) < this.speed_y){
            this.speed_y =  Math.abs(this.dist_y-this.cur_y)
        }
        if (Math.abs(this.dist_x-this.cur_x) < this.speed_x){
            this.speed_x =  Math.abs(this.dist_x-this.cur_x)
        }

        if (this.deltax > 0){
            this.cur_x += this.speed_x;
            this.cur_y = this.k * this.cur_x + this.b;
        }
        if (this.deltax < 0){
            this.cur_x -= this.speed_x;
            this.cur_y = this.k * this.cur_x + this.b
        }

        if (this.cur_x === this.dist_x){
            if (this.deltay > 0){
                this.cur_y += this.speed_y
            }
            if (this.deltay < 0){
                this.cur_y -= this.speed_y
            }
        }
        if (this.cur_y === this.dist_y){
            if (this.deltax > 0){
                this.cur_x += this.speed_x
            }
            if (this.deltax < 0){
                this.cur_x -= this.speed_x
            }
        }
    }

        if (Math.abs(this.deltay) < this.speed_y){
            this.speed_y =  Math.abs(this.deltay)
        }
        if (Math.abs(this.deltax) < this.speed_x){
            this.speed_x =  Math.abs(this.deltax)
        }

        if (this.deltax > 0){
            this.cur_x += this.speed_x
            this.deltax -= this.speed_x
        }
        if (this.deltax < 0){
            this.cur_x -= this.speed_x
            this.deltax += this.speed_x
        }
        if (this.deltay > 0){
            this.cur_y += this.speed_y
            this.deltay -= this.speed_y
        }
        if (this.deltay < 0){
            this.cur_y -= this.speed_y
            this.deltay += this.speed_y
        }
        */

    draw() {
        this.move()
        // http://pixijs.download/dev/docs/PIXI.Graphics.html
        const graphics = new PIXI.Graphics();

        graphics.beginFill(0xFFFFFF);
        graphics.drawCircle(this.cur_x, this.cur_y, this.r);
        graphics.endFill();

        return graphics
    }
}