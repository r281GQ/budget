import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Item, Container } from 'semantic-ui-react';

const Padded = styled.div`padding: 1em;`;

const PaddedModelContainer = ({ children }) => (
  <Padded>
    <Grid stackable>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Container>
            <Item.Group divided>{children}</Item.Group>
          </Container>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Padded>
);

PaddedModelContainer.propTypes = {
  children: PropTypes.any
};

export default PaddedModelContainer;
