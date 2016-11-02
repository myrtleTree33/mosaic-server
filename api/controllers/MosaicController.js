/**
 * MosaicController
 *
 * @description :: Server-side logic for managing mosaics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
let zerorpc = require("zerorpc");
let client = new zerorpc.Client();
client.connect("tcp://127.0.0.1:4000");

module.exports = {
  generateMosaic: (req, res) => {
    let type = req.body.type;
    let base64Img = req.body.base64Img;
    if (!type || !base64Img) {
      return res.badRequest('Missing type or base 64 image.');
    }
    client.invoke("generate_mosaic",
      base64Img,
      20,
      48,
      12,
			type,
      function(err, outputBase64ImgStr, more) {
        res.status(200).json({
					type: type,
					base64Img:outputBase64ImgStr
        });
      });
  }
};
