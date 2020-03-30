import web3 from './web3';
import ContractDeployer from './build/ContractDeployer.json';

const instance = new web3.eth.Contract(
  JSON.parse(ContractDeployer.interface),
  '0x992Ac7062c0db547D0F76fdfaEA8fe5a356D5a4a'
);
export default instance;
