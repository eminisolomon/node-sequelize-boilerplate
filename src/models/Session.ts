import {
  Attribute,
  PrimaryKey,
  UpdatedAt,
  Table,
  CreatedAt,
  Default,
  BelongsTo,
  NotNull,
} from "@sequelize/core/decorators-legacy";
import {
  DataTypes,
  Model,
  type InferAttributes,
  type BelongsToGetAssociationMixin,
} from "@sequelize/core";
import { User } from "./User";
import { ulid } from "ulid";
import { DateTime } from "luxon";

export type ISessionAttributes = InferAttributes<Session>;

export type ISessionCreationAttributes = Partial<ISessionAttributes>;

@Table({ tableName: "session" })
export default class Session extends Model<
  ISessionAttributes,
  ISessionCreationAttributes
> {
  @PrimaryKey
  @Attribute(DataTypes.STRING)
  @Default(ulid)
  declare id: string;

  @Attribute(DataTypes.STRING)
  declare user_id: string;

  @Attribute(DataTypes.INTEGER({ unsigned: true }))
  @Default(0)
  declare used_count: string;

  @Attribute(DataTypes.DATE)
  @NotNull
  @Default(() => DateTime.now().plus({ days: 60 }).toJSDate())
  declare expires_at: Date;

  @CreatedAt
  @Attribute(DataTypes.DATE)
  declare created_at: Date;

  @UpdatedAt
  @Attribute(DataTypes.DATE)
  declare updated_at: Date;

  @BelongsTo(() => User, "user_id")
  declare user: User;

  declare getUser: BelongsToGetAssociationMixin<User>;

  public toJSON() {
    const {
      id,
      user_id,
      used_count,
      expires_at,
      created_at,
      updated_at,
      user,
    } = this;
    return {
      id,
      user_id,
      used_count,
      expires_at,
      created_at,
      updated_at,
      user,
    };
  }
}
