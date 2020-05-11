import React from "react";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import { Link } from "../../../routes";
import { Button } from "semantic-ui-react";

const RequestIndex = ({ address }) => {
  return (
    <Layout>
      <h2>Pending Requests</h2>
      <Link route={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary>View Requests</Button>
        </a>
      </Link>
    </Layout>
  );
};

RequestIndex.getInitialProps = async ({ query }) => {
  const { address } = query;
  return { address };
};

export default RequestIndex;
