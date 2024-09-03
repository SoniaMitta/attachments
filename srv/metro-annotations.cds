using {hydmetro.train as train} from './hydmetro';  

annotate train with @(
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

annotate train with @(
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

