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

