export default () => ({
  jwt_secret: process.env.JWT_SECRET || 'some-secret-key',
});
