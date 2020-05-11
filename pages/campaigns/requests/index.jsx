import React from "react";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import { Link } from "../../../routes";
import { Button, Table } from "semantic-ui-react";
import RequestRow from "../../../components/RequestRow";

const RequestIndex = ({ address, requestsCount, requests, approversCount }) => {
  const renderRows = () => {
    return requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={address}
          approversCount={approversCount}
        />
      );
    });
  };

  const { Header, Row, HeaderCell, Body } = Table;

  return (
    <Layout>
      <h2>Open Requests</h2>
      <Link route={`/campaigns/${address}/requests/new`}>
        <a>
          <Button floated="right" primary style={{ marginBottom: 20 }}>
            Create Requests
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRows()}</Body>
      </Table>
      <h3> Found {requestsCount} request </h3>
    </Layout>
  );
};

RequestIndex.getInitialProps = async ({ query }) => {
  const campaign = Campaign(query.address);
  const requestsCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.getApproversCount().call();
  const requests = await Promise.all(
    Array(parseInt(requestsCount))
      .fill()
      .map((element, index) => {
        return campaign.methods.request(index).call();
      })
  );
  return {
    address: query.address,
    requestsCount,
    requests,
    approversCount,
  };
};

export default RequestIndex;
