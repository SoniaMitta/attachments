// sap.ui.define([
//     "sap/m/MessageBox",
//     "sap/m/Dialog",
//     "sap/m/Text",
//     "sap/m/Button",
//     "sap/m/ProgressIndicator",
//     "sap/ui/core/HTML",
//     "sap/ui/unified/FileUploader",
//     "sap/m/MessageToast",
//     'sap/ui/export/Spreadsheet',
// ], function (MessageBox, Dialog, Text, Button, ProgressIndicator, HTML,FileUploader,MessageToast,Spreadsheet) {
//     "use strict";
//     return {
//         upload: function (oBindingContext, aSelectedContexts) {
           
          
//             var oStatusText = new Text({ 
//                 text: "Choose a file",
//                 design: "Bold",
//                 wrapping: true,
//                 width: "100%"
//             });

//             var oFileUpload = new FileUploader({
//                 id:"fileUploader",
// 			name:"myFileUpload",
// 			uploadUrl:"/custom/uploadData",
// 			tooltip:"Upload your file to the local server",
//             })

//             oFileUpload.attachUploadComplete(handleUploadComplete);
//             var file = "";

//             var handleUploadComplete = function(oEvent) {
//                 var sResponse = oEvent.getParameter("response"),
//                     iHttpStatusCode = parseInt(/\d{3}/.exec(sResponse)[0]),
//                     sMessage;
    
//                 if (sResponse) {
//                     sMessage = iHttpStatusCode === 200 ? sResponse + " (Upload Success)" : sResponse + " (Upload Error)";
//                     MessageToast.show(sMessage);
//                 }
//             }

//             var oDialog = new Dialog({
//                 title: "Spreadsheet Upload",
//                 customHeader: new sap.m.Bar({
//                     contentLeft: new sap.m.Text({
//                         text: "Spreadsheet Upload",
//                         design: "Bold"
//                     }),
//                     contentRight: [
//                         new sap.m.Button({
//                         text: "Show Preview",
//                         press: function () {
//                             console.log("Pressed preview");
//                             // Add additional logic for preview here
//                         }
//                     }),
//                     new sap.m.Button({
//                         text: "Download Template",
//                         press: function () {
//                             console.log("Download Template button pressed");
//                             // Add logic to download the template here
//                         }
//                     })
//                 ]
//                 }),
//                 content: [
//                     oStatusText,
//                     new HTML({ content: "<br>" }), 
//                     oFileUpload,
//                     new Button({
//                         text: "UploadFile",
//                     press: function () {
//                         console.log("Hello");
//                         file = oFileUpload.getValue();
//                         console.log(file);
//                         if (!oFileUpload.getValue()) {
//                             MessageToast.show("Choose a file first");
//                             return;
//                         }
//                         oFileUpload.checkFileReadable().then(function() {
//                             oFileUpload.upload();
//                             console.log(oFileUpload.upload())
//                         }, function(error) {
//                             MessageToast.show("The file cannot be read. It may have changed.");
//                         }).then(function() {
//                             oFileUpload.clear();
//                         });
                        
//                     }
//                     })
//                 ],
//                 contentWidth: "500px",
//                 contentHeight: "250px",
//                 beginButton: new Button({
//                     text: "Cancel",
//                     press: function () {
//                         oDialog.close();
                        
//                     }
//                 }),
//                 endButton: new Button({
//                     text: "UploadFile",
//                     press: function () {
//                         var filetype = oFileUpload.getFiletype();
//                         console.log(filetype);
                        
//                     }
//                 }),
//             });

//             oDialog.open();
            
//             $.ajax({
//                 url: "/odata/v4/hydmetro/uploadData",
//                 type: "POST",
//                 contentType: false, 
//                 processData: false, 
//                 success: function () {
//                    //MessageBox.success("Done")
//                    console.log("connected")
//                 },
//                 error: function (errorThrown) {
//                     console.log("error occured",errorThrown)
//                 }
//             });
//         }
//     };
// });

sap.ui.define([
    "sap/m/MessageBox",
    "sap/m/Dialog",
    "sap/m/Text",
    "sap/m/Button",
    "sap/m/ProgressIndicator",
    "sap/ui/core/HTML",
    "sap/ui/unified/FileUploader",
    "sap/m/MessageToast",
    'sap/ui/export/Spreadsheet',
    'sap/ui/export/library'
], function (MessageBox, Dialog, Text, Button, ProgressIndicator, HTML, FileUploader, MessageToast, Spreadsheet, exportLibrary) {
    "use strict";
    
    var EdmType = exportLibrary.EdmType; // Use EdmType from the imported library
    
    return {
        upload: function (oBindingContext, aSelectedContexts) {
            var oStatusText = new Text({
                text: "Choose a file",
                design: "Bold",
                wrapping: true,
                width: "100%"
            });

            var oFileUpload = new FileUploader({
                id: "fileUploader",
                name: "myFileUpload",
                uploadUrl: "/custom/uploadData",
                tooltip: "Upload your file to the local server",
            });

            oFileUpload.attachUploadComplete(handleUploadComplete);

            var handleUploadComplete = function (oEvent) {
                var sResponse = oEvent.getParameter("response"),
                    iHttpStatusCode = parseInt(/\d{3}/.exec(sResponse)[0]),
                    sMessage;

                if (sResponse) {
                    sMessage = iHttpStatusCode === 200 ? sResponse + " (Upload Success)" : sResponse + " (Upload Error)";
                    MessageToast.show(sMessage);
                }
            };

            var oDialog = new Dialog({
                title: "Spreadsheet Upload",
                customHeader: new sap.m.Bar({
                    contentLeft: new sap.m.Text({
                        text: "Spreadsheet Upload",
                        design: "Bold"
                    }),
                    contentRight: [
                        new sap.m.Button({
                            text: "Show Preview",
                            press: function () {
                                console.log("Pressed preview");
                                // Add additional logic for preview here
                            }
                        }),
                        new sap.m.Button({
                            text: "Download Template",
                            press: () => {
                                console.log("Download Template button pressed");
                                _downloadTemplate();
                            }
                        })  
                    ]
                }),
                content: [
                    oStatusText,
                    new HTML({ content: "<br>" }),
                    oFileUpload,
                    new Button({
                        text: "UploadFile",
                        press: function () {
                            console.log("Hello");
                            var file = oFileUpload.getValue();
                            console.log(file);
                            if (!oFileUpload.getValue()) {
                                MessageToast.show("Choose a file first");
                                return;
                            }
                            oFileUpload.checkFileReadable().then(function () {
                                oFileUpload.upload();
                                console.log(oFileUpload.upload());
                            }, function (error) {
                                MessageToast.show("The file cannot be read. It may have changed.");
                            }).then(function () {
                                oFileUpload.clear();
                            });
                        }
                    })
                ],
                contentWidth: "500px",
                contentHeight: "250px",
                beginButton: new Button({
                    text: "Cancel",
                    press: function () {
                        oDialog.close();
                    }
                }),
                endButton: new Button({
                    text: "UploadFile",
                    press: function () {
                        var filetype = oFileUpload.getFiletype();
                        console.log(filetype);
                    }
                }),
            });

            oDialog.open();

            var _downloadTemplate = function () {
                var aCols = _createColumnConfig();

                var oSettings = {
                    workbook: {
                        columns: aCols,
                        hierarchyLevel: 'Level'
                    },
                    dataSource: [], // No data required for the template
                    fileName: 'Template.xlsx',
                    worker: false
                };

                var oSheet = new Spreadsheet(oSettings);
                oSheet.build().finally(function () {
                    oSheet.destroy();
                });
            }

            var _createColumnConfig = function() {
                var aCols = [];

                // Define columns based on the properties of the `train` entity
                aCols.push({
                    label: 'created at ',
                    property: 'createdat',
                    type: EdmType.String // Adjust the type based on actual data type
                });

                aCols.push({
                    label: 'created by',
                    property: 'createdby',
                    type: EdmType.String // Adjust the type based on actual data type
                });

                aCols.push({
                    label: 'modified at ',
                    property: 'modifiedat',
                    type: EdmType.String // Adjust the type based on actual data type
                });

                aCols.push({
                    label: 'modified by',
                    property: 'modifiedby',
                    type: EdmType.String // Adjust the type based on actual data type
                });

                aCols.push({
                    label: 'ID',
                    property: 'id',
                    type: EdmType.String // Adjust the type based on actual data type
                });

                aCols.push({
                    label: 'Train ID',
                    property: 'train_id',
                    type: EdmType.String // Adjust the type based on actual data type
                });

                aCols.push({
                    label: 'Train Number',
                    property: 'train_no',
                    type: EdmType.String // Adjust the type based on actual data type
                });

                aCols.push({
                    label: 'Capacity',
                    property: 'capacity',
                    type: EdmType.Number,
                    scale: 0 // Adjust scale if necessary
                });

                aCols.push({
                    label: 'Number of Cars',
                    property: 'no_of_cars',
                    type: EdmType.Number,
                    scale: 0 // Adjust scale if necessary
                });

                aCols.push({
                    label: 'Manufacture Date',
                    property: 'm_date',
                    type: EdmType.Date
                });

                aCols.push({
                    label: 'Maintenance Status',
                    property: 'maintenance_status',
                    type: EdmType.String // Adjust the type based on actual data type
                });

                return aCols;
            }

            $.ajax({
                url: "/odata/v4/hydmetro/uploadData",
                type: "POST",
                contentType: false,
                processData: false,
                success: function () {
                    console.log("connected");
                },
                error: function (errorThrown) {
                    console.log("error occurred", errorThrown);
                }
            });
        }
    };
});

