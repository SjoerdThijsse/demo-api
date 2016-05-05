const global = {
  master: true,
  port: 5000,
  workers: 2,
  dbHosts: ["localhost"],
  logDir: `${process.cwd()}/logs`
};

export {
  global
};
