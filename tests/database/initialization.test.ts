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

    // Проверяем, что createClient был вызван с правильными параметрами
    expect(require("@clickhouse/client").createClient).toHaveBeenCalledWith({
      host: mockOptions.host,
      username: mockOptions.username,
      password: mockOptions.password,
      database: mockOptions.database,
    });
  });

  test("should do nothing if connect is called when already connected", async () => {
    await clickModel.connect(mockOptions);

    // Повторный вызов connect
    await clickModel.connect(mockOptions);

    // Проверяем, что createClient был вызван только один раз
    expect(require("@clickhouse/client").createClient).toHaveBeenCalledTimes(1);
  });

  test("should close connection successfully", async () => {
    await clickModel.connect(mockOptions);

    // Закрытие соединения
    await clickModel.close();

    // Проверяем, что метод close у клиента был вызван
    expect(
      require("@clickhouse/client").createClient().close
    ).toHaveBeenCalled();
  });

  test("should do nothing if close is called when no active connection", async () => {
    // Попытка закрытия соединения без активного подключения
    await clickModel.close();

    // Проверяем, что метод close у клиента не вызывался
    expect(
      require("@clickhouse/client").createClient().close
    ).not.toHaveBeenCalled();
  });
});
