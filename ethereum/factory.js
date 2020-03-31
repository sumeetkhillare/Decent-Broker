import web3 from './web3';
import ContractDeployer from './build/ContractDeployer.json';

const instance = new web3.eth.Contract(
  JSON.parse(ContractDeployer.interface),
  '0xEA0dac395ED5743e11D694F4c8aBEe2d6E32d4e6'
);

export default instance;