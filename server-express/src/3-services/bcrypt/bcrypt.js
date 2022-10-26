const bcrypt = require('bcrypt');
const saltRounds = 10;


const bcryptHash = async (password) =>{
    let passwordH = await bcrypt.hash(password, saltRounds);
    return passwordH;
}

const bcryptCompare = async (password, passwordDB) =>{
    const match = await bcrypt.compare(password, passwordDB);
    return match;
}

module.exports = {bcryptHash, bcryptCompare}