import web3 from './web3';
import ContractDeployer from './build/ContractDeployer.json';

const instance = new web3.eth.Contract(
  JSON.parse(ContractDeployer.interface),
  '0xfbD6099696F6f2E76F8CA2014143a8Cf9c224D8E'
);
export default instance;
