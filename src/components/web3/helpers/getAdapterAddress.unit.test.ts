import {DAO_REGISTRY_CONTRACT_ADDRESS, DEFAULT_CHAIN} from '../../../config';
import {getWeb3Instance} from '../../../test/helpers';
import {ContractAdapterNames} from '../types';
import {getAdapterAddress} from '.';
import DaoRegistry from '../../../truffle-contracts/DaoRegistry.json';

describe('getAdapterAddress unit tests', () => {
  test('should return correct address', async () => {
    const {web3, mockWeb3Provider} = getWeb3Instance();
    const contractAddress = DAO_REGISTRY_CONTRACT_ADDRESS[DEFAULT_CHAIN];
    const instance = new web3.eth.Contract(
      (DaoRegistry as Record<string, any>).abi,
      contractAddress
    );

    const result: [string] = [
      web3.eth.abi.encodeParameter(
        'bytes32',
        '0x000000000000000000000000000000000000000'
      ),
    ];

    // Inject Web3 result for `getAdapterAddress.call()`
    mockWeb3Provider.injectResult(...result);

    const address = await getAdapterAddress(
      ContractAdapterNames.onboarding,
      instance
    );

    expect(address).toBe('0x0000000000000000000000000000000000000000');
  });

  test('should throw if no contract instance provided', async () => {
    let capturedError: string = '';

    try {
      await getAdapterAddress(ContractAdapterNames.onboarding, undefined);
    } catch (error) {
      capturedError = error.message;
    }

    expect(capturedError).toBe('No DaoRegistry contract instance provided.');
  });
});
