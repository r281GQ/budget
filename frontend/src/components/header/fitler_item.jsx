import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown } from 'semantic-ui-react';

const FilterItem = ({ collection, type }) => (
  <Menu.Item>
    <Dropdown
      defaultValue={0}
      placeholder={`Filter by ${type}`}
      selection
      options={collection.concat({ name: `All ${type}`, _id: 0 }).map(item => ({
        key: item._id,
        text: item.name,
        value: item._id
      }))}
    />
  </Menu.Item>
);

FilterItem.propTypes = {
  collection: PropTypes.arrayOf(PropTypes.any),
  type: PropTypes.string
};

export default FilterItem;
