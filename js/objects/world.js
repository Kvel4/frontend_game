import {Player} from "./player";
import {Info} from "./info"
import {Laser} from "./laser";
import {Enemy} from "./enemy"
import {HealPack} from "./healpack"
import {AmmoPack} from "./ammopack";


export class World {
    constructor() {
        // Создадим игрока
        this.player = new Player(0, 0);
        this.lasers = [];
        this.enemies = [];
        this.healpacks = [];
        this.ammopacks = [];
        // создадид массив лазеров

    }
    click(x, y){
        if (this.player.ammo > 0) {
            this.player.ammo -= 1;
            this.lasers.push(new Laser(this.player.x, this.player.y, x, y))
        }
    };

    add_healpack = () => {
        let x = getRandomInt(0, window.innerWidth);
        let y = getRandomInt(0, window.innerHeight);
        while (((this.player.x - x)** 2 + (this.player.y) ** 2) ** 0.5 < 110){
            x = getRandomInt(0, window.innerWidth);
            y = getRandomInt(0, window.innerHeight);
        }
        this.healpacks.push(new HealPack(x,y));
    };
    delete_healpack = (healpack) => {
        this.healpacks.splice(this.healpacks.indexOf(healpack), 1);
        this.player.health += 1
    };
    add_ammopack = () => {
        let x = getRandomInt(0, window.innerWidth);
        let y = getRandomInt(0, window.innerHeight);
        while (((this.player.x - x)** 2 + (this.player.y) ** 2) ** 0.5 < 110){
            x = getRandomInt(0, window.innerWidth);
            y = getRandomInt(0, window.innerHeight);
        }
        this.ammopacks.push(new AmmoPack(x,y));
    };

    delete_ammopack = (ammopack) => {
        this.ammopacks.splice(this.ammopacks.indexOf(ammopack), 1);
        this.player.ammo += 10
    };

    add_enemy = () => {
        let x = getRandomInt(0, window.innerWidth);
        let y = getRandomInt(0, window.innerHeight);
        while (((this.player.x - x)** 2 + (this.player.y) ** 2) ** 0.5 < 110){
            x = getRandomInt(0, window.innerWidth);
            y = getRandomInt(0, window.innerHeight);
        }
        this.enemies.push(new Enemy(x,y))

    };
    death = () => {
        this.lasers = [];
        this.enemies = [];
        this.ammopacks = [];
        this.healpacks = [];
        this.player.ammo = 20;
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

        return [this.player, this.lasers, this.enemies, this.healpacks, this.ammopacks,
            new Info(this.player.x, this.player.y, this.player.health, this.player.ammo, this.player.score)]
    }

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

