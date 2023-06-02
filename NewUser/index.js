const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

const client = TableClient.fromConnectionString(process.env["AzureWebJobsStorage"], "users");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

	var user;

	if(req.body){
		console.log(req.body)
		//user = JSON.parse(req.body);
		
		if (!req.body.name || !req.body.publicKey){
			context.res = {
				status: 400, /* Defaults to 200 */
				body: "Bad request. Expecint name and public key."
			};					
		}else{
						
			const userEntity = {
				partitionKey: "users",
				rowKey: req.body.name,
				publicKey: req.body.publicKey
			};
				
			await client.upsertEntity(userEntity);		

			req.body.type="newUser";

			context.bindings.actions = {
				"actionName": "sendToAll",
				"data": JSON.stringify(req.body),
				"dataType": "json"
			}
			
			context.res = {
				status: 200, /* Defaults to 200 */
				body: "OK"
			};			
		
		}
			
	}else{
		context.res = {
			status: 400, /* Defaults to 200 */
			body: "Bad request."
		};					
	}
	
	
	
}