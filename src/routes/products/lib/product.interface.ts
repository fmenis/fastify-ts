import { createProductBodyType, productDetailsType } from "./product.schema";

interface ICreate {
  (params: createProductBodyType): Promise<productDetailsType>;
}

export interface IProductService {
  createProduct: ICreate;
}
