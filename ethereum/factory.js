import web3 from './web3';
import ContractDeployer from './build/ContractDeployer.json';
const instance = new web3.eth.Contract(
  JSON.parse(ContractDeployer.interface),
  '0x8f755c1B405510a494F35A6407986314FfcBed76'
);
export default instance;
