import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import {
  Form,
  Container,
  Segment,
  Header,
  Button,
  Grid
} from 'semantic-ui-react';
import { Field } from 'redux-form/immutable';

const Padded = styled.div`padding: 1em;`;

const Login = ({logIn, handleSubmit}) => (
  <Padded>
    <Grid columns={1} verticalAlign="middle" stretched>
      <Grid.Row stretched>
        <Grid.Column stretched>
          <Container text>
            <Segment>
              <Header block as="h2" icon="home" content="Log in" />
              <Form onSubmit = {handleSubmit(formProps => {
                logIn({email: formProps.get('email'), password: formProps.get('password')})
              })}>
                <Field name="email" label="Email" component={Form.Input} />
                <Field name="password" label="Password" component={Form.Input} />
                <Form.Field
                  control={() => (
                    <Button type="submit" fluid>
                      Log in
                    </Button>
                  )}
                />
              </Form>
            </Segment>
          </Container>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Padded>
);

Login.propTypes = {
  logIn: PropTypes.func
};

export default Login;
