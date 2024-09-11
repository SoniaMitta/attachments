using {com.satinfotech.metro as metro} from '../db/schema';

service hydmetro  {
  entity train as projection on metro.train;
  entity customer as projection on metro.customer{
        @UI.Hidden
        ID,
        *
    };
  entity Files as projection on metro.Files{
        @UI.Hidden
        ID,
        *
    };
  action uploadData() returns Boolean;
  action uploadDoc() returns Boolean;
}

annotate hydmetro.train with @odata.draft.enabled;

annotate hydmetro.customer with @odata.draft.enabled;

annotate hydmetro.train with @(
    UI.LineItem: [
        {
            $Type:'UI.DataField',
            Label : 'Train ID',
            Value: train_id
        },
         {
            $Type:'UI.DataField',
            Label: 'Train Number',
            Value: train_no
        },
         {
            $Type:'UI.DataField',
            label: 'Capacity',
            Value: capacity
        },
         {
            $Type:'UI.DataField',
            label: 'Number of Cars',
            Value: no_of_cars
        },
        {
            $Type:'UI.DataField',
            label: 'Maintenance Status',
            Value: maintenance_status
        },
    ]
);

annotate hydmetro.train with @(
    UI.FieldGroup #train : {
        $Type : 'UI.FieldGroupType',
        Data : [
        {
            $Type:'UI.DataField',
            Value: train_id
        },
         {
            $Type:'UI.DataField',
            Value: train_no
        },
         {
            $Type:'UI.DataField',
            Value: capacity
        },
         {
            $Type:'UI.DataField',
            Value: no_of_cars
        },
        {
            $Type:'UI.DataField',
            Value: maintenance_status
        },
    ]
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'Train Information',
            Target : '@UI.FieldGroup#train',
        },
    ],
    
);

annotate hydmetro.customer with @(
    UI.LineItem: [
        {
            $Type:'UI.DataField',
            Label : 'Name',
            Value: name
        },
         {
            $Type:'UI.DataField',
            Label: 'DOB',
            Value: dob
        },
         {
            $Type:'UI.DataField',
            label: 'Files',
            Value: Files
        }
    ]
);

annotate hydmetro.customer with @(
    UI.FieldGroup #customer : {
        $Type : 'UI.FieldGroupType',
        Data : [
        {
            $Type:'UI.DataField',
            Label : 'Name',
            Value: name
        },
         {
            $Type:'UI.DataField',
            Label: 'DOB',
            Value: dob
        },
    ]
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'Customer Information',
            Target : '@UI.FieldGroup#customer',
        }
    ],
    
);

/*annotate hydmetro.Files with @(
    UI.LineItem: [
         {
            $Type:'UI.DataField',
            Label: 'Content',
            Value: content
        },
         {
            $Type:'UI.DataField',
            label: 'fileName',
            Value: fileName
        }
    ]
);

annotate hydmetro.Files with @(
    UI.FieldGroup #Files : {
        $Type : 'UI.FieldGroupType',
        Data : [
         {
            $Type:'UI.DataField',
            Label: 'Content',
            Value: content
        },
         {
            $Type:'UI.DataField',
            label: 'fileName',
            Value: fileName
        }
    ]
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'Files Information',
            Target : '@UI.FieldGroup#Files',
        },
    ],
    
);
*/


