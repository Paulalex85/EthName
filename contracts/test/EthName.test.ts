import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import { expect } from "chai";
import { ethers } from "hardhat";
import { beforeEach } from "mocha";
import { EthName } from "../typechain";

describe("EthName", function () {
    let [alice, bob]: SignerWithAddress[] = [];
    let ethName: EthName;

    beforeEach(async function () {
        [alice, bob] = await ethers.getSigners();
        const EthName = await ethers.getContractFactory("EthName");
        ethName = await EthName.deploy();
        await ethName.deployed();
    });

    it("Should save and read name", async function () {
        await ethName.setName("testName");

        expect(await ethName.readName(alice.address)).to.equal("testName");
    });

    it("update name", async function () {
        await ethName.setName("testName");
        expect(await ethName.readName(alice.address)).to.equal("testName");
        await ethName.setName("anotherName");
        expect(await ethName.readName(alice.address)).to.equal("anotherName");
    });

    it("names are unique", async function () {
        await ethName.setName("testName");
        expect(await ethName.readName(alice.address)).to.equal("testName");
        await expect(ethName.connect(bob).setName("testName")).to.be.revertedWith("Name already taken");
    });
});
