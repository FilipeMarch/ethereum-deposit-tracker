export class Logger {
  private time() {
    return new Date().toString();
  }

  private formatLog(level: string, message: any) {
    console.log(level, '|', this.time(), '|', message);
  }

  public info(message: any) {
    this.formatLog('INFO', message);
  }

  public error(message: any) {
    this.formatLog('ERROR', message);
  }
}
