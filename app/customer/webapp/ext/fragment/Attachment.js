sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Item",
    "./Formatter"
], function(MessageToast, JSONModel, Item, Formatter) {
    'use strict';

    return {
        onPress: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
            var oButton = this.byId("dewdewdw");
            oButton.setVisible(false); // Hides the button
        },

        onAfterItemAdded: function(oEvent) {
            var item = oEvent.getParameter("item");
            var mediaType = item.getMediaType();
            var thumbnailUrl = Formatter.formatThumbnailUrl(mediaType); // Use Formatter here
			console.log("Media Type:", mediaType);
			console.log("Thumbnail URL:", thumbnailUrl)
            var _createEntity = function(item) {
                var data = {
                    mediaType: item.getMediaType(),
                    fileName: item.getFileName(),
                    size: item.getFileObject().size,
                    thumbnailUrl: thumbnailUrl
                };
				console.log(data);
                var settings = {
                    url: "/odata/v4/hydmetro/Files",
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                };
        
                return new Promise((resolve, reject) => {
                    $.ajax(settings)
                        .done((results) => resolve(results.ID))
                        .fail((err) => reject(err));
                });
            };
        
            _createEntity(item)
        .then(function(id) {
            var url = `/odata/v4/hydmetro/Files(${id})/content`;

            // Set the properties for the item
            console.log(thumbnailUrl);
            item.setProperty("thumbnailUrl", thumbnailUrl);
            item.setUploadUrl(url);

            var oUploadSet = this.byId("uploadSet");
            oUploadSet.setHttpRequestMethod("PUT");
            oUploadSet.uploadItem(item);

            // Refresh the UploadSet binding to ensure UI updates
            var oBinding = oUploadSet.getBinding("items");
            oBinding.refresh();
        }.bind(this))
        .catch(function(err) {
            console.log(err);
        });
        },

        onUploadCompleted: function (oEvent) {
            var oUploadSet = this.byId("uploadSet");
            oUploadSet.removeAllIncompleteItems();
            var oBinding = oUploadSet.getBinding("items");
    oBinding.refresh();
    
    // Get all items
    var aItems = oBinding.getContexts();
    console.log(aItems)
    
    aItems.forEach(function(oContext) {
        var oItem = oContext.getObject();
        console.log("Oitem : ",oItem);
        var sThumbnailUrl = oItem.thumbnailUrl; // Assuming the thumbnailUrl is part of the item
        console.log("Thumbnail URL:", sThumbnailUrl);
    });
        },

        onRemovePressed: function (oEvent) {
            oEvent.preventDefault();
            oEvent.getParameter("item").getBindingContext().delete();
            MessageToast.show("Selected file has been deleted");
        },

        onOpenPressed: function(oEvent) {
            oEvent.preventDefault();
            var item = oEvent.getSource();
            var fileName = item.getFileName();
            
            var _download = function(item) {
                var settings = {
                    url: item.getUrl(),
                    method: "GET",
                    headers: {
                        "Content-type": "application/octet-stream"
                    },
                    xhrFields: {
                        responseType: 'blob'
                    }
                };

                return new Promise((resolve, reject) => {
                    $.ajax(settings)
                        .done((result) => {
                            resolve(result);
                        })
                        .fail((err) => {
                            reject(err);
                        });
                });
            };

            _download(item)
                .then((blob) => {
                    var url = window.URL.createObjectURL(blob);
                    var link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', fileName);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        _download: function (item) {
            var settings = {
                url: item.getUrl(),
                method: "GET",
                headers: {
                    "Content-type": "application/octet-stream"
                },
                xhrFields: {
                    responseType: 'blob'
                }
            }

            return new Promise((resolve, reject) => {
                $.ajax(settings)
                    .done((result) => {
                        resolve(result)
                    })
                    .fail((err) => {
                        reject(err)
                    })
            });
        },

        _createEntity: function (item) {
            var data = {
                mediaType: item.getMediaType(),
                fileName: item.getFileName(),
                size: item.getFileObject().size
            };

            var settings = {
                url: "/hydmetro/Files",
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                data: JSON.stringify(data)
            }

            return new Promise((resolve, reject) => {
                $.ajax(settings)
                    .done((results, textStatus, request) => {
                        resolve(results.ID);
                    })
                    .fail((err) => {
                        reject(err);
                    })
            });
        },

        _uploadContent: function (item, id) {
            var url = `/hydmetro/Files(${id})/content`
            console.log("upload url : ",item.thumbnailUrl);
            item.setUploadUrl(url);
            var oUploadSet = this.byId("uploadSet");
            oUploadSet.setHttpRequestMethod("PUT")
            oUploadSet.uploadItem(item);
        }
    };
});
