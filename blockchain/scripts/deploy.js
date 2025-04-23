const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(`Deploying contracts with the account: ${deployer.address}`);

  // Lấy ContractFactory cho Dappazon
  const Dappazon = await hre.ethers.getContractFactory("Dappazon");

  // Deploy Dappazon contract
  const dappazon = await Dappazon.deploy(); // Không cần `{ gasLimit: ... }`
  await dappazon.deployed();

  console.log(`Deployed Dappazon contract at: ${dappazon.address}\n`);

  // Add sample products
  const items = [
    {
      name: "Car",
      category: "CAR",
      image: "http://localhost:8081/product/i.png",
      price: hre.ethers.utils.parseUnits("1", "ether"),
      shortDesc: "Laptop Acer",
      stock: 10,
    },
    {
      name: "Car",
      category: "CAR",
      image: "http://localhost:8081/product/a.png",
      price: hre.ethers.utils.parseUnits("1", "ether"),
      shortDesc: "Laptop Acer",
      stock: 10,
    },
    {
      name: "Car",
      category: "CAR",
      image: "http://localhost:8081/product/b.png",
      price: hre.ethers.utils.parseUnits("1", "ether"),
      shortDesc: "Laptop Acer",
      stock: 10,
    },
    {
      name: "Cycle",
      category: "CYCLE",
      image: "http://localhost:8081/product/c.png",
      price: hre.ethers.utils.parseUnits("0.2", "ether"),
      shortDesc: "Laptop Acer",
      stock: 15,
    },
    {
      name: "Cycle",
      category: "CYCLE",
      image: "http://localhost:8081/product/d.png",
      price: hre.ethers.utils.parseUnits("0.2", "ether"),
      shortDesc: "Laptop Acer",
      stock: 15,
    },
    {
      name: "Cycle",
      category: "CYCLE",
      image: "http://localhost:8081/product/e.png",
      price: hre.ethers.utils.parseUnits("0.2", "ether"),
      shortDesc: "Laptop Acer",
      stock: 15,
    },
    {
      name: "Bike",
      category: "BIKE",
      image: "http://localhost:8081/product/f.png",
      price: hre.ethers.utils.parseUnits("0.5", "ether"),
      shortDesc: "Laptop Acer",
      stock: 20,
    },
    {
      name: "Bike",
      category: "BIKE",
      image: "http://localhost:8081/product/g.png",
      price: hre.ethers.utils.parseUnits("0.5", "ether"),
      shortDesc: "Laptop Acer",
      stock: 20,
    },
    {
      name: "Bike",
      category: "BIKE",
      image: "http://localhost:8081/product/f.png",
      price: hre.ethers.utils.parseUnits("0.5", "ether"),
      shortDesc: "Laptop Acer",
      stock: 20,
    },
  ];

  for (let i = 0; i < items.length; i++) {
    const transaction = await dappazon.addProduct(
      items[i].name,
      items[i].category,
      items[i].image,
      items[i].price,
      items[i].shortDesc,
      items[i].stock,
      { gasLimit: 500000 } // Đặt gas limit thủ công cho từng giao dịch
    );
    await transaction.wait();
    console.log(`Added product: ${items[i].name}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});