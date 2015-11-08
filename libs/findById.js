var response = require('./response')
var status = require('./status');

module.exports = function FindById(model, id) {
  return new Promise(function(resolve, reject) {
    model.findById(id, function(err, result) {
      if (err && err.name == 'ValidationError') {
        reject(response(status.FAILURE_VALIDATION));
        return;
      }
      if (err && err.name == 'CastError') {
        reject(response(status.FAILURE_CAST));
        return;
      }
      if (err) {
        reject(response(status.FAILURE));
        return;
      }
      if (!result) {
        reject(response(status.FAILURE_NOT_FOUND));
        return;
      }
      resolve(response(status.SUCCESS, result));
    });
  });
}