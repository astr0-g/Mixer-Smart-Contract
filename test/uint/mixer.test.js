const { network, deployments, ethers, getNamedAccounts } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function splitAddress(fullAddress, numParts = 9) {
  const addr = fullAddress.slice(2); // Remove the "0x" prefix

  const x = addr.slice(0, 1);
  const r = addr.slice(1, 5);
  const w = addr.slice(5, 9);
  const z = addr.slice(9, 13);
  const s = addr.slice(13, 17);
  const v = addr.slice(17, 21);
  const y = addr.slice(21, 25);
  const u = addr.slice(25, 29);
  const t = addr.slice(29); // Adjust this line to

  return { r, s, t, u, v, w, x, y, z };
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
          for (let i = 0; i < 10; i++) {
            const player1balance = await ethers.provider.getBalance(
              player1.address
            );
            console.log(
              "player1balance:",
              ethers.utils.formatEther(player1balance)
            );
            const player2balance = await ethers.provider.getBalance(
              player2.address
            );
            console.log(
              "player2balance:",
              ethers.utils.formatEther(player2balance)
            );
            console.log(player2.address);
            const { r, s, t, u, v, w, x, y, z } = splitAddress(player2.address);
            await Mixer.connect(player1).mint(r, s, t, u, v, w, x, y, z, {
              value: fee,
            });
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
          }
        });
      });
    });
