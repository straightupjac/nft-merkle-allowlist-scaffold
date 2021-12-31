/*
..........................................................................................................................................................
...........................................................................................................................................ffff...........
.................................................................................lllll..................................................fffffff...........
.................................................................................lllll.................................................ffffffff..ttttt....
.................................................................................lllll.................................................ffffffff..ttttt....
.................................................................................lllll.................................................ffffffff..ttttt....
.................................................................................lllll.................................................fffff.....ttttt....
.....ssssssss.........aaaaaaaa.....mmmmmm.mmmmmm...mmmmmm.....ppppp.ppppppp......lllll......eeeeeeee................nnnnn.nnnnnnn...nffffffffffttttttttt..
...ssssssssssss.....aaaaaaaaaaaa...mmmmmmmmmmmmmm.mmmmmmmm....pppppppppppppp.....lllll.....eeeeeeeeeee..............nnnnnnnnnnnnnn..nffffffffffttttttttt..
...sssssssssssss...aaaaaaaaaaaaaa..mmmmmmmmmmmmmmmmmmmmmmmm...ppppppppppppppp....lllll....eeeeeeeeeeeee.............nnnnnnnnnnnnnnn.nffffffffffttttttttt..
..ssssssssssssss...aaaaaaaaaaaaaa..mmmmmmmmmmmmmmmmmmmmmmmm...pppppppppppppppp...lllll...eeeeeeeeeeeeee.............nnnnnnnnnnnnnnn.nffffffffffttttttttt..
..sssssss.sssssss..aaaaaaaaaaaaaa..mmmmmmmmmmmmmmmmmmmmmmmmm..pppppppppppppppp...lllll..eeeeeeeeeeeeeee.............nnnnnnnnnnnnnnn..ffffffffffttttttttt..
..ssssss...ssssss.aaaaaa....aaaaa..mmmmmmm..mmmmmmm...mmmmmm..ppppppp...ppppppp..lllll..eeeeee....eeeeee............nnnnnn...nnnnnnn...fffff.....ttttt....
..ssssssssss.......aaaaa.aaaaaaaa..mmmmmm....mmmmmm...mmmmmm..pppppp.....pppppp..lllll..eeeeee....eeeeee.---------..nnnnnn....nnnnnn...fffff.....ttttt....
..sssssssssssss......aaaaaaaaaaaa..mmmmmm....mmmmm....mmmmmm..pppppp.....pppppp..lllll..eeeeeeeeeeeeeeee.---------..nnnnnn....nnnnnn...fffff.....ttttt....
..ssssssssssssss...aaaaaaaaaaaaaa..mmmmmm....mmmmm....mmmmmm..pppppp.....pppppp..lllll..eeeeeeeeeeeeeeee.---------..nnnnn.....nnnnnn...fffff.....ttttt....
...ssssssssssssss..aaaaaaaaaaaaaa..mmmmmm....mmmmm....mmmmmm..pppppp.....pppppp..lllll..eeeeeeeeeeeeeeee.---------..nnnnn.....nnnnnn...fffff.....ttttt....
.....ssssssssssss.aaaaaaaaa.aaaaa..mmmmmm....mmmmm....mmmmmm..pppppp.....pppppp..lllll..eeeeeeeeeeeeeeee.---------..nnnnn.....nnnnnn...fffff.....ttttt....
.ssssss..ssssssss.aaaaaa....aaaaa..mmmmmm....mmmmm....mmmmmm..pppppp.....pppppp..lllll..eeeeee.....eeeee............nnnnn.....nnnnnn...fffff.....ttttt....
.ssssss....ssssss.aaaaaa...aaaaaa..mmmmmm....mmmmm....mmmmmm..ppppppp...pppppp...lllll..eeeeeee...eeeeee............nnnnn.....nnnnnn...fffff.....ttttt....
..sssssssssssssss.aaaaaaaaaaaaaaa..mmmmmm....mmmmm....mmmmmm..pppppppppppppppp...lllll..eeeeeeeeeeeeeeee............nnnnn.....nnnnnn...fffff.....ttttttt..
..sssssssssssssss.aaaaaaaaaaaaaaa..mmmmmm....mmmmm....mmmmmm..pppppppppppppppp...lllll...eeeeeeeeeeeeee.............nnnnn.....nnnnnn...fffff.....ttttttt..
..ssssssssssssss...aaaaaaaaaaaaaaa.mmmmmm....mmmmm....mmmmmm..ppppppppppppppp....lllll....eeeeeeeeeeeee.............nnnnn.....nnnnnn...fffff.....ttttttt..
...ssssssssssss....aaaaaaaaaaaaaaa.mmmmmm....mmmmm....mmmmmm..pppppppppppppp.....lllll.....eeeeeeeeee...............nnnnn.....nnnnnn...fffff.....ttttttt..
.....ssssssss........aaaaa....................................pppppp.ppppp...................eeeeeee...............................................ttttt..
..............................................................pppppp......................................................................................
..............................................................pppppp......................................................................................
..............................................................pppppp......................................................................................
..............................................................pppppp......................................................................................
..............................................................pppppp......................................................................................
..............................................................pppppp......................................................................................
//..........................................................................................................................................................
*/
// SPDX-License-Identifier: MIT
// Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";


contract SampleNFT is ERC721URIStorage, Ownable, ReentrancyGuard{
    string private _collectionURI;
    string public baseURI;

    /**
      * team mint are from 1-25 (25 max supply)
      * whitelist are from 26-1000 (975 max supply)
      * public mint from 1001 - 6000 (5000 max supply)
    **/

    uint256 immutable public maxGiftMintId = 25;
    uint256 public giftMintId = 1;

    uint256 immutable public maxWhitelistId = 1000;
    uint256 public whitelistId = 6;
    uint256 public constant WHITELIST_SALE_PRICE = 0.01 ether;

    uint256 immutable public maxPublicMint = 6000;
    uint256 public publicMintId = 1001;
    uint256 public constant PUBLIC_SALE_PRICE = 0.02 ether;

    // used to validate whitelists
    bytes32 public giftMerkleRoot;
    bytes32 public whitelistMerkleRoot;

    // keep track of those on whitelist who have claimed their NFT
    mapping(address => bool) public claimed;

    constructor(string memory _baseURI, string memory collectionURI) ERC721("Sample NFT", "NFT") {
        setBaseURI(_baseURI);
        setCollectionURI(collectionURI);
    }

    /**
     * @dev validates merkleProof
     */
    modifier isValidMerkleProof(bytes32[] calldata merkleProof, bytes32 root) {
        require(
            MerkleProof.verify(
                merkleProof,
                root,
                keccak256(abi.encodePacked(msg.sender))
            ),
            "Address does not exist in list"
        );
        _;
    }

    modifier isCorrectPayment(uint256 price, uint256 numberOfTokens) {
        require(
            price * numberOfTokens == msg.value,
            "Incorrect ETH value sent"
        );
        _;
    }

    modifier canMint(uint256 numberOfTokens) {
        require(
            publicMintId + numberOfTokens <= maxPublicMint,
            "Not enough tokens remaining to mint"
        );
        _;
    }

    // ============ PUBLIC FUNCTIONS FOR MINTING ============

    /**
    * @dev mints 1 token per whitelisted gift address, does not charge a fee
    * Max supply: 25 (token ids: 1-25)
    */
    function mintGift(
        bytes32[] calldata merkleProof
    )
        public
        isValidMerkleProof(merkleProof, giftMerkleRoot)
        nonReentrant
    {
      require(giftMintId <= maxGiftMintId);
      require(!claimed[msg.sender], "NFT is already claimed by this wallet");
      _mint(msg.sender, giftMintId);
      giftMintId++;
    }

    /**
    * @dev mints 1 token per whitelisted address, does not charge a fee
    * Max supply: 975 (token ids: 26-1000)
    * charges a fee
    */
    function mintWhitelist(
      bytes32[] calldata merkleProof
    )
        public
        payable
        isValidMerkleProof(merkleProof, whitelistMerkleRoot)
        isCorrectPayment(WHITELIST_SALE_PRICE, 1)
        nonReentrant
    {
        require(whitelistId <= maxWhitelistId, "minted the maximum # of whitelist tokens");
        require(!claimed[msg.sender], "NFT is already claimed by this wallet");
        _mint(msg.sender, whitelistId);
        whitelistId++;
        claimed[msg.sender] = true;
    }

    /**
    * @dev mints specified # of tokens to sender address
    * max supply 5000, no limit on # of tokens
    */
    function publicMint(
      uint256 numberOfTokens
    )
        public
        payable
        isCorrectPayment(PUBLIC_SALE_PRICE, numberOfTokens)
        canMint(numberOfTokens)
        nonReentrant
    {
        for (uint256 i = 0; i < numberOfTokens; i++) {
            _mint(msg.sender, publicMintId);
            publicMintId++;
        }
    }

    // ============ PUBLIC READ-ONLY FUNCTIONS ============
    function tokenURI(uint256 tokenId)
      public
      view
      virtual
      override
      returns (string memory)
    {
      require(_exists(tokenId), "ERC721Metadata: query for nonexistent token");
      return string(abi.encodePacked(baseURI, Strings.toString(tokenId), ".json"));
    }

    /**
    * @dev collection URI for marketplace display
    */
    function contractURI() public view returns (string memory) {
        return _collectionURI;
    }


    // ============ OWNER-ONLY ADMIN FUNCTIONS ============
    function setBaseURI(string memory _baseURI) public onlyOwner {
      baseURI = _baseURI;
    }

    /**
    * @dev set collection URI for marketplace display
    */
    function setCollectionURI(string memory collectionURI) internal virtual onlyOwner {
        _collectionURI = collectionURI;
    }

    function setGiftMerkleRoot(bytes32 merkleRoot) external onlyOwner {
        giftMerkleRoot = merkleRoot;
    }

    function setWhitelistMerkleRoot(bytes32 merkleRoot) external onlyOwner {
        whitelistMerkleRoot = merkleRoot;
    }

    /**
     * @dev withdraw funds for to specified account
     */
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function withdrawTokens(IERC20 token) public onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        token.transfer(msg.sender, balance);
    }
}
