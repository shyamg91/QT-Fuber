var mongoose = require('mongoose');
const Driver = mongoose.model('Driver');
const promisify = require('es6-promisify');

exports.getRoot = async (req, res) => {
  res.render('index');
}

exports.getNearestDriver = async (req, res) => {
  try {
    const coordinates = [];
    coordinates[0] = req.query.lng;
    coordinates[1] = req.query.lat;
    const type = req.query.type || null;

    const drivers = await Driver.find({
      location: {
        $near: {
          $geometry: {
            type: "point",
            coordinates: coordinates
          },
          $maxDistance: 2000
        }
      }, 'model.colour': type
    });
    if (drivers.length != 0) {
      res.render('drivers', {
        drivers
      });
    }
    else if (drivers.length === 0) {
      res.render('empty');
    }
  }
  catch (err) {
    next();
  }
}

exports.allocateDriver = async (req, res, next) => {
  try {
    const driver = await Driver.findOne({
      '_id': req.params.id
    });
    if (driver.status === "idle") {
      const driverEnRoute = await Driver.findOneAndUpdate({
        '_id': driver._id
      }, {
          'status': 'en route'
        }, true);

      res.render('ride', {
        driver: driverEnRoute
      });
    }
    else {
      res.render('empty')
    }
  }
  catch (err) {
    next();
  }
}