import web3 from './web3';
import ContractDeployer from './build/ContractDeployer.json';

const instance = new web3.eth.Contract(
  JSON.parse(ContractDeployer.interface),
  '0x4811FC8B9f7C774Da75f29B17F3b67d460a5b831'
);

export default instance;
