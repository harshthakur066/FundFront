import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instaance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x8cb4aDACc453bD7C21C8D317d354961832DaF270"
);

export default instaance;
