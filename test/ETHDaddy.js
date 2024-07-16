const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("ETHDaddy", () => {

  let ethDeploy; 

  const NAME = "ETH Daddy"
  const SYMBOL = "ETHD"

  beforeEach( async () => {
    const signers = await ethers.getSigners()

    const ETHDaddy = await ethers.getContractFactory('ETHDaddy')
    ethDeploy = await ETHDaddy.deploy('ETH Daddy', 'ETHD')
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
  })

})
