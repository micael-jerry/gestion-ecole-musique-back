/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `MusicCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MusicCategory_name_key" ON "MusicCategory"("name");
