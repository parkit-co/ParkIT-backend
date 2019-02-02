import firebase from "firebase";

export const clientController = {
    getClientInfo: async (req, res) => {
        // Get a reference to the database service
        const { licensePlate } = req.params;
        var database = firebase.database();
        database = database.ref('client/' + licensePlate);

        database.once('value').then(function(snapshot) {
            var user = {
                name: (snapshot.val() && snapshot.val().name) || 'Anonymous',
                car: (snapshot.val() && snapshot.val().car),
                license: licensePlate,
                payment: (snapshot.val() && snapshot.val().payment) || 'No payment available',
                invoices: (snapshot.val() && snapshot.val().invoices) || 'No payment history',
            };
            res.json({ status: 'SUCCESS', data: user });
            database.close();
        });
    },

    postInvoice: async (req, res) => {
        const { licensePlate, time, action } = req;
        var database = firebase.database();
        database = database.ref('client/' + licensePlate + '/invoices/inv00000');

        if (action == "leaving") {
            var startTime = moment('2016-10-08_1030', 'YYYY-MM-DD_HHmm');
            var endTime = moment(time, 'YYYY-MM-DD_HHmm');
            var duration = endTime.diff(startTime, 'minutes');
        }
        database.close();
    },
}