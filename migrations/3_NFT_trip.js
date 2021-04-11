const NFTrip = artifacts.require('NFTrip')
const RINKEBY_VRF_COORDINATOR = '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B';
const RINKEBY_LINKTOKEN = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709'
const RINKEBY_KEYHASH= '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311';

module.exports = async (deployer, network, [defaultAccount]) => {
    // Local (development) networks need their own deployment of the LINK
    // token and the Oracle contract
    if (network.startsWith('rinkeby')) {
        await deployer.deploy(NFTrip, RINKEBY_VRF_COORDINATOR, RINKEBY_LINKTOKEN, RINKEBY_KEYHASH)
        let myt = await NFTrip.deployed()
      // } else if (network.startsWith('mainnet')) {
      //   console.log("If you're interested in early access to Chainlink VRF on mainnet, please email vrf@chain.link")
      } else {
        console.log("Right now only rinkeby works! Please change your network to Rinkeby")
        // await deployer.deploy(NFTrip)
        // let dnd = await NFTrip.deployed()
      }
    
}
