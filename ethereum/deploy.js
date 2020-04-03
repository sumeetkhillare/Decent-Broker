const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3  = require('web3');
const compiledContract = require('./build/ContractDeployer.json');

const provider = new HDWalletProvider(
  'enlist seven lava rough burger maze trumpet series cream equip top state',
  'https://rinkeby.infura.io/v3/9bf8842ccc2c40ad8686e700e0233caf'
);
const web3 = new Web3(provider);
const deploy = async ()=>{
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from ',accounts[0]);
  const result = await new web3.eth.Contract(
  JSON.parse(compiledContract.interface))
  .deploy({data : compiledContract.bytecode})
  .send({gas: '4000000',from : accounts[0]});

  console.log('contract deployed to ',result.options.address);
};
deploy();
