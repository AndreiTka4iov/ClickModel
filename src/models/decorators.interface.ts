export interface ColumnMetadata {
  name: string;
  type: string;
  nullable: boolean;
  default?: any;
}

export interface TableMetadata<T> {
  modelName: string;
  columns: ColumnMetadata[];
  modelType: T;
}
