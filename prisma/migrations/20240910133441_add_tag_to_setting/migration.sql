/*
  Warnings:

  - A unique constraint covering the columns `[tag]` on the table `Setting` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tag` to the `Setting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Setting" ADD COLUMN     "tag" VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Setting_tag_key" ON "Setting"("tag");
