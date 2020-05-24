import MyProfileContractDeployer from './build/DeployMyProfile.json';
import web3 from './web3';
const instance = new web3.eth.Contract(
  JSON.parse(MyProfileContractDeployer.interface),
  '0x6F1CC5E70B12FFC78071E77276633ccA7FFD55Ad'
);
export default instance;
