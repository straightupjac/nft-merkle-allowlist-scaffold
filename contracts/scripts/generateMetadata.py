import json

baseURI = "https://gateway.pinata.cloud/ipfs/QmcuDmd571ntKgW1qnMVrD6LwX1MoR9dYSFeH3nMnLbxco/"

def generateMetadata(jsonFolderPath):
    # gift
    for idx in range(1, 25):
      data = {}
      data['name'] = "giftNFT #" + str(idx)
      data['image'] = baseURI + "some.svg"
      data['description'] = "Describe your NFT"
      with open(jsonFolderPath+ str(idx) +'.json', 'w+', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))

    # whitelist
    for idx in range(26, 1000):
      data = {}
      data['name'] = "whitelist #" + str(idx)
      data['image'] = baseURI + "some.svg"
      data['description'] = "Describe your NFT"
      with open(jsonFolderPath+ str(idx) +'.json', 'w+', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))

    # public
    for idx in range(1001, 6000):
      data = {}
      data['name'] = "public mint #" + str(idx)
      data['image'] = baseURI + "some.svg"
      data['description'] = "Describe your NFT"
      with open(jsonFolderPath+ str(idx) +'.json', 'w+', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))

filepath = "metadata/generated/"
generateMetadata(filepath)