namespace com.satinfotech.metro;
using {cuid, managed} from '@sap/cds/common';

entity train: managed, cuid {
     @title:'Train ID'
    train_id: String(10);
    @title: 'Train Number'
    train_no: String(40);
    @title: 'Capacity'
    capacity: Integer;
    @title: 'Number of Cars'
    no_of_cars: Integer;
    @title: 'Maintenance Status'

    maintenance_status: Boolean;
}

entity Files: cuid, managed{
    @Core.MediaType: mediaType
    content: LargeBinary;
    @Core.IsMediaType: true
    mediaType: String;
    fileName: String;
    size: Integer;
    url: String;
    thumbnailUrl: String;
}

// Define customer entity
entity customer : managed, cuid {
    @title: 'Name'
    name: String(20);
    @title: 'DOB'
    dob: Date;
}

