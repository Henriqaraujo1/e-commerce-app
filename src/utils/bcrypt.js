const bcrypt = require('bcrypt');


module.exports = class EncryptUtil {
    async encrypt(password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        return hash
    }
    

}
