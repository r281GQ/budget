import React from 'react';

import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form/immutable';

const Name = () =><Field name="name" label="Name" component={Form.Input} />



export default Name;
