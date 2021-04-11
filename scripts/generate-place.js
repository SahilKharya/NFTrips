const NFTrip = artifacts.require('NFTrip')

module.exports = async callback => {
  const nftrip = await NFTrip.deployed()
  console.log('Creating requests on contract:', nftrip.address)
  const tx = await nftrip.requestNewRandomPlace(77, "The Taj Day")
  const tx2 = await nftrip.requestNewRandomPlace(7777777, "The Taj Night")
  const tx3 = await nftrip.requestNewRandomPlace(7, "The Taj Tea")
  const tx4 = await nftrip.requestNewRandomPlace(777, "The Taj Food")
  callback(tx.tx)
}