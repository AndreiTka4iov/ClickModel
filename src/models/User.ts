import { Column } from "@decorators/Column";
import { Table } from "@decorators/Table";

@Table("users")
export class User {
  @Column()
  username: string;

  @Column({ nullable: true})
  age?: number;

  @Column({ default: "now()" })
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({default: "invalid" })
  isDeleted: boolean;
}
