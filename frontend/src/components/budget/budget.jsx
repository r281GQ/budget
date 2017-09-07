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

const Budget = () => (
  <Padded>
    <Container text>
      <Segment>
        <Header block as="h2" icon="checked calendar" content="Budget" />
        <Form >
          <Field name="name" label="Name" component={Form.Input} />
          <Form.Group widths="equal">
            <Field
              name="defaultAllowance"
              label="Default allowance"
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
        </Form>
      </Segment>
    </Container>
  </Padded>
);

Budget.propTypes = {};

export default Budget;
