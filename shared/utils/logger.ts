import { createConsola } from "consola";
import type { ConsolaInstance } from "consola";

/**
 * 确定日志级别
 * 开发环境: 4 (Debug) - 可以看到 logger.debug
 * 生产环境: 3 (Info)  - 过滤掉 debug，只看 info/warn/error
 */
const logLevel = import.meta.dev ? 4 : 3;

/**
 * 创建全局 Logger 实例
 */
const logger: ConsolaInstance = createConsola({
  // 1. 设置日志级别
  level: logLevel,

  // 2. 默认配置
  defaults: {
    // 给你的业务日志加个标签，方便和 Nuxt 框架自身的日志区分开
    tag: "APP",
  },

  // 3. 格式化选项
  formatOptions: {
    // 在生产环境的服务端，建议使用 JSON 格式，方便 ELK/Datadog 等日志平台解析
    // 在开发环境或浏览器端，保持 pretty 格式（好看的颜色和排版）
    json: !import.meta.dev && import.meta.server,

    // 显示时间戳
    date: true,

    // 保持颜色输出（除非是 JSON 模式）
    colors: true,

    // 错误堆栈精简
    compact: false,
  },
});

// 导出实例
export default logger;
