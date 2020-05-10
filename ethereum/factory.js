import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instaance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x425ac00b6780E260437cAD4228788F4FcEB0cBD4"
);

export default instaance;
