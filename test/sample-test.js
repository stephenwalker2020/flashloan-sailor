const { expect } = require("chai");
const { ethers} = require("hardhat");

describe("Greeter", function() {
  it("Should return the new greeting once it's changed", async function() {
    const [owner, addr1] = await ethers.getSigners();
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    
    await greeter.deployed();
    expect(await greeter.greet()).to.equal("Hello, world!");

    await greeter.connect(addr1).setGreeting("Hola, mundo!");
    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
