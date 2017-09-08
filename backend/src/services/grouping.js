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

const handlePostGrouping = (request, response) => {
  return new Promise((resolve, reject) => {
    const { name, type } = request.body;

    const grouping = new Grouping({
      name,
      type
    });

    grouping.user = extractUser(request);

    grouping
      .save()
      .then(grouping => {
        resolve(pickPropertiesForGrouping(grouping));
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

const handleGetAllGroupings = (request, response) =>
  new Promise((resolve, reject) => {
    const user = extractUser(request);

    Grouping.find({ user })
      .then(groupings => {
        resolve(groupings.map(grouping => pickPropertiesForGrouping(grouping)));
      })
      .catch(error => reject(error));
  });

const handlePutGrouping = (request, response) => {
  const user = extractUser(request);
  let { name, _id } = request.body;

  if (!idValidator(_id)) return reject({ message: ID_INVALID_OR_NOT_PRESENT });

  Grouping.findOne({ _id, user })
    .then(grouping => {
      if (!grouping) return Promise.reject({ message: RESOURCE_NOT_FOUND });

      return Grouping.findOneAndUpdate(
        { _id },
        { $set: { name } },
        { new: true }
      );
    })
    .then(grouping => resolve(pickPropertiesForGrouping(grouping)))
    .catch(error => reject(error));
};

const handleDeleteGrouping = (request, response) =>
  new Promise((resolve, reject) => {
    const user = extractUser(request);
    let _id = request.params['id'];

    if (!idValidator(_id))
      if (!grouping) return Promise.reject({ message: RESOURCE_NOT_FOUND });

    Grouping.findOne({ _id, user })
      .then(grouping => {
        if (!grouping) return Promise.reject({ message: RESOURCE_NOT_FOUND });
        return grouping.remove();
      })
      .then(() => response.status(200).send({}))
      .catch(error => resolve(error));
  });

module.exports = {
  handlePostGrouping,
  handleGetAllGroupings,
  handleDeleteGrouping,
  handlePutGrouping
};
