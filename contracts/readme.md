# contracts
## Prerequisites
1. Have access to the public and private key to your Ethereum account.
2. Have an alchemy account set-up

## Dependencies
Hardhat
```zsh
yarn add hardhat
```

Dotenv
```zsh
yarn add dotenv
```

Ethers.js
```zsh
yarn add @nomiclabs/hardhat-ethers ethers@^5.0.0
```
OpenZeppelin
```zsh
yarn add @openzeppelin/contracts
```
Alchemy Web3
```zsh
yarn add @alch/alchemy-web3
```
Hardhat-etherscan (to verify your contract)
```
yarn add @nomiclabs/hardhat-etherscan
```

## Steps to Deploy
1. Make a copy of `.sample-env` and fill it out
    ```
    cp .sample-env .env
    ```
2. Make any modifications the smart contract in `./contract` and deploy script in `./script/deploy.js`
3. Compile the contract
    ```
    npx hardhat compile
    ```
4. Deploy the contract
    ```
    npx hardhat run scripts/deploy.js --network rinkeby
    ```

## Set Base URI
```
node scripts/setBaseURI.js
```

## Set Merkle Root
```
node scripts/setWhitelistMerkleRoot.js
node scripts/setGiftMerkleRoot.js

```
## Verify Contract
Read this [tutorial](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html) for more info.

TLDR: Run this command with your `DEPLOYED_CONTRACT_ADDRESS`, the network where it's deployed, and the constructor arguments that were used to deploy it.
```
npx hardhat verify --network mainnet DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1"
```