import { ClickHouseClient, createClient } from "@clickhouse/client";
import { ConnectionOptions } from "@models/clickmodel.interface";

export class ClickModelInit {
  private client: ClickHouseClient | null = null;

  constructor() {}

  async connect(options: ConnectionOptions): Promise<void> {
    if (this.client) return console.warn("Connection is already established.");

    this.client = createClient({
      host: options.host,
      username: options.username,
      password: options.password,
      database: options.database,
    });

    console.log("Connection to ClickHouse established.");
  }

  async close(): Promise<void> {
    if (!this.client) return console.warn("No active connection to close.");

    await this.client.close();
    this.client = null;
    console.log("Connection to ClickHouse closed.");
  }
}
