
const cds = require('@sap/cds');
const express = require('express');
const multer = require('multer');
const reader = require('xlsx');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

module.exports = cds.service.impl(async function () {
    const app = cds.app;

   
    const upload = multer({ dest: 'uploads/' });

    
    app.post('/custom/uploadData', upload.single('myFileUpload'), async (req, res) => {
        const { train } = this.entities;
        console.log('File uploaded:', req.file);

        try {
            const file = reader.readFile(req.file.path);
            const sheets = file.SheetNames;
            let data = [];

            for (let i = 0; i < sheets.length; i++) {
                const temp = reader.utils.sheet_to_json(file.Sheets[sheets[i]]);
                temp.forEach((entry) => {
                    data.push({
                        ID: uuidv4(),
                        train_id: entry['Train ID'],
                        train_no: entry['Train Number'],
                        capacity: entry['Capacity'],
                        no_of_cars: entry['Number of Cars'],
                        maintenance_status: entry['Maintenance Status'].toLowerCase() === 'yes',
                    });
                });
            }

            if (data.length > 0) {
                await cds.run(UPSERT.into(train).entries(data));
            }

            res.status(200).send('File uploaded and data processed successfully');
        } catch (error) {
            console.error('Error processing file:', error);
            res.status(500).send('Error processing file');
        } finally {
            // Clean up the uploaded file
            fs.unlink(req.file.path, err => {
                if (err) console.error('Failed to delete temporary file:', err);
            });
        }
    });


    
    this.before('CREATE', 'Files', req => {
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        req.data.url = `/odata/v4/hydmetro/Files(${req.data.ID})/content`
    })

    this.before('READ', 'Files', req => {
        //check content-type
        console.log('content-type: ', req.headers['content-type'])
    })

    
    
});
