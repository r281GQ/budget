const _ = require('lodash');

const mongoose = require('mongoose');

const Grouping = mongoose.model('Grouping');
const extractUser = require('./../utils/extract_user');
const idValidator = require('./../utils/id_validator');
const {
  ID_INVALID_OR_NOT_PRESENT,
  FORBIDDEN_RESOURCE,
  RESOURCE_NOT_FOUND,
  SERVER_ERROR,
  ACCOUNT_BALANCE,
  DEPENDENCIES_NOT_MET,
  BUDGET_INCOME_CONFLICT
} = require('./../utils/errors');

const pickPropertiesForGrouping = grouping =>
  _.pick(grouping, ['_id', 'name', 'type']);

const handlePostGrouping = request =>
  new Promise((resolve, reject) => {
    const { name, type } = request.body;

    const grouping = new Grouping({
      name,
      type
    });

    grouping.user = extractUser(request);

    grouping
      .save()
      .then(grouping => resolve(pickPropertiesForGrouping(grouping)))
      .catch(error => reject(error));
  });

const handleGetAllGroupings = request =>
  new Promise((resolve, reject) =>
    Grouping.find({ user: extractUser(request) })
      .then(groupings =>
        resolve(groupings.map(grouping => pickPropertiesForGrouping(grouping)))
      )
      .catch(error => reject(error))
  );

const handlePutGrouping = request =>
  new Promise((resolve, reject) => {
    const { name, _id } = request.body;

    if (!idValidator(_id))
      return reject({ message: ID_INVALID_OR_NOT_PRESENT });

    Grouping.findOne({ _id, user: extractUser(request) })
      .then(
        grouping =>
          !grouping
            ? reject({ message: RESOURCE_NOT_FOUND })
            : Grouping.findOneAndUpdate(
                { _id },
                { $set: { name } },
                { new: true }
              )
      )
      .then(grouping => resolve(pickPropertiesForGrouping(grouping)))
      .catch(error => reject(error));
  });

const handleDeleteGrouping = request =>
  new Promise((resolve, reject) => {
    if (!idValidator(request.params['_id']))
      return Promise.reject({ message: RESOURCE_NOT_FOUND });

    Grouping.findOne({ _id: request.params['_id'], user: extractUser(request) })
      .then(
        grouping =>
          !grouping
            ? Promise.reject({ message: RESOURCE_NOT_FOUND })
            : grouping.remove()
      )
      .then(grouping => resolve(grouping))
      .catch(error => reject(error));
  });

module.exports = {
  handlePostGrouping,
  handleGetAllGroupings,
  handleDeleteGrouping,
  handlePutGrouping
};
