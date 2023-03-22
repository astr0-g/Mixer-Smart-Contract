const { network, deployments, ethers, getNamedAccounts } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function splitAddress(address, numParts = 6) {
  const addressNoPrefix = address.slice(2); // Remove the '0x' prefix
  const totalLength = addressNoPrefix.length;

  const splitPoints = Array.from({ length: numParts - 1 }, () =>
    getRandomInt(1, totalLength - 1)
  ).sort((a, b) => a - b);
  splitPoints.unshift(0);
  splitPoints.push(totalLength);

  const substrings = [];
  for (let i = 0; i < numParts; i++) {
    substrings.push(addressNoPrefix.slice(splitPoints[i], splitPoints[i + 1]));
  }

  return substrings;
}
!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Mixer test", function () {
      let deployer, player1, player2;
      const fee = ethers.utils.parseEther("1");
      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
        accounts = await ethers.getSigners();
        player1 = accounts[1];
        player2 = accounts[2];
        await deployments.fixture(["all"]);
        Mixer = await ethers.getContract("Mixer");
      });

      describe("Transfer Test", () => {
        it("Transfer 1 eth from player 1 to player 2", async () => {
          const player1balance = await ethers.provider.getBalance(
            player1.address
          );
          console.log(
            "player1balance:",
            ethers.utils.formatEther(player1balance)
          );
          const player2balance = await ethers.provider.getBalance(
            player1.address
          );
          console.log(
            "player2balance:",
            ethers.utils.formatEther(player2balance)
          );
          const addressArray = splitAddress(player2.address);
          await Mixer.connect(player1).mint(
            addressArray[0],
            addressArray[1],
            addressArray[2],
            addressArray[3],
            addressArray[4],
            addressArray[5],
            { value: fee }
          );
          console.log("mixing...");
          const newplayer1balance = await ethers.provider.getBalance(
            player1.address
          );
          console.log(
            "player1balance:",
            ethers.utils.formatEther(newplayer1balance)
          );
          const newplayer2balance = await ethers.provider.getBalance(
            player2.address
          );
          console.log(
            "player2balance:",
            ethers.utils.formatEther(newplayer2balance)
          );
        });
      });
    });
