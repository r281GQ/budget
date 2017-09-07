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

const Grouping = () => (
  <Padded>
    <Container text>
      <Segment>
        <Header block as="h2" icon="id card" content="Grouping" />
        <Form>
          <Field name="name" label="Name" component={Form.Input} />
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

Grouping.propTypes = {};

export default Grouping;
