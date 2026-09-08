module.exports = {
  apps: [
    {
      name: "zagis-app",
      cwd: __dirname,
      script: "./node_modules/next/dist/bin/next",
      interpreter: "node",
      args: "start -p 3000",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};