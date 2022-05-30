export default class HandleError {
  constructor(private _erro: any) {
    this.findErrorType();
  }

  public get erro() {
    return this._erro;
  }

  private normalizeError(code: number, message: string) {
    this._erro = { code, message };
  }

  private findErrorType() {
    if (this._erro.isJoi) return this.handleJoi();
    if (this._erro.type) return this.handleCustom();

    return this.handleUnknow();
  }

  private handleUnknow() {
    const message = 'Internal server error';
    this.normalizeError(500, message);
  }

  private handleJoi() {
    const { message } = this._erro.details[0];
    this.normalizeError(400, message);
  }

  private handleCustom() {
    const { code, message } = this._erro;
    this.normalizeError(code, message);
  }
}
