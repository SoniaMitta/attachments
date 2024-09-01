const cds = require('@sap/cds');
const express = require('express');
const multer = require('multer');
const reader = require('xlsx');
const { v4: uuidv4 } = require('uuid');

module.exports = cds.service.impl(async function() {
    const app = cds.app;

    // Multer setup for handling multipart/form-data
    const upload = multer({ dest: 'uploads/' });

    // Custom route to handle file upload
    app.post('/custom/uploadData', upload.single('myFileUpload'), async (req, res) => {
        const { train } = this.entities;
        console.log('File uploaded:', req.file);
        const file = reader.readFile(req.file.path) 
  
let data = [] 
  
const sheets = file.SheetNames 
  
for(let i = 0; i < sheets.length; i++) 
{ 
   const temp = reader.utils.sheet_to_json( 
        file.Sheets[file.SheetNames[i]]) 
   temp.forEach((res) => { 
    if (!res.ID) {  // Check if ID is missing
        res.ID = uuidv4(); // Generate a new UUID
    }
      data.push(res) 
   }) 
} 
console.log(data)
if (data.length > 0) {
    console.log(await cds.run(UPSERT.into(train).entries(data)));
  }
  
console.log(data)
        res.status(200).send('File uploaded successfully');

    });

    
});
