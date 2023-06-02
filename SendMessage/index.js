module.exports = async function (context, req) {


	if(req.body){
		console.log(req.body)
		//user = JSON.parse(req.body);
		
		if (!req.body.name || !req.body.message){
			context.res = {
				status: 400, /* Defaults to 200 */
				body: "Bad request. Expecint name and public key."
			};					
		}else{
						

			req.body.type="message";

			context.bindings.actions = {
				"actionName": "SendToUser",
				"userId":req.body.name,
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