# 🖌️ nft-merkle-whitelist-scaffold
Bootstrap an NFT minting site with merkle tree whitelists.


Go to [nft-merkle-whitelist.vercel.app](https://nft-merkle-whitelist.vercel.app/) to see the latest deployment.

Deployed sample NFT contract can be viewed on [rinkeby.etherscan.io/address/0x0E7121b8aaEBd6F4fAbe13890E33d9E8fD0Fd345](https://rinkeby.etherscan.io/address/0x0E7121b8aaEBd6F4fAbe13890E33d9E8fD0Fd345#code)

## Get Started
Play around with the deployed test app [here](https://nft-merkle-whitelist.vercel.app/)

To build your own NFT mint page with merkle whitelist:
1. Clone this repo
2. Head to [contracts](https://github.com/straightupjac/nft-merkle-whitelist-scaffold/tree/main/contracts) `README.md` to set up your contracts
3. Head to [web](https://github.com/straightupjac/nft-merkle-whitelist-scaffold/tree/main/web) `README.md` to set up your front-end
4. Deploy your web-app using vercel

## Inspiration
Inspiration for this came from many different projects. Some notable ones include:
- [Scaffold-eth buyer-mints](https://github.com/scaffold-eth/scaffold-eth/tree/buyer-mints-nft) - a more complex version of this project :) I learned a ton from this example!
- Anish Agnihotri's [ERC20 merkle airdrop scaffold](https://github.com/Anish-Agnihotri/merkle-airdrop-starter) - focused on ERC20 airdrops but similar Merkle Tree validation logic
- Medium article on [Using Merkle Trees for NFT Whitelists](https://medium.com/@ItsCuzzo/using-merkle-trees-for-nft-whitelists-523b58ada3f9) by Alan, super helpful article to better understand Merkle Trees
- https://www.721.so/ - haven't personally tested it, but looks like another awesome resource
- Most of the front-end web3 tooling is built on top of [`web3-react`](https://github.com/NoahZinsmeister/web3-react) - check out this library if you're building your own web3 UIs
- Lots of inspiration taken from the [Crypto Coven contract](https://etherscan.io/address/0x5180db8f5c931aae63c74266b211f580155ecac8#contracts) as well - they used Merkle Trees for their community and gift mints


## Feedback
Have issues? Feel free to make an issue, open a pull request or reach out! If you end up using this or finding this helpful please let me know :) It'll make my day 🤩

## License
[GNU GENERAL PUBLIC LICENSE
](LICENSE)

## Disclaimer
I'm started my web3 dev journey in the last year and these smart contracts are not audited so use at your own risk. (if you notice anything though, please let me know!)
