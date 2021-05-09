export default class ContractUtil {
  /**
   * Display a contract address friendly with dots
   * Input: 0x3e53a972d62b19ad9e308bb0e4a4b1b78f163ccf
   * Returns: 0x3e53...3ccf
   */
  static displayContract(contractAddress: string): string {
    // Safe check
    if (contractAddress.length > 10) {
      return `${contractAddress.substring(0, 6)}...${contractAddress.slice(-4)}`;
    }
    return contractAddress;
  }
}
