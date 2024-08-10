declare module 'iamport' {
  export interface IamportConstructorOptions {
    impKey: string | undefined;
    impSecret: string | undefined;
  }

  export interface PaymentOptions {
    imp_uid: string;
  }

  export class Iamport {
    constructor(options: IamportConstructorOptions);
    payment: {
      getByImpUid(options: PaymentOptions): Promise<any>;
    };
  }

  export default Iamport;
}