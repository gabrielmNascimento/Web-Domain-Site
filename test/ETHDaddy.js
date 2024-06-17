const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("ETHDaddy", () => {

  it('name', async () => {
    const ETHDaddy = await ethers.getContractFactory('ETHDaddy')
    let ethDeploy = await ETHDaddy.deploy()
    const result = await ethDeploy.names
    expect(result).to.equal('ETH Daddy')
  })

})
