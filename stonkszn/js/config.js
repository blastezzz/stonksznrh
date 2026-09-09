/* Stonk Season — shared site config (used by main.js and wallet.js) */
const CONFIG = {
  contractAddress: "CA SOON",
  buyLink: "[BUY LINK]",
  dexscreener: "https://dexscreener.com/robinhood",
};

/* Robinhood Chain — network the $STONKSZN token and tracked stonk tokens live on */
const ROBINHOOD_CHAIN = {
  chainId: "0x1237",
  chainIdDecimal: 4663,
  chainName: "Robinhood Chain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: ["https://rpc.mainnet.chain.robinhood.com"],
  blockExplorerUrls: ["https://robinhoodchain.blockscout.com"],
};
