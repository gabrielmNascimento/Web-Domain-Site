const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("ETHDaddy", () => {

  let ethDeploy; 
  let deployer, owner1;

  const NAME = "ETH Daddy"
  const SYMBOL = "ETHD"

  beforeEach( async () => {
    //Setup Accounts:
    [deployer, owner1] = await ethers.getSigners()

    //Deploy Contract:
    const ETHDaddy = await ethers.getContractFactory('ETHDaddy')
    ethDeploy = await ETHDaddy.deploy('ETH Daddy', 'ETHD')

    //List a domain:
    const transaction = await ethDeploy.connect(deployer).list("jack.eth", tokens(10))
    await transaction.wait()

  })

  describe("Deployment", () => {
    it('name test', async () => {
      const result = await ethDeploy.name()
      expect(result).to.equal(NAME)
    })

    it('symbol test', async () => {
      const result = await ethDeploy.symbol()
      expect(result).to.equal(SYMBOL)
    })

    it('owner', async () => {
      const result = await ethDeploy.owner()
      expect(result).to.equal(deployer.address)
    })

    it('max supply', async () => {
      const result = await ethDeploy.supply()
      expect(result).to.equal(1)
    })

  })
  
  describe("Domain", () => {
    it("Return domain attributes", async() => {
      let domain = await ethDeploy.getDomain(1);
      expect(domain.name).to.be.equal("jack.eth")
      expect(domain.price).to.be.equal(tokens(10))
      expect(domain.isOwned).to.be.equal(false)
    })
  })

  describe("Minting", () => {
    const ID = 1;
    const AMOUNT = ethers.utils.parseUnits("10", 'ether')

    beforeEach(async () => {
      const transaction = await ethDeploy.connect(owner1).mint(ID)
      await transaction.wait()
    })

    it("Updates the owner", async() => {
      const owner = await ethDeploy.ownerOf(ID)
      expect(owner).to.be.equal(owner1.address)
    })
  })

})
