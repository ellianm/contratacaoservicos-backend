/**
 * ServicesTemplateController
 *
 * @description :: Controller utilizado para controlar os templates dinâmicos dos serviços
 * @author      :: Ellian Marcondes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  exists: function (req, res) {
    var name = req.param('name');
    ServicesIndex.findOne({ searchKey: name }, function (err, serviceIndex) {
      if (err) return res.serverError(err);
      if (!serviceIndex) return res.json(404, {err:'Não existe um template dinâmico para esse serviço'});
      ServicesTemplate.findOne({ name: serviceIndex.value })
        .exec(function (err, serviceTemplate) {
          if (!serviceTemplate)
            return res.json(404, {err:'Não existe um template dinâmico para esse serviço'});
          else
            return res.json(200, serviceTemplate);
        });
    });
  }
};

