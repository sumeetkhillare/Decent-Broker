const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3  = require('web3');
const compiledFactory = require('./build/ContractDeployer.json');

const provider = new HDWalletProvider(
  'gate enact liberty crater piano cost title bunker cash visit iron critic',
  'https://rinkeby.infura.io/v3/0a5866cdc4fb48d8808e336cd05a68ff'

);
const web3 = new Web3(provider);

const deploy = async()=>{
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from ',accounts[0]);
  const result = await new web3.eth.Contract(
  JSON.parse(compiledFactory.interface))
  .deploy({data : compiledFactory.bytecode})
  .send({gas: '1000000',from : accounts[0]});

  console.log('contract deployed to ',result.options.address);
};
deploy();
