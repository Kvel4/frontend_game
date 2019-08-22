import {Player} from "./player";
import {Info} from "./info"
import {Laser} from "./laser";
import {Enemy} from "./enemy"


export class World {
    constructor() {
        // Создадим игрока
        this.player = new Player(0, 0);
        this.lasers = [];
        this.enemies = [];
        // создадид массив лазеров

    }
    click(x, y){
        this.lasers.push(new Laser(this.player.x, this.player.y, x, y))
    };

    add_enemy = () => {
        this.enemies.push(new Enemy(getRandomInt(0, window.innerWidth), getRandomInt(0, window.innerHeight)))

    };
    death = () => {
        this.lasers = [];
        this.enemies = [];
        this.player.health = 3;
        this.player.score = 0;
        this.player.x = window.innerWidth / 2;
        this.player.y = window.innerHeight / 2;
    };
    delete_enemy = (enemy) => {
        this.enemies.splice(this.enemies.indexOf(enemy), 1)
        this.player.score += 10
    };

    delete_laser = (laser) => {
        this.lasers.splice(this.lasers.indexOf(laser), 1)
    };
    // ToDo: Метод click, которая принимает x, y

    // В зависисмости от нажатых клавиш изменяем среду
    move = (keys) => {
        this.player.teleport();
        // Для каждого ключа в объекте
        Object.keys(keys).map((key) => {
            // Если нажата кнопка
            if (keys[key]) {
                // Взависимости от того какая кнопка
                switch (key) {
                    case "a":
                        this.player.go_left();
                        break;
                    case "d":
                        this.player.go_right();
                        break;
                    case "s":
                        this.player.go_down();
                        break;
                    case "w":
                        this.player.go_up();
                        break;
                }
            }
        });

    };

    get_items() {
        // ToDo: Возвращать массив лазеров

        return [this.player, this.lasers, this.enemies, new Info(this.player.x, this.player.y, this.player.health, this.player.score)]
    }

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

