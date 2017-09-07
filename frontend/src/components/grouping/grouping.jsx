import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import { Container, Form, Segment, Header, Button } from 'semantic-ui-react';

import DF from './custom_drop_down'

const Padded = styled.div`padding: 1em;`;

let i = [
  {
    key: 1,
    text: 'dsdfsd',
    value: 'male'
  }
];

const Grouping = ({handleSubmit, createGrouping}) => (
  <Padded>
    <Container text>
      <Segment>
        <Header block as="h2" icon="id card" content="Grouping" />
        <Form onSubmit = {handleSubmit(formProps => {
          console.log(formProps.toJS());
          createGrouping({name: formProps.get('name'), type: formProps.get('type') })
        })}>
          <Field name="name" label="Name" component={Form.Input} />

            <Field
              name="type"
              label="Type"
              component={DF}
              options={[
                {
                  key: 1,
                  text: 'income',
                  value: 'income'
                },
                {
                  key: 2,
                  text: 'expense',
                  value: 'expense'
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

Grouping.propTypes = {createGrouping: PropTypes.func};

export default Grouping;
