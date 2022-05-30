export default class HandleError {
  constructor(private _erro: any) {
    this.findErrorType();
  }

  public get erro() {
    return this._erro;
  }

  private normalizeMessageError(code: number, message: string) {
    this._erro = { code, message };
  }

  private normalizeError(code: number, message: string) {
    this._erro = { code, error: message };
  }

  private findErrorType() {
    if (this._erro.isJoi) return this.handleJoi();
    if (this._erro.kind) return this.handleCast();
    if (this._erro.type) return this.handleCustom();

    return this.handleUnknow();
  }

  private handleCast() {
    const { kind } = this._erro;
    // console.log(this._erro, 'cast');

    const message = 'Id must have 24 hexadecimal characters';
    if (kind === 'ObjectId') {
      this.normalizeError(400, message);
    }
  }

  private handleUnknow() {
    const message = 'Internal server error';
    this.normalizeMessageError(500, message);
  }

  private handleJoi() {
    const { message } = this._erro.details[0];
    this.normalizeMessageError(400, message);
  }

  private handleCustom() {
    const { code, message, type } = this._erro;
    // console.log(message, 'custom');
    if (type === 'cast') {
      this.normalizeError(code, message);
    } else {
      this.normalizeMessageError(code, message);
    }
  }
}
