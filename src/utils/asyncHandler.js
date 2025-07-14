
//utility function for asnycHandler used for connecting database, and so many things

//asyncHandler using Promises
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err))
    }
}

export { asyncHandler }


//higher order functions are those functions which accepts other functions as parameters or can return functions as return type
//asyncHandler using try-catch
// const asyncHandler = (fun) => async (err, req, res, next) => {
//     try{
//         await fun(req, res, next)
//     }
//     catch(error){
//         res.send(err.code || 500).json({
//             success: false,
//             message: err.message
//         }
//         )
//     }
// }