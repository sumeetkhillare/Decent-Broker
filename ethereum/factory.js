import web3 from './web3';
import ContractDeployer from './build/ContractDeployer.json';
const instance = new web3.eth.Contract(
  JSON.parse(ContractDeployer.interface),
  '0xc1304f09beB383DD652208D02CAeB8BD9b4F463a'
);
export default instance;
