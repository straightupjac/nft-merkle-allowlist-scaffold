const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

const generateGiftRoot = () => {
  const giftAddr = require('../whitelist/giftlist.json');
  const giftLeafNodes = giftAddr.map((addr) => keccak256(addr));
  const giftMerkleTree = new MerkleTree(giftLeafNodes, keccak256, { sortPairs: true });
  const giftRootHash = giftMerkleTree.getHexRoot();
  console.log('giftRootHash', giftRootHash.toString('hex'));
  return giftRootHash;
}

const generateWhitelistRoot = () => {
  const whitelistAddr = require('../whitelist/whitelist.json');
  const whitelistLeafNodes = whitelistAddr.map((addr) => keccak256(addr));
  const whitelistMerkleTree = new MerkleTree(whitelistLeafNodes, keccak256, { sortPairs: true });
  const whitelistRootHash = whitelistMerkleTree.getHexRoot();

  console.log('whitelistRootHash', whitelistRootHash);
  return whitelistRootHash;
};

module.exports = { generateGiftRoot, generateWhitelistRoot };

generateGiftRoot()
generateWhitelistRoot()