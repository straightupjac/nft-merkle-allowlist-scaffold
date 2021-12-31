# 🖌️ NFT Minter
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). MUI5 boilerplate from [nextjs-mui5](https://github.com/straightupjac/nextjs-mui5)

Deployed to [nextjs-mui5.vercel.app](https://nextjs-mui5.vercel.app/)

## Prerequisites
1. Have access to a deployed ERC721 smart contract and its contract abi information. Head over to [`/contracts`](/contracts) if you don't have one set up.
2. Have an infura account set-up (the free one works!)

Make a copy of `.sample-env` and fill it out.
- `NEXT_PUBLIC_NFT_ADDRESS` is the address of your deployed ERC721 smart contract
- `NEXT_PUBLIC_ENVIRONMENT` is set to development for the purposes of testing
## Dependencies
Make sure to install all the dependencies. These ones sometimes require you to explicitly install them.
```
 yarn add cors
 yarn add express-redis-cache
 yarn add merkletreejs
 yarn add keccak256
 yarn add @web3-react/core
 yarn add @web3-react/injected-connector
 yarn add @web3-react/walletconnect-connector
 yarn add @web3-react/walletlink-connector
 yarn add styled-components
```

## Set up Contract ABI
In `web/data/` you should have a file containing your deployed ERC721 contract's ABI. You can replace `SampleNFT.json` with the abi in the following format:
```json
{
  "abi": {...}
}
```
If you followed the steps in [`contracts`](/contracts), you will have a `SampleNFT.json` (or whatever your NFT contract is named) in the [`contracts/artifacts/contracts`](/contracts/artifacts/contracts) directory. Copy and paste that entire file into `web/data`.

If you changed the name of your NFT contract, make sure you update the paths in [`web/pages/utils/_web3.js`](/web/pages/utils/_web3.js).

## Set up your whitelists
In order for your merkle proofs to work properly, you have to keep `web/data/giftlist.json` and `web/data/whitelist.json` up to date with the merkle roots set in the smart contract. The easiest way to do this is to keep the front-end whitelists the same as in the `contract/whitelist` directory and run the respective set whitelists scripts whenever you make changes to the whitelists.

The following api endpoints generate the merkle proofs for giftlist and whitelist:
- `/api/giftProof?address=[ACCOUNT]`
- `/api/whitelistProof?address=[ACCOUNT]`

## Viewing NFTs
This scaffold makes use of the Opensea API to pull NFT token data in the `Your Wallet` page. Sometimes the Opensea API gets rate-limited or stops working for short periods of time.

## Getting Started with Next.js
Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the pages by modifying anything in `pages/*` and `components/*`. The pages will auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Further Next.js Resources

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/).