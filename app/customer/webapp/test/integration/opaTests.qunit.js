sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'customer/test/integration/FirstJourney',
		'customer/test/integration/pages/customerList',
		'customer/test/integration/pages/customerObjectPage'
    ],
    function(JourneyRunner, opaJourney, customerList, customerObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('customer') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThecustomerList: customerList,
					onThecustomerObjectPage: customerObjectPage
                }
            },
            opaJourney.run
        );
    }
);