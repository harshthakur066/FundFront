import React, { useEffect } from "react";
import factory from "../ethereum/factory";

function CampaignIndex() {
  const getCampaignsList = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    console.log(campaigns);
  };
  useEffect(() => {
    getCampaignsList();
  }, []);
  return <div>Campaign</div>;
}

export default CampaignIndex;
