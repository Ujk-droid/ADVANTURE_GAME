#! usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.yellow("==============================================="));
console.log(chalk.blue("***************ADVANTURE_GAME******************"));
console.log(chalk.yellow("==============================================="));

class Player {
    name: string;
    fuel: number = 100;
    constructor(name: string) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 25;
    }
    fuelIncrease() {
        this.fuel = 100;
    }
}

class Opponent {
    name: string;
    fuel: number = 100;
    constructor(name: string) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 25;
    }
}

let player = await inquirer.prompt([
    {
        name: "name",
        type: "input",
        message: "Please enter your name."
    }
]);

let opponent = await inquirer.prompt([
    {
        name: "select",
        type: "list",
        message: "Select your opponent",
        choices: ["Skeleton", "Alien", "Zombie"]
    }
]);

let p1 = new Player(player.name);
let o1 = new Opponent(opponent.select);

while (true) {
    let ask = await inquirer.prompt([
        {
            name: "opt",
            type: "list",
            message: "What would you like to do?",
            choices: ["Attack", "drink portion", "run for life"]
        }
    ]);

    if (ask.opt === "Attack") {
        let num = Math.floor(Math.random() * 2);
        if (num > 0) {
            p1.fuelDecrease();
            console.log(`${p1.name} fuel is ${p1.fuel}`);
        } else {
            o1.fuelDecrease();
            console.log(`${o1.name} fuel is ${o1.fuel}`);
        }
        if (p1.fuel <= 0 || o1.fuel <= 0) {
            break;
        }
    } else if (ask.opt === "drink portion") {
        p1.fuelIncrease();
        console.log(`You drank a health potion, your fuel is ${p1.fuel}`);
    } else if (ask.opt === "run for life") {
        console.log("You lose, better luck next time");
        break;
    }
}

if (p1.fuel > o1.fuel) {
    console.log("Congratulations, you win!");
} else {
    console.log("You lose, better luck next time");
}
