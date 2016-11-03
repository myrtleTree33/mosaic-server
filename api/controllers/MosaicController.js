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
    let numClusters = req.body.numClusters;
    if (!type || !base64Img || !numClusters)  {
      return res.badRequest('Missing type or base 64 image.');
    }
    client.invoke("generate_mosaic",
      base64Img,
      numClusters,
      48,
      12,
			type,
      function(err, outputBase64ImgStr, more) {
        console.log('success! --');
        console.log(type);
        console.log(numClusters);
        res.status(200).json({
					type: type,
					base64Img:outputBase64ImgStr,
          numClusters: numClusters
        });
      });
  }
};
