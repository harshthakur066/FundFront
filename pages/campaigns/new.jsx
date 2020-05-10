import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Input, Message } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory";
import { Router } from "../../routes";

const CampaignNew = () => {
  const [value, setValue] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setErr("");
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(value).send({ from: accounts[0] });

      Router.pushRoute("/");
    } catch (e) {
      setErr(e);
    }
    setLoading(false);
  };
  return (
    <Layout>
      <h2>Create a Campaign</h2>

      <Form onSubmit={onSubmit} error={!!err}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label="wei"
            labelPosition="right"
          />
        </Form.Field>
        <Message error header="Oops!" content="err" content={err.message} />
        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
