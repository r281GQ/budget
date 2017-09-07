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

const Account = ({ handleSubmit, createAccount }) => (
  <Padded>
    <Container text>
      <Segment>
        <Header block as="h2" icon="currency" content="Account" />
        <Form
          onSubmit={handleSubmit(formProps =>
            createAccount({ name: formProps.get('name')
          , initialBalance: formProps.get('initialBalance'), currency: formProps.get('currency')
         })
          )}
        >
          <Field name="name" label="Name" component={Form.Input} />
          <Form.Group widths="equal">
            <Field
              name="initialBalance"
              label="Initial balance"
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
                  text: 'GBP',
                  value: 'GBP'
                }
              ]}
            />
          </Form.Group>
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

Account.propTypes = {createAccount: PropTypes.func};

export default Account;
