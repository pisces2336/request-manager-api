import { MigrationInterface, QueryRunner } from 'typeorm';

export class DiscordMessage1708480090526 implements MigrationInterface {
  name = 'DiscordMessage1708480090526';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`discord_messages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`messageId\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`discord_messages\``);
  }
}
