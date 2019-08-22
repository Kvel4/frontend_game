import * as PIXI from "pixi.js";

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Classes
export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 10;
    }
    teleport(){

        if (this.x > document.documentElement.clientWidth){
            this.x = 0
        }
        if (this.y > document.documentElement.clientHeight){
            this.y = 0
        }
        if (this.x < 0){
            this.x = document.documentElement.clientWidth
        }
        if (this.y < 0){
            this.y = document.documentElement.clientHeight
        }
    }
    draw() {
        // http://pixijs.download/dev/docs/PIXI.Graphics.html
        const graphics = new PIXI.Graphics();

        graphics.beginFill(0xFFFFFF);
        graphics.drawCircle(this.x, this.y, this.r);
        graphics.endFill();

        return graphics
    }

    go_left = () => {
        this.x -= 10
    };

    go_right = () => {
        this.x += 10
    };

    go_up = () => {
        this.y -= 10
    };

    go_down = () => {
        this.y += 10
    }
}