/*
  Warnings:

  - A unique constraint covering the columns `[tag]` on the table `Action` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tag` to the `Action` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Action_name_key";

-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "tag" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Action_tag_key" ON "Action"("tag");
