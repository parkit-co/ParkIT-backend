import firebase from "firebase";
import moment from "moment";

export const parkingController = {
    getAllParkingLot: async (req, res) => {
        var database = firebase.database();
        database = database.ref('parking');

        database.once('value').then(function(snapshot) {
            var parkingLots = snapshot.val() || 'No parking lot detected';
            res.json({ status: 'SUCCESS', data: parkingLots });
            // database.close();
        });
    },

    getParkingLotInfo: async (req, res) => {
        const { parkingLot } = req.params;
        var database = firebase.database();
        database = database.ref('parking/' + parkingLot);

        database.once('value').then(function(snapshot) {
            var lot = {
                name: (snapshot.val() && snapshot.val().name) || 'Does not exist',
                spots: (snapshot.val() && snapshot.val().parkingSpots) || 'Empty Garage',
            };
            res.json({ status: 'SUCCESS', data: lot });
            // database.close();
        }); 
    },
    
    postParkingSpot: async (req, res) => {
        const { parkingLot, parkingSpot } = req.params;
        const { action, license, time } = req.body;
        var rate;
        var id = "00002";
        var startTime;
        var endTime;
        var duration;
        
        console.log(req.body);

        var database_park = firebase.database();
        database_park.ref('parking/' + parkingLot).once('value').then(function(snapshot) {
            rate = (snapshot.val() && snapshot.val().rate) || 0;

            var database_inv = firebase.database();
	        // next step would be getting the invoice number
            database_inv = database_inv.ref('client/' + license + '/invoices/inv00002');
        
            if (action == "leaving") {
                // doesnt work yet, needs to be wait for start time to resolve
                startTime = database_inv.once('value').then(function(snapshot) {
                    return snapshot.val() && snapshot.val().start;
                });
                console.log(startTime);
                startTime =  moment('2019-02-13_0830', 'YYYY-MM-DD_HHmm');
                endTime = moment(time, 'YYYY-MM-DD_HHmm');
                duration = endTime.diff(startTime, 'minutes');
            } else if (action == "entering") {
                startTime = moment(time, 'YYYY-MM-DD_HHmm');
                endTime = moment(time, 'YYYY-MM-DD_HHmm');
                duration = endTime.diff(startTime, 'minutes');
            }

            endTime = endTime.format('lll');
            startTime = startTime.format('lll');
            
            var fee = rate * (duration / 60 + 1);
            database_inv.set({
                duration: duration,
                end: endTime,
                fee: fee,
                id: id,
                location: parkingLot,
                spot: parkingSpot,
                start: startTime,
            });

            res.json({ status: 'SUCCESS' });
        });
    },

    getParkingSpot: async (req, res) => {
        const { parkingLot, parkingSpot } = req.params;
        var database = firebase.database();
        database = database.ref('parking/' + parkingLot + '/parkingSpots/' + parkingSpot);

        database.once('value').then(function(snapshot) {
            var spot = {
                id: (snapshot.val() && snapshot.val().id) || 'Not registered',
                available: (snapshot.val() && snapshot.val().avail) || 'false',
            };
            res.json({ status: 'SUCCESS', data: spot });
            // database.close();
        }); 
    }
}
