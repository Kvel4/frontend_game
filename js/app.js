import * as PIXI from 'pixi.js';
import {World} from "./objects/world";

// Загружаем стили. Импортируем, для того чтобы webpack сам с ними разоборался
import '../styles/index.css'

// Создаём наш мир
const world = new World();
setInterval(world.add_enemy, 1000);
setInterval(world.add_healpack, 10000);
setInterval(world.add_ammopack, 10000);

// http://pixijs.download/dev/docs/PIXI.Application.html
const renderer = PIXI.autoDetectRenderer(
    window.innerWidth,
    window.innerHeight,
    {backgroundColor: 0x00000, resolution: 2});

// Нажата ли кнопка
const keys = {"w": false, "s": false, "a": false, "d": false};


function animate() {
    // Позволяет рисовать каждый тик
    requestAnimationFrame(animate);

    // http://pixijs.download/dev/docs/PIXI.Container.html
    const stage = new PIXI.Container();
    let response = world.get_items();
    response.forEach((item) => {
        // Достаём отрисованный объект
        if (response.indexOf(item) === 1){
            // Удаляем долетевшие лазеры
            world.lasers = item.filter(laser => !(laser.cur_x === laser.dist_x && laser.dist_y === laser.cur_y));
            world.lasers.forEach((laser) => {
                stage.addChild(laser.draw())
            });
        }
        else if(response.indexOf(item) === 2) {
            item.forEach((enemy) => {
                if (((Math.abs(world.player.x - enemy.cur_x)) ** 2 + (Math.abs(world.player.y - enemy.cur_y)) ** 2) ** 0.5 <= world.player.r + enemy.r) {
                    world.player.health -= 1;
                    world.delete_enemy(enemy);
                    if (world.player.health <= 0){
                        world.death();
                    }
                }
                response[1].forEach((laser) => {
                    if (((Math.abs(laser.cur_x - enemy.cur_x)) ** 2 + (Math.abs(laser.cur_y - enemy.cur_y)) ** 2) ** 0.5 <= laser.r + enemy.r) {
                        world.delete_enemy(enemy);
                        world.delete_laser(laser);
                    }
                });
                stage.addChild(enemy.draw(world.player.x, world.player.y));
            });
        }
        else if (response.indexOf(item) === 3){
            item.forEach(healpack => {
                if (((world.player.x - healpack.cur_x) ** 2 + (world.player.y - healpack.cur_y) ** 2) ** 0.5 < world.player.r + healpack.r){
                    world.delete_healpack(healpack)
                }
                else {
                    stage.addChild(healpack.draw())
                }
            })
        }
        else if (response.indexOf(item) === 4) {
            item.forEach(ammopack => {
                if (((world.player.x - ammopack.cur_x) ** 2 + (world.player.y - ammopack.cur_y) ** 2) ** 0.5 < world.player.r + ammopack.r){
                    world.delete_ammopack(ammopack)
                }
                else {
                    stage.addChild(ammopack.draw())
                }
            });
        }
        else{
            const graphics = item.draw();
            stage.addChild(graphics)
        }
        // Добавляем его в Container
    });
    // Отрисовываем в этом тике всё
    renderer.render(stage);

    // Смотрим на нажатые кнопки
    world.move(keys);
}
document.addEventListener('keydown', (ev) => {
    keys[ev.key] = true;
}, false);

document.addEventListener('keyup', (ev) => {
    keys[ev.key] = false;
}, false);

document.addEventListener('click', (ev) => {
    // ToDo: Вызывать метод click у World
    world.click(ev.clientX, ev.clientY);
    console.log(ev);
}, false);


function setCanvasSize() {
    // Устанавливаем нужные параметры высоты и ширины для канваса
    const canvas = renderer.view;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    renderer.resize(window.innerWidth, window.innerHeight);
    if (world.player.x === 0 && world.player.y === 0) {
        world.player.x = window.innerWidth / 2;
        world.player.y = window.innerHeight / 2;
    }
}

window.onresize = (ev) => {
    setCanvasSize();
};

// Начинаем рисовать!
animate();

// Wait for document loaded
window.onload = () => {
    // Достаём <div id="main"/> и суём туда canvas из renderer
    // View Page Source если не веришь
    document.getElementById("main").appendChild(renderer.view);
    setCanvasSize();
};