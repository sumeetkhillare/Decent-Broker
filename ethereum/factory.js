import web3 from './web3';
import ContractDeployer from './build/ContractDeployer.json';

const instance = new web3.eth.Contract(
  JSON.parse(ContractDeployer.interface),
  '0xcb04a10eEc1c8778a024E773DcA97B60110b8B1E'
);

export default instance;
