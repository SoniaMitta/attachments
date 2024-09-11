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
    'sap/ui/export/library',
    'sap/m/upload/UploadSet'
], function (MessageBox, Dialog, Text, Button, ProgressIndicator, HTML, FileUploader, MessageToast, Spreadsheet, exportLibrary,UploadSet) {
    "use strict";
    
    var EdmType = exportLibrary.EdmType; 
    
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
                width : "430px"
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
                            text: "Download Template",
                            press: () => {
                                console.log("Download Template button pressed");
                                downloadTemplate();
                            }
                        })  
                    ]
                }),
                contentWidth: "500px",
                contentHeight: "150px",
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
                                oStatusText.setText("Uploaded");
                                oFileUpload.upload();
                                MessageBox.success("File Uploaded Succesfully");
                                //oDialog.close();
                                
                            }, function (error) {
                                MessageToast.show("The file cannot be read. It may have changed.");
                            }).then(function () {
                                oFileUpload.clear();
                            });
                        }
                    })
                ],
                beginButton: new Button({
                    text: "Cancel",
                    press: function () {
                        oFileUpload.clear();
                        oDialog.close();
                        location.reload(); 
                    }
                }),
            });

            oDialog.open();

            var downloadTemplate = function () {
                var aCols = createColumnConfig();

                var oSettings = {
                    workbook: {
                        columns: aCols,
                        hierarchyLevel: 'Level'
                    },
                    dataSource: [], 
                    fileName: 'Template.xlsx',
                    worker: false
                };

                var oSheet = new Spreadsheet(oSettings);
                oSheet.build().finally(function () {
                    oSheet.destroy();
                });
            }

            var createColumnConfig = function() {
                var aCols = [];
                aCols.push({
                    label: 'ID',
                    property: 'id',
                    type: EdmType.String 
                });

                aCols.push({
                    label: 'Train ID',
                    property: 'train_id',
                    type: EdmType.String 
                });

                aCols.push({
                    label: 'Train Number',
                    property: 'train_no',
                    type: EdmType.String 
                });

                aCols.push({
                    label: 'Capacity',
                    property: 'capacity',
                    type: EdmType.Number,
                });

                aCols.push({
                    label: 'Number of Cars',
                    property: 'no_of_cars',
                    type: EdmType.Number,
                });

                aCols.push({
                    label: 'Maintenance Status',
                    property: 'maintenance_status',
                    type: EdmType.String 
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

