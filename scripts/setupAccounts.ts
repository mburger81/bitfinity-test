/* eslint-disable no-console */
import Web3 from 'web3';
import THXCTokenAbi from '../abis/THXCToken.json';
import StakingAbi from '../abis/Staking.json';

const _rpcUrl = 'https://testnet.bitfinity.network';
const _thxctAddress = `0x6970852942517f40aa98867De9B3D61d830Efe1c`;
const _stakingAddress = `0x563725aa127e3BCe6959DBAd85e2dcE73Af5Cc95`;
const _privateKey = ``;

export const stake = async (web3: Web3) => {
  console.log('stake START');

  const stakingAddress = _stakingAddress;
  const stakeAmount = web3.utils.toWei('10', 'ether');
  console.log('stake 1');

  await approve(web3, stakingAddress, stakeAmount);
  console.log('stake 2');
  const stakingContract = new web3.eth.Contract(
    StakingAbi as [],
    stakingAddress
  );
  console.log('stake 3');
  const gas = await stakingContract.methods
    .stake(stakeAmount)
    .estimateGas({ from: web3.eth.defaultAccount });
  console.log('stake 4');
  const gasPrice = await web3.eth.getGasPrice();
  console.log('stake 5');
  await stakingContract.methods
    .stake(stakeAmount)
    .send({ from: web3.eth.defaultAccount, gas, gasPrice });
  console.log('stake END');
};
export const approve = async (web3: Web3, to: string, amount: string) => {
  console.log('approve START');
  const thxctContract = new web3.eth.Contract(THXCTokenAbi as [], _thxctAddress);
  console.log('approve 1');
  const gas = await thxctContract.methods
    .approve(to, amount)
    .estimateGas({ from: web3.eth.defaultAccount });
  console.log('approve 2');
  const gasPrice = await web3.eth.getGasPrice();
  console.log('approve 3');
  try {
    await thxctContract.methods
      .approve(to, amount)
      .send({ from: web3.eth.defaultAccount, gas, gasPrice });
  } catch (err) {
    console.log('approve error');
    console.log(err);
  }
  console.log('approve END');
};

async function main() {
  console.log('main START');
  const web3 = new Web3(_rpcUrl);
  console.log('main 1');
  const jobRequester = web3.eth.accounts.privateKeyToAccount(_privateKey);
  console.log('main 2');
  console.log(jobRequester.address);
  web3.eth.accounts.wallet.add(_privateKey);
  web3.eth.defaultAccount = jobRequester.address;
  console.log('main 3');
  await stake(web3);
  console.log('main END');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
