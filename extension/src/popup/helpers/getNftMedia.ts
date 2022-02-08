export const getNftMedia = async (issuerAccount: string) => {
  try {
    const issuerAccountData = await fetch(
      `https://frontier.testnet.digitalbits.io/accounts/${issuerAccount}`,
    );
    const issuerAccountObject = await issuerAccountData.json();
    const IpfsCid = Buffer.from(
      issuerAccountObject.data.IPFS_NFT_1,
      "base64",
    ).toString();
    const ipfsMetadata = await (
      await fetch(`https://gateway.pinata.cloud/ipfs/${IpfsCid}/metadata.json`)
    ).json();
    const mediaName = ipfsMetadata.FileName;
    const ipfsMedia = `https://gateway.pinata.cloud/ipfs/${IpfsCid}/${mediaName}`;
    return ipfsMedia;
  } catch (error) {
    console.error(error);
    return "";
  }
};
