const cds = require('@sap/cds');
const express = require('express');
const multer = require('multer');
const reader = require('xlsx');
const { v4: uuidv4 } = require('uuid');
module.exports = cds.service.impl(async function () {
    const app = cds.app;

    const upload = multer({ dest: 'uploads/' });
  
    
    app.post('/custom/uploadData', upload.single('myFileUpload'), async (req, res) => {
      const { train } = this.entities; 
      console.log(train);
      console.log('File uploaded:', req.file);
      
      const file = reader.readFile(req.file.path);
      const sheets = file.SheetNames;
      let data = [];
  
      for (let i = 0; i < sheets.length; i++) {
        const temp = reader.utils.sheet_to_json(file.Sheets[sheets[i]]);
        temp.forEach((res) => {
          const entry = {
            ID: uuidv4(),
            train_id: res['Train ID'],
            train_no: res['Train Number'],
            capacity: res['Capacity'],
            no_of_cars: res['Number of Cars'],
            maintenance_status: res['Maintenance Status'].toLowerCase() === 'yes',
          };
          data.push(entry);
        });
      }
  
      if (data.length > 0) {
        console.log(await cds.run(UPSERT.into(train).entries(data))); 
      }
  
      res.status(200).send('File uploaded successfully');
    });
  });
  
