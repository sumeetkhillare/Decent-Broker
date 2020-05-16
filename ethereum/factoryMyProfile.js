import MyProfileContractDeployer from './build/DeployMyProfile.json';
import web3 from './web3';
const instance = new web3.eth.Contract(
  JSON.parse(MyProfileContractDeployer.interface),
  '0x88b6E3335833CE94E632e3Ed0979b531D3a26c50'
);
export default instance;
