import React, { useEffect } from "react";
import factory from "../ethereum/factory";

const CampaignIndex = ({ campaigns }) => {
  return (
    <div>
      <div>Campaigns:</div>
      <div>{campaigns[0]}</div>
    </div>
  );
};

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default CampaignIndex;
