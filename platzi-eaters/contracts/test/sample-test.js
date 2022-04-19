const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PlatziFood", function () {
  it("Add a new dish", async function () {
    const PlatziFood = await ethers.getContractFactory("PlatziFood");
    const platziFood = await PlatziFood.deploy();
    await platziFood.deployed();

    var addFood = await platziFood.addPlatziFood(
      "https://eatyourworld.com/images/content_images/images/gallo-pinto.jpg",
      "Gallo Pinto",
      "Costa Rica"
    );

    //esperar que el addPlatziFood method sea minteado
    await addFood.wait();

    var foods = await platziFood.getAllPlatziFoods();
    expect(foods.length).to.equal(1);

    var foodsByOwner = await platziFood.getPlatziFoodsByOwner();

    expect(foodsByOwner.length).to.equal(1);
  });
});
