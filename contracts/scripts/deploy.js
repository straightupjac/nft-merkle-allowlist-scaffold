async function main() {
  // update the name here
  const SampleNFT = await ethers.getContractFactory("SampleNFT")

  // Start deployment, returning a promise that resolves to a contract object
  const sampleNFT = await SampleNFT.deploy(
    "", // baseURI include the /
    "" // collectionURI
  );
  console.log("Contract deployed to address:", sampleNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })