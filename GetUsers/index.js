const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

const connectionString = process.env["AzureWebJobsStorage"];
const client = TableClient.fromConnectionString(connectionString, "users");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

	var users = [];

	let entitiesIter = client.listEntities();
	for await (const entity of entitiesIter) {
		var user = {
			name: entity.rowKey,
			publicKey: entity.publicKey
		}
		users.push(user);
	}

    context.res = {
        status: 200, 
        headers: {
            'content-type': 'application/json; charset=utf-8'
        },
        body: users
    };
}