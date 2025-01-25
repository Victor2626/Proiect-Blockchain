const { expect } = require("chai");

describe("PlatformManager", function () {
  it("Should deploy the contract and perform basic checks", async function () {
    const PlatformManager = await ethers.getContractFactory("PlatformManager");
    const platformManager = await PlatformManager.deploy();
    await platformManager.deployed();

    expect(await platformManager.owner()).to.exist; // Verificăm dacă owner-ul este setat
  });
});
