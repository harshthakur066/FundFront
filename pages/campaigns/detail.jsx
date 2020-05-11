import React from "react";
import { Card, Grid, GridColumn, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

const CampaignDetail = ({
  address,
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  manager,
}) => {
  const renderCards = () => {
    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver",
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract. Requests must be approved by approvers",
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to this campaign",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money this campaign has left to spend.",
      },
    ];

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <h2>Campaign Details</h2>
      <Grid>
        <Grid.Column width={10}>
          {renderCards()}
          <Link route={`/campaigns/${address}/requests`}>
            <a>
              <Button primary style={{ marginTop: 20 }}>
                View Requests
              </Button>
            </a>
          </Link>
        </Grid.Column>
        <Grid.Column width={6}>
          <ContributeForm address={address} />
        </Grid.Column>
      </Grid>
    </Layout>
  );
};

CampaignDetail.getInitialProps = async ({ query }) => {
  const campaign = Campaign(query.address);
  const summary = await campaign.methods.getSummary().call();
  //   console.log(summary); //returns a result oject with keys in n. 0,1,2...
  return {
    address: query.address,
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };
};

export default CampaignDetail;
