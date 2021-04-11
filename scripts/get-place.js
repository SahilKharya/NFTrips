const NFTrip = artifacts.require('NFTrip')

module.exports = async callback => {
    const nftrip = await NFTrip.deployed()
    console.log('Let\'s get the overview of your character')
    const overview = await nftrip.characters(0)
    console.log(overview)
    callback(overview.tx)
}