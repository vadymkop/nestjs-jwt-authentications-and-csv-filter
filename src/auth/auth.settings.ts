export const jwtSettings = {
  secret: process.env.JWT_SECRET || 'secretKey',
  signOptions: {
    expiresIn: process.env.JWT_EXPIRES_IN || '3600s',
  },
};

export const bcryptSettings = {
  rounds: parseInt(process.env.BCRYPT_ROUNDS, 10) || 10,
};