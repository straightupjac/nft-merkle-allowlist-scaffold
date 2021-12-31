import json

baseURI = "https://gateway.pinata.cloud/ipfs/QmNs9kNhW9CWjFWBsczd5yegvSHgYDB87q2iek6Fy26268/"

def generateMetadata(jsonFolderPath):
    # gift
    for idx in range(1, 25):
      data = {}
      data['name'] = "giftNFT #" + str(idx)
      data['image'] = baseURI
      data['description'] = "Describe your NFT. NFT mint with merkle whitelist scaffold"
      with open(jsonFolderPath+ str(idx) +'.json', 'w+', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))

    # whitelist
    for idx in range(26, 1000):
      data = {}
      data['name'] = "whitelist #" + str(idx-25)
      data['image'] = baseURI
      data['description'] = "Describe your NFT. NFT mint with merkle whitelist scaffold"
      with open(jsonFolderPath+ str(idx) +'.json', 'w+', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))

    # public
    for idx in range(1001, 6000):
      data = {}
      data['name'] = "public mint #" + str(idx-1000)
      data['image'] = baseURI
      data['description'] = "Describe your NFT. NFT mint with merkle whitelist scaffold"
      with open(jsonFolderPath+ str(idx) +'.json', 'w+', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))

filepath = "metadata/generated/"
generateMetadata(filepath)