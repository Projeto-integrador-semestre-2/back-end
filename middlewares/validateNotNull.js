export function objHaveNullValue(keysToTest) {
    return (req, res, next) => {
        for (let i = 0; i < keysToTest.length; i++) {
            if (
                req.body[keysToTest[i]] == null ||
                req.body[keysToTest[i]] == '' ||
                req.body[keysToTest[i]] == undefined
            ) {
                return res.json({
                    message: `Preencha o campo ${keysToTest[i]} para continuar`,
                })
            }
        }
        next()
    }
}
