import firebase from "firebase";

export const parkingController = {
    getAllParkingLot: async (req, res) => {
        var database = firebase.database();
        database = database.ref('parking');

        database.once('value').then(function(snapshot) {
            var parkingLots = snapshot.val() || 'No parking lot detected';
            res.json({ status: 'SUCCESS', data: parkingLots });
            database.close();
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
            database.close();
        }); 
    },
    postParkingSpot: async (req, res) => {},
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
            database.close();
        }); 
    }
}