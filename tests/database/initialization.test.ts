import { ClickModelInit } from "src/index";

jest.mock("@clickhouse/client", () => {
  const mockClickHouseClient = {
    close: jest.fn(),
  };
  return {
    createClient: jest.fn(() => mockClickHouseClient),
    ClickHouseClient: jest.fn(() => mockClickHouseClient),
  };
});

describe("ClickModelInit", () => {
  let clickModel: ClickModelInit;
  const mockOptions = {
    host: "http://localhost:8123",
    username: "default",
    password: "",
    database: "default",
  };

  beforeEach(() => {
    clickModel = new ClickModelInit();
  });

  afterEach(async () => {
    await clickModel.close();
    jest.clearAllMocks();
  });

  test("should initialize connection successfully", async () => {
    await clickModel.connect(mockOptions);

    expect(require("@clickhouse/client").createClient).toHaveBeenCalledWith({
      host: mockOptions.host,
      username: mockOptions.username,
      password: mockOptions.password,
      database: mockOptions.database,
    });
  });

  test("should do nothing if connect is called when already connected", async () => {
    await clickModel.connect(mockOptions);

    await clickModel.connect(mockOptions);

    expect(require("@clickhouse/client").createClient).toHaveBeenCalledTimes(1);
  });

  test("should close connection successfully", async () => {
    await clickModel.connect(mockOptions);

    await clickModel.close();

    expect(
      require("@clickhouse/client").createClient().close
    ).toHaveBeenCalled();
  });

  test("should do nothing if close is called when no active connection", async () => {
    await clickModel.close();

    expect(
      require("@clickhouse/client").createClient().close
    ).not.toHaveBeenCalled();
  });
});
