import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import { Container, Form, Segment, Header, Button } from 'semantic-ui-react';

const Padded = styled.div`padding: 1em;`;

let i = [
  {
    key: 1,
    text: 'dsdfsd',
    value: 'male'
  }
];

const Transaction = () => (
  <Padded>
    <Container text>
      <Segment>
        <Header block as="h2" icon="usd" content="Transaction" />
        <Form>
          <Field name="name" label="Name" component={Form.Input} />
          <Field name="memo" label="Memo" component={Form.Input} />
          <Form.Group widths="equal">
            <Field
              name="amount"
              label="Amount"
              type="number"
              component={Form.Input}
            />
            <Field
              name="currency"
              label="Currency"
              component={Form.Select}
              options={[
                {
                  key: 1,
                  text: 'dsdfsd',
                  value: 'male'
                }
              ]}
            />
          </Form.Group>
          <Field
            name="grouping"
            label="Grouping"
            component={Form.Select}
            options={i}
          />
          <Field
            name="budget"
            label="Budget"
            component={Form.Select}
            options={i}
          />
          <Field
            name="equity"
            label="Equity"
            component={Form.Select}
            options={i}
          />
          <Form.Field
            control={() => (
              <Button type="submit" fluid>
                Submit
              </Button>
            )}
          />
        </Form>
      </Segment>
    </Container>
  </Padded>
);

Transaction.propTypes = {};

export default Transaction;
