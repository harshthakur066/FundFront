import React, { useState } from "react";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Router, Link } from "../../../routes";
import { Form, Input, Button, Message } from "semantic-ui-react";

const NewRequest = ({ address }) => {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(address);

    try {
      setLoading(true);
      setErrorMsg("");
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0],
          //   value: web3.utils.toWei(value, "ether"),
        });
      Router.replace(`/campaigns/${address}/requests`);
    } catch (err) {
      setErrorMsg(err.message);
    }
    setLoading(false);
    setDescription("");
    setValue("");
    setRecipient("");
  };

  return (
    <Layout>
      <Link route={`/campaigns/${address}/requests`}>
        <a>Back</a>
      </Link>
      <h2>Create a Request</h2>
      <Form onSubmit={onSubmit} error={!!errorMsg}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in ether</label>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content="err" content={errorMsg} />
        <Button loading={loading} primary style={{ marginTop: 20 }}>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

NewRequest.getInitialProps = async ({ query }) => {
  const { address } = query;
  return {
    address,
  };
};

export default NewRequest;
