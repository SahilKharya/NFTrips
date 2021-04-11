// const Web3 = require('web3');

// web3 provider with fallback for old version
window.addEventListener('load', async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    // try {
      ethereum.request({ method: 'eth_requestAccounts' })
      console.log(ethereum)
      console.log(window.ethereum)
  }
  // Old web3 provider
  else if (window.web3) {
    const web3 = window.web3
    console.log('Old web3');

  }
  // No web3 provider
  else {
    console.log('No web3 provider detected');
  }
  //Fetch Ethereum Price 
  const RinkebyWeb3 = new Web3("https://rinkeby.infura.io/v3/0d049c57c34c4708a2f219c8eb335127");
  const aggregatorV3InterfaceABI = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
  const addr = "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e";
  const priceFeed = new RinkebyWeb3.eth.Contract(aggregatorV3InterfaceABI, addr);
  priceFeed.methods.latestRoundData().call()
      .then((roundData) => {
          // Do something with roundData
          console.log("Latest Round Data", roundData)
      document.getElementById("eth_inr").innerHTML = (roundData.answer/100000000);
      });
  
  //run the plugin
});
console.log(window.web3)
// let contractAddress = "0x11De606817a302A0031B41eDc4Eb636930dBD204"
let contractAddress = "0x4BB265a2b5BBfa75AB67d3128E845e2ED383629f"



var contractAbi = web3.eth.contract([
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "bookedBeds",
    "outputs": [
      {
        "name": "bedId",
        "type": "uint256"
      },
      {
        "name": "hospitalId",
        "type": "uint256"
      },
      {
        "name": "name",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "hospitalId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "city",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "noOfBeds",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "isPrivate",
        "type": "bool"
      }
    ],
    "name": "NewHospital",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "bedId",
        "type": "uint256"
      }
    ],
    "name": "NewBedBooking",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_key",
        "type": "uint256"
      }
    ],
    "name": "hospitalInfo",
    "outputs": [
      {
        "components": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "city",
            "type": "string"
          },
          {
            "name": "noOfBeds",
            "type": "uint256"
          },
          {
            "name": "isPrivate",
            "type": "bool"
          },
          {
            "name": "bedPrice",
            "type": "uint256"
          },
          {
            "name": "bedAvailable",
            "type": "uint256"
          }
        ],
        "name": "",
        "type": "tuple"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_name",
        "type": "string"
      },
      {
        "name": "_city",
        "type": "string"
      },
      {
        "name": "_noOfBeds",
        "type": "uint256"
      },
      {
        "name": "_isPrivate",
        "type": "bool"
      },
      {
        "name": "_bedPrice",
        "type": "uint256"
      }
    ],
    "name": "_addHospital",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_hospitalId",
        "type": "uint256"
      }
    ],
    "name": "_bookOneBed",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_hospitalId",
        "type": "uint256"
      },
      {
        "name": "_bedId",
        "type": "uint256"
      }
    ],
    "name": "_freeBed",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]);

// let contract = web3.eth.contract(abi, contractAddress);
var contract = contractAbi.at(contractAddress);

// contractAddress and abi are setted after contract deploy
// var contractAddress = '0x11De606817a302A0031B41eDc4Eb636930dBD204';
// var abi2 = JSON.parse( '[{"constant":true,"inputs":[],"name":"getInfo","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_info","type":"string"}],"name":"setInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]' );
//contract instance
// contract = new web3.eth.Contract(abi, contractAddress);

// Accounts
var account;

web3.eth.getAccounts(function (err, accounts) {
  if (err != null) {
    alert("Error retrieving accounts.");
    return;
  }
  if (accounts.length == 0) {
    alert("No account found! Make sure the Ethereum client is configured properly.");
    return;
  }
  account = accounts[0];
  console.log('Account: ' + account);
  web3.eth.defaultAccount = account;
});

//Smart contract functions
function registerSetInfo() {
  info = $("#newInfo").val();
  contract.methods.setInfo(info).send({ from: account }).then(function (tx) {
    console.log("Transaction: ", tx);
  });
  $("#newInfo").val('');
}

function getHospitalInfo() {
  // contract.hospitals[0].call({}, function (error, result) {
  //   if (!error)
  //     console.log(result);
  //   else
  //     console.log(error.code)
  // })
  hospitalID = document.getElementById('hospitalID').value;

  contract.hospitalInfo.call(hospitalID, function (err, result) {
    // if (!err) {
    //   alert(result)
    // }
    if (!err)
      console.log(result);
    else
      console.log(err.code)
  });
  // contract.MY_READ_ONLY_METHOD().call({}).then((res) => {
  //   console.log(res)
  // }).catch((e, r) => {
  //   console.log(JSON.stringify(e, Object.getOwnPropertyNames(e)))
  // })

}
function addHospitalInfo() {
  name = document.getElementById('name').value;
  city = document.getElementById('city').value;
  beds = document.getElementById('beds').value;
  gov = document.getElementById('gov').value;
  price = document.getElementById('price').value;

  contract._addHospital.sendTransaction(name, city, beds, gov, price, {
    from: account,
    gas: 100000
  }, function (error, result) {
    if (!error)
      console.log(result);
    else
      console.log(error.code)
  })
}

function bookBed() {
  bookBedID = document.getElementById('bookBedID').value;
  contract._addHospital.sendTransaction(bookBedID, {
    from: account,
    gas: 100000
  }, function (error, result) {
    if (!error)
      console.log(result);
    else
      console.log(error.code)
  })
}