import web3 from './web3';
import ContractDeployer from './build/ContractDeployer.json';
const instance = new web3.eth.Contract(
  JSON.parse(ContractDeployer.interface),
  '0xC18Dc6cB428eCAeF2550AA1f109C09D238208f77'
);
export default instance;
