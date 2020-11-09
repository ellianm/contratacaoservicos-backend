/**
 * ServicesContractController
 *
 * @description :: Server-side logic for managing Servicescontracts
 * @author      :: Ellian Marcondes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  pending: function (req, res) {
    ServicesContract
      .find({ client: req.param('id'), avaliation: 0, action:1, dtConclusion:{'!': null} })
      .populate('client')
      .populate('provider')
      .exec(function (err, pendingServices) {
        if (err) return res.serverError(err);
        if (!pendingServices) return res.notFound();
        return res.json(200, pendingServices);
      });
  },
  history: function (req, res) {
    ServicesContract
      .find({ client: req.param('id'), avaliation: { '>': 0 } })
      .populate('client')
      .populate('provider')
      .exec(function (err, historyServices) {
        if (err) return res.serverError(err);
        if (!historyServices) return res.notFound();
        return res.json(200, historyServices);
      });
  },
  historyProviderLimited: function(req, res) {
    ServicesContract
    .find({ provider: req.param('providerId'), avaliation: { '>': 0 }, serviceName: req.param('serviceName')})
    .limit(5)
    .exec(function (err, historyServices) {
      if (err) return res.serverError(err);
      if (!historyServices) return res.notFound();
      return res.json(200, historyServices);
    });
  },
  pendingProvider: function (req, res) {
    ServicesContract
      .find({ provider: req.param('id'), action: null })
      .populate('client')
      .populate('provider').exec(function (err, pendingServices) {
        if (err) return res.serverError(err);
        if (!pendingServices) return res.notFound();
        return res.json(200, pendingServices);
      });
  },
  historyProvider: function (req, res) {
    ServicesContract
      .find({ provider: req.param('id'), action: {'!': null}, dtConclusion:{'!': null} })
      .populate('client')
      .populate('provider').exec(function (err, historyServices) {
        if (err) return res.serverError(err);
        if (!historyServices) return res.notFound();
        return res.json(200, historyServices);
      });
  },
  inProgressProvider: function (req, res) {
    ServicesContract
      .find({ provider: req.param('id'), action: true, dtConclusion: null })
      .populate('client')
      .populate('provider').exec(function (err, inprogressServices) {
        if (err) return res.serverError(err);
        if (!inprogressServices) return res.notFound();
        return res.json(200, inprogressServices);
      });
  },
  inProgressClient: function (req, res) {
    ServicesContract
      .find({ client: req.param('id'), dtConclusion: null })
      .populate('client')
      .populate('provider').exec(function (err, inprogressServices) {
        if (err) return res.serverError(err);
        if (!inprogressServices) return res.notFound();
        return res.json(200, inprogressServices);
      });
  },
  updateAvaliation: function (req, res) {
    let json = req.body;
    for (var i = 0; i < json.length; i++) {
      ServicesContract.update(json[i].id, json[i]).exec(function (err) {
        if (err) return res.serverError(err);
        return res.ok();
      });
    }
  }
};

