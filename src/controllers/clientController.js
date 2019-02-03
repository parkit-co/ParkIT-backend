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
}