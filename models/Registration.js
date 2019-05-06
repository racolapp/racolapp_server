/* jshint indent: 1 */
import Sequelize, { Model } from "sequelize";
export default class Registration extends Model {
	static init(database) {
		return super.init(
			{
				registrated: {
					type: Sequelize.INTEGER(4),
					allowNull: true
				},
				Users_ID: {
					type: Sequelize.INTEGER(11),
					allowNull: false,
					primaryKey: true,
					references: {
						model: "Users",
						key: "ID"
					}
				},
				Events_ID: {
					type: Sequelize.INTEGER(11),
					allowNull: false,
					primaryKey: true,
					references: {
						model: "Events",
						key: "ID"
					}
				}
			},
			{
				tableName: "Registration",
				sequelize: database
			}
		);
	}
}