import {Player} from "./player";
import {Info} from "./info"
import {Laser} from "./laser";


export class World {
    constructor() {
        // Создадим игрока
        this.player = new Player(0, 0)
        this.lasers = [new Laser(0, 0, 0, 0)]
        // создадид массив лазеров

    }


    click(x, y){
        this.lasers.push(new Laser(this.player.x, this.player.y, x, y))
    }
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

        return [this.player, this.lasers, new Info(this.player.x, this.player.y)]
    }

}

