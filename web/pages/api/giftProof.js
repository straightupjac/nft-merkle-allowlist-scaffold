import cors from 'cors';
import cache from 'express-redis-cache';

const c = cache();

const run = (req, res) => (fn) => new Promise((resolve, reject) => {
  fn(req, res, (result) =>
      result instanceof Error ? reject(result) : resolve(result)
  )
})

const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
let giftList = require('../../data/giftlist.json');
const hashedAddresses = giftList.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(hashedAddresses, keccak256, { sortPairs: true });


const handler = async (req, res) => {
  const middleware = run(req, res);
  await middleware(cors());
  await middleware(c.route());

  /** validate req type **/
  if (req.method !== 'GET') {
    res.status(400).json({});
    return;
  }

  const address = req.query.address;
  if (!address) {
    res.status(400).json({ msg: "address is required"});
    return;
  }

  const hashedAddress = keccak256(address);
  const proof = merkleTree.getHexProof(hashedAddress);
  const root = merkleTree.getHexRoot();

  // just for front-end display convenience
  // proof will be validated in smart contract as well
  const valid = merkleTree.verify(proof, hashedAddress, root);

  res.status(200).json({
    proof,
    valid,
  });
}

export default handler
