export const errorHandler = (code, msg) => {
	const error = new Error();
	error.statusCode = code 
	error.message = msg ;
	return error;
};
