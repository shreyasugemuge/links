module.exports = {
  apps: [{
    name: 'links-frontend',
    script: 'npm',
    args: 'start',
    interpreter: 'none',
    env: {
      // Set environment variables here
      NODE_ENV: 'production',
    },
  }],
};
