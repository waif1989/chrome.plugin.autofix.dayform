exports.cluster = {
  listen: {
    port: 20000,
    hostname: '10.190.190.145', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
    // path: '/var/run/egg.sock',
  },
  logger: {
    dir: '/opt/app/logs/chrome.plugin.autofix.dayform',
  },
};
