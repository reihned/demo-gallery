'use strict';
const neatCsv = require('neat-csv');
const fs = require('fs')

const urlToImageObj = (row) => {
  /**
   * Expects a picsum based url, see https://picsum.photos/
   * Converts url to expected Object for data seeding by this app
   * https://picsum.photos/id/{id}/{height}/{width}
   */
  let url = row.url;
  let prefix_length = "https://picsum.photos/id/".length;
  let cleaned_string = url.substring(prefix_length);
  let [id, height_str, width_str] = cleaned_string.split('/');
  let height = parseInt(height_str); 
  let width = parseInt(width_str);

  return {
    url: url,
    urlGreyscale: `${url}?grayscale`,
    height: height,
    width: width,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const test_data_path = './sample_data/test.csv';
    
    console.debug("Loading:", test_data_path);
    const stream = fs.createReadStream(test_data_path);
    let csv = await neatCsv(stream);
    let images = csv.map(urlToImageObj);
    // console.debug(images);
    return queryInterface.bulkInsert('Images', images, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Images', null, {});
  }
};
