const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Dog", function () {

    async function deployDog() { 
        const Dog = await ethers.getContractFactory("Dog");
        const dog = await Dog.deploy("Friend");
        return { dog };
    }

    describe("Base Dog abilities", function () {
        it("Dog has the correct name.", async function () {
          const { dog } = await loadFixture(deployDog);
          expect(await dog.getName()).to.equal("Friend");
        });
        it("Dog can sleep.", async function () {
            const { dog } = await loadFixture(deployDog);
            expect(await dog.sleep()).to.equal("Z-z-z-z-z....");
        });
        it("Dog can eat plant.", async function () {
            const { dog } = await loadFixture(deployDog);
            expect(await dog.eat("plant")).to.equal("Animal eats plant");
        });
        it("Dog can eat meat.", async function () {
            const { dog } = await loadFixture(deployDog);
            expect(await dog.eat("meat")).to.equal("Animal eats meat");
        });
        it("Dog cannot eat meat, not-food, plastic.", async function () {
            const { dog } = await loadFixture(deployDog);
            await expect(dog.eat("not-food")).to.be.revertedWith("Can only eat meat or plant food");
            await expect(dog.eat("plastic")).to.be.revertedWith("Can only eat meat or plant food");
            await expect(dog.eat("chocolate")).to.be.revertedWith("Can only eat meat or plant food");
        });
    });
});