import { ClickHouseClient, createClient } from "@clickhouse/client";
import { ConnectionOptions } from "@models/clickmodel.interface";
import { ClickModelLoader } from "./loader";
import { TableMetadata } from "@models/decorators.interface";

export class ClickModelInit {
  private client: ClickHouseClient | null = null;
  private loader: ClickModelLoader;

  constructor(modelsPath: string) {
    this.loader = new ClickModelLoader(modelsPath);
  }

  async connect(options: ConnectionOptions): Promise<void> {
    if (this.client) return;

    this.client = createClient({
      host: options.host,
      username: options.username,
      password: options.password,
      database: options.database,
    });

    await this.loader.loadModels()
  }

  async close(): Promise<void> {
    if (!this.client) return;

    await this.client.close();
    this.client = null;
  }

  getAllModels(): TableMetadata<any>[] {
    return this.loader.getAllModels();
  }
}
