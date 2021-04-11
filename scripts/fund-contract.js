const NFTrip = artifacts.require('NFTrip')
const LinkTokenInterface = artifacts.require('LinkTokenInterface')

/*
  This script is meant to assist with funding the requesting
  contract with LINK. It will send 1 LINK to the requesting
  contract for ease-of-use. Any extra LINK present on the contract
  can be retrieved by calling the withdrawLink() function.
*/

const payment = process.env.TRUFFLE_CL_BOX_PAYMENT || '1000000000000000000'

module.exports = async callback => {
    try {
        const nFTrip = await NFTrip.deployed()
        const tokenAddress = await nFTrip.LinkToken()
        const token = await LinkTokenInterface.at(tokenAddress)
        console.log('Funding contract:', nFTrip.address)
        const tx = await token.transfer(nFTrip.address, payment)
        callback(tx.tx)
    } catch (err) {
        callback(err)
    }
}
