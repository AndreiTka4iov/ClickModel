import { ClickHouseClient, createClient } from "@clickhouse/client";
import { ConnectionOptions } from "@models/clickmodel.interface";

export class ClickModelInit {
  private client: ClickHouseClient | null = null;

  constructor() {}

  async connect(options: ConnectionOptions): Promise<void> {
    if (this.client) return;

    this.client = createClient({
      host: options.host,
      username: options.username,
      password: options.password,
      database: options.database,
    });
  }

  async close(): Promise<void> {
    if (!this.client) return;

    await this.client.close();
    this.client = null;
  }
}
