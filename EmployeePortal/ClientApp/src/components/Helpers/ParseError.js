function ParseError(error) {
    try {
        if (error !== '') {
            let parsedError = JSON.parse(error);
            if (parsedError.ModelState !== null) {
                let modelState = parsedError.ModelState;
                if (Object.getOwnPropertyNames(modelState) !== null) {
                    let modelStateArr = Object.getOwnPropertyNames(modelState)
                    if (modelStateArr[0] === '')
                        return modelState[''][0]
                    else if (modelStateArr[0] === 'model.ConfirmPassword')
                        return modelState['model.ConfirmPassword'][0]
                }
            }
        }
    }
    catch (exception) {
        return 'Some error occured, please try again'
    }
}

export default ParseError
