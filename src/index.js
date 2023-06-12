'use strict'
const fs = require('fs');

exports.MergeJson = (req) => {
    return new Promise(async (resolve) => {

        const data = {
            "r": []
        };
        const dir = req;
        fs.readdir(dir, (err, files) => {
            return new Promise((resolve, reject) => {
                if (err)
                    reject(err);
                files.forEach(file => {
                    let content = require(`${dir}${file}`);
                    data['r'] = data['r'].concat(content);
                });
                resolve(data);
            }).then(data => {

                return resolve(JSON.stringify(JSON.parse(JSON.stringify(data)).r))
            });
        })

    })
};