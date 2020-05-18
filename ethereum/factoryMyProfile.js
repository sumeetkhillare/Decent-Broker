import MyProfileContractDeployer from './build/DeployMyProfile.json';
import web3 from './web3';
const instance = new web3.eth.Contract(
  JSON.parse(MyProfileContractDeployer.interface),
  '0x9472792Fe6970835761f30a985fF1299Db0042D4'
);
export default instance;
