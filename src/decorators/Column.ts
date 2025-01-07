import "reflect-metadata";

type ColumnOptions<T> = {
  nullable?: boolean;
  default?: T extends string
    ? string
    : T extends number
    ? number
    : T extends boolean
    ? boolean
    : T extends Date
    ? Date | "now()"
    : never;
};

const typeMapping: Record<string, string> = {
  String: "String",
  Number: "Int32",
  Boolean: "UInt8",
  Date: "DateTime",
};

function validateDefaultRuntime(
  type: string,
  value: any,
  propertyKey: string
): void {
  const typeValidators: Record<string, (value: any) => boolean> = {
    String: (v) => typeof v === "string",
    Int32: (v) => typeof v === "number" && Number.isInteger(v),
    UInt8: (v) => typeof v === "boolean",
    DateTime: (v) => v === "now()" || v instanceof Date,
  };

  const isValid = typeValidators[type]?.(value);

  if (value !== undefined && !isValid) {
    throw new Error(
      `Invalid default value for ${propertyKey}. Expected ${type}, but got ${typeof value}: ${value}`
    );
  }
}
export function Column<T = any>(options?: ColumnOptions<T>) {
  return function (target: any, propertyKey: string): void {
    const tsType = Reflect.getMetadata("design:type", target, propertyKey);

    if (!tsType) {
      throw new Error(`Unable to determine type for property ${propertyKey}`);
    }

    const resolvedType = typeMapping[tsType.name];

    if (!resolvedType) {
      throw new Error(
        `Unsupported type: ${tsType.name} for property ${propertyKey}`
      );
    }

    // Валидация default
    validateDefaultRuntime(resolvedType, options?.default, propertyKey);

    if (!target.columns) {
      target.columns = [];
    }

    target.columns.push({
      name: propertyKey,
      type: resolvedType,
      nullable: options?.nullable ?? false,
      default: options?.default,
    });
  };
}
