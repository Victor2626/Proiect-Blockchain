const { ethers } = require("hardhat");

async function main() {
    // Deploy ReputationSystem
    const ReputationSystem = await ethers.getContractFactory("ReputationSystem");
    const reputationSystem = await ReputationSystem.deploy();
    await reputationSystem.waitForDeployment();
    console.log("ReputationSystem deployed to:", reputationSystem.address);

    // Deploy UserManager cu adresa ReputationSystem
    const UserManager = await ethers.getContractFactory("UserManager");
    const userManager = await UserManager.deploy(reputationSystem.address);
    await userManager.waitForDeployment();
    console.log("UserManager deployed to:", userManager.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
