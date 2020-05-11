import React, { useState } from "react";
import { Table, Button, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

const RequestRow = ({ id, request, address, approversCount }) => {
  const { Row, Cell } = Table;
  const { description, value, recipient, complete, approvalsCount } = request;

  const [loading, setLoading] = useState(false);
  const [loadingFinal, setLoadingFinal] = useState(false);

  const readyToFinalize = approvalsCount > approversCount / 2;

  const onApprove = async () => {
    const campaign = Campaign(address);
    try {
      setLoading(true);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(id).send({
        from: accounts[0],
      });
      Router.replace(`/campaigns/${address}/requests`);
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  };

  const onFinalize = async () => {
    const campaign = Campaign(address);
    try {
      setLoadingFinal(true);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(id).send({
        from: accounts[0],
      });
      Router.replace(`/campaigns/${address}/requests`);
    } catch (e) {
      console.log(e.message);
    }
    setLoadingFinal(false);
  };

  return (
    <Row disabled={complete} positive={readyToFinalize && !complete}>
      <Cell> {id} </Cell>
      <Cell> {description} </Cell>
      <Cell> {web3.utils.fromWei(value, "ether")} </Cell>
      <Cell> {recipient} </Cell>
      <Cell>
        {approvalsCount}/{approversCount}
      </Cell>

      <Cell>
        {complete ? null : (
          <Button color="green" loading={loading} inverted onClick={onApprove}>
            Approve
          </Button>
        )}
      </Cell>

      <Cell>
        {complete ? null : (
          <Button
            color="red"
            loading={loadingFinal}
            inverted
            onClick={onFinalize}
          >
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
};

export default RequestRow;
