const { ethers } = require("hardhat");
const { getAllProductContract } = require("..//util/api"); // Dùng require thay vì import

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const Dappazon = await ethers.getContractFactory("Dappazon");
  const dappazon = await Dappazon.deploy();
  await dappazon.deployed();

  console.log(`Deployed Dappazon contract at: ${dappazon.address}\n`);
  const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
  }
  // Lấy dữ liệu từ API
  const data = await getAllProductContract();
  // console.log("data", data)

  // Thêm sản phẩm vào hợp đồng
  for (let i = 0; i < data.length; i++) {
    try {
      const transaction = await dappazon.addProduct(
        data[i].name,
        data[i].category,
        data[i].image,
        tokens(data[i].price),
        data[i].shortDesc,
        data[i].stock,
        { gasLimit: 500000 }
      );
      await transaction.wait();
      // console.log(`Added product: `, i);
    } catch (error) {
      // console.error(`Failed to add product: ${data[i].name}`, error);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
