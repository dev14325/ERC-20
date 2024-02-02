// import ethers from "ethers";
// const{ethers} = require("ethers");
async function main(){
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account ", deployer.address);
 const bal =  (await deployer.getBalance()).toString();
//  const Bal = await utils.formatEther(bal);
//  console.log(utils.formatEther(bal));
//  console.log("Account Balance is : ",Bal);


//  console.log("Account Balance is : ",(await deployer.getBalance()).toString());

  const Temp = await ethers.getContractFactory("GovernanceToken");
  const temp = await Temp.deploy();
  console.log("contract address is ",temp.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
