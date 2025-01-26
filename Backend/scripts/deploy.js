const hre = require("hardhat");

async function main() {
  // Deploy PlatformManager
  const PlatformManager = await hre.ethers.getContractFactory("PlatformManager");
  const platformManager = await PlatformManager.deploy();

  console.log("PlatformManager deployed to:", platformManager.address);

  // Deploy CharityEvent cu parametri constructorului
  const CharityEvent = await hre.ethers.getContractFactory("CharityEvent");
  
  const charityEventName = "Organizatie test"; // Numele evenimentului
  const managerAddress = "0x55f3e3256Aa27868Fa842016c2d02E2Cf8321A18"; // Înlocuiește cu adresa ta
  const durationDays = 1; // Durata evenimentului

  const charityEvent = await CharityEvent.deploy(charityEventName, managerAddress, durationDays);

  console.log("CharityEvent deployed to:", charityEvent.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
