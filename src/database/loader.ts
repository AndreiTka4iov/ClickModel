import { TableMetadata } from "@models/decorators.interface";
import { join } from "path";

export class ClickModelLoader {
  private models = new Map<string, TableMetadata<any>>();

  constructor(private modelsPath: string) {}

  async loadModels(): Promise<void> {
    const modelsModule = await import(join(process.cwd(), this.modelsPath));

    for (const modelName in modelsModule) {
      const model = modelsModule[modelName];
      const tableName = model.prototype.tableName;
      const columns = model.prototype.columns;

      if (!tableName || !columns) {
        throw new Error(
          `Model ${modelName} is missing @Table or @Column decorators.`
        );
      }

      this.models.set(tableName, {
        modelName,
        columns,
        modelType: model,
      });
    }
  }

  getAllModels(): TableMetadata<any>[] {
    return Array.from(this.models.values());
  }
}
