import axios from "axios";

const chainIconMapping = {
  1907: `https://raw.githubusercontent.com/XDeFi-tech/evm_registry/main/assets/bitci_logo.png`,
  7000: `https://raw.githubusercontent.com/XDeFi-tech/evm_registry/main/assets/zetachain-icon%404x.png`,
};

export async function lambdaHandler(event, context) {
  const apiUrl = "https://chainid.network/chains.json";

  try {
    const apiResponse = await axios.get(apiUrl);
    let response = apiResponse.data;
    response = response.map((chain) => {
      if (chain.icon) {
        chain.icon = `https://icons.llamao.fi/icons/chains/rsz_${chain.icon}.jpg`;
      }
      if (chainIconMapping.hasOwnProperty(chain.chainId)) {
        chain.icon = chainIconMapping[chain.chainId];
      }
      return chain;
    });
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error("API call failed: ", error);
    throw new Error("API call failed");
  }
}
