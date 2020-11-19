const { ethers, Wallet } = require("ethers");
const { mnemonic, projectId } = require("../secret.json");

async function main() {
  const provider = ethers.getDefaultProvider("ropsten", {
    infura: projectId,
  });

  // let signer =  provider.getSigner();
  let blockNumber = await provider.getBlockNumber();
  console.log("number", blockNumber);
  // console.log("signer", signer);

  let user = ethers.Wallet.fromMnemonic(mnemonic, "m/44'/60'/0'/0/0");
  let devUser= ethers.Wallet.fromMnemonic(mnemonic, "m/44'/60'/0'/0/1");
  console.log("deployer", user.address);
  console.log("devUser", devUser.address);

  let balance = await provider.getBalance(user.address);
  console.log("balance", ethers.utils.formatEther(balance));

  user = user.connect(provider);
  let txCount = await user.getTransactionCount();
  console.log("txCount", txCount);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
