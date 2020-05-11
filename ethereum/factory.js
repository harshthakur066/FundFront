import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instaance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x53C91a7eD0B0AE94DB81FF5AB298332D160cfD25"
);

export default instaance;
