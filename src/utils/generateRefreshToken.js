const jwt = require('jsonwebtoken');

function generateRefreshToken(userId) {
    const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d', // 7 kunlik amal qilish muddati
    });
    return refreshToken;
}

module.exports = generateRefreshToken;