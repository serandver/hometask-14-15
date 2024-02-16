const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Horse", function () {

    async function deployHorse() { 
        const [owner, otherAccount] = await ethers.getSigners();
        const Horse = await ethers.getContractFactory("Horse");
        const horse = await Horse.deploy("Flash");
        return { horse };
    }

    describe("Base Horse abilities", function () {
        it("Horse has the correct name.", async function () {
          const { horse } = await loadFixture(deployHorse);
          expect(await horse.getName()).to.equal("Flash");
        });
        it("Horse can sleep.", async function () {
            const { horse } = await loadFixture(deployHorse);
            expect(await horse.sleep()).to.equal("Z-z-z-z-z....");
        });
        it("Horse can eat plant.", async function () {
            const { horse } = await loadFixture(deployHorse);
            expect(await horse.eat("plant")).to.equal("Animal eats plant");
        });
        it("Horse cannot eat meat, not-food, plastic", async function () {
            const { horse } = await loadFixture(deployHorse);
            await expect(horse.eat("meat")).to.be.revertedWith("Can only eat plant food");
            await expect(horse.eat("not-food")).to.be.revertedWith("Can only eat plant food");
            await expect(horse.eat("plastic")).to.be.revertedWith("Can only eat plant food");
        });
    });
});