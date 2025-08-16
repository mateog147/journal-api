export class AppLogger {
  private static instance: AppLogger;

  constructor() {}

  static getInstance(): AppLogger {
    if (!AppLogger.instance) {
      AppLogger.instance = new AppLogger();
    }
    return AppLogger.instance;
  }

  log(message: string, context?: string) {
    console.log(`[LOG]${context ? ' [' + context + ']' : ''}:`, message);
  }

  error(message: string, trace?: string, context?: string) {
    console.error(
      `[ERROR]${context ? ' [' + context + ']' : ''}:`,
      message,
      trace || '',
    );
  }

  warn(message: string, context?: string) {
    console.warn(`[WARN]${context ? ' [' + context + ']' : ''}:`, message);
  }

  debug(message: string, context?: string) {
    console.debug(`[DEBUG]${context ? ' [' + context + ']' : ''}:`, message);
  }

  verbose(message: string, context?: string) {
    console.info(`[VERBOSE]${context ? ' [' + context + ']' : ''}:`, message);
  }
}
