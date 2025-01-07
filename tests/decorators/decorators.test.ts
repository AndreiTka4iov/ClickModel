import { Table } from "@decorators/Table";
import { Column } from "@decorators/Column";

describe("Table Decorator", () => {
  it("should assign the table name to the class prototype", () => {
    @Table("users")
    class User {}

    expect((User as any).prototype.tableName).toBe("users");
  });
});

describe("Column Decorator", () => {
  it("should store metadata about columns", () => {
    @Table("users")
    class User {
      @Column()
      username: string;

      @Column({ nullable: true })
      age?: number;

      @Column({ default: "now()" })
      createdAt: Date;

      @Column({ default: false })
      isActive: boolean;
    }

    const columns = (User as any).prototype.columns;

    expect(columns).toEqual([
      { name: "username", type: "String", nullable: false, default: undefined },
      { name: "age", type: "Int32", nullable: true, default: undefined },
      { name: "createdAt", type: "DateTime", nullable: false, default: "now()" },
      { name: "isActive", type: "UInt8", nullable: false, default: false },
    ]);
  });

  it("should throw an error for invalid default values", () => {
    expect(() => {
      @Table("invalid")
      class InvalidModel {
        @Column({ default: "invalid" }) // Ошибка
        isActive: boolean;
      }
    }).toThrow(
      "Invalid default value for isActive. Expected UInt8, but got string: invalid"
    );
  });

  it("should throw an error if a non-nullable field has no default", () => {
    expect(() => {
      @Table("invalid")
      class InvalidModel {
        @Column()
        isActive: boolean;
      }
    }).toThrow(
      "Property isActive is marked as non-nullable, but no default value is provided."
    );
  });
});
