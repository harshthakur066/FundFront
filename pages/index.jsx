import React, { useState } from "react";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";

const CampaignIndex = ({ campaigns }) => {
  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return items.length ? (
      <Card.Group items={items} />
    ) : (
      <h3 style={{ marginTop: 40 }}>No campaigns yet...</h3>
    );
  };

  return (
    <Layout>
      <h2>Open Campaigns</h2>
      <Link route="campaigns/new">
        <a>
          <Button
            floated="right"
            content="Create Campaign"
            icon="add"
            primary
          />
        </a>
      </Link>
      <div> {renderCampaigns()} </div>
    </Layout>
  );
};

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default CampaignIndex;
