const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Farmer", function () {

    async function deployTestEntities() {          
        const Dog = await ethers.getContractFactory("Dog");
        const dog = await Dog.deploy("Friend");
        const Horse = await ethers.getContractFactory("Horse");
        const horse = await Horse.deploy("Flash");
        const Farmer = await ethers.getContractFactory("Farmer");
        const farmer = await Farmer.deploy();
        return { dog, horse, farmer };
    }

    describe("Test Farmer", function () {
        it("Farmer can call Horse, Horse responds correctly.", async function () {
          const { horse, farmer } = await loadFixture(deployTestEntities);
          expect(await farmer.call(horse.target)).to.equal("Igogo");
        });
        it("Farmer can feed Horse with plant", async function () {
            const { horse, farmer } = await loadFixture(deployTestEntities);
            expect(await farmer.feed(horse.target, "plant")).to.equal("Animal eats plant");
        });
        it("Farmer cannot feed Horse with anything else(”meat”,”plastic”,”fingers”,etc).", async function () {
            const { horse, farmer } = await loadFixture(deployTestEntities);
            await expect( farmer.feed(horse.target, "meat")).to.be.revertedWith("Can only eat plant food");
            await expect( farmer.feed(horse.target, "plastic")).to.be.revertedWith("Can only eat plant food");
            await expect( farmer.feed(horse.target, "fingers")).to.be.revertedWith("Can only eat plant food");
        });
        it("Farmer can call Dog, Dog responds correctly.", async function () {
            const { dog, farmer } = await loadFixture(deployTestEntities);
            expect(await farmer.call(dog.target)).to.equal("Woof");
        });
        it("Farmer can feed Dog with ”meat”,”plant”.", async function () {
            const { dog, farmer } = await loadFixture(deployTestEntities);
            expect(await farmer.feed(dog.target, "plant")).to.equal("Animal eats plant");
            expect(await farmer.feed(dog.target, "meat")).to.equal("Animal eats meat");
        });
        it("Farmer cannot feed Horse with anything else(”meat”,”plastic”,”fingers”,etc).", async function () {
            const { dog, farmer } = await loadFixture(deployTestEntities);
            await expect( farmer.feed(dog.target, "not-food")).to.be.revertedWith("Can only eat meat or plant food");
            await expect( farmer.feed(dog.target, "plastic")).to.be.revertedWith("Can only eat meat or plant food");
            await expect( farmer.feed(dog.target, "fingers")).to.be.revertedWith("Can only eat meat or plant food");
        });
    });
});