/*
  Warnings:

  - You are about to drop the `RoleAction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoleAction" DROP CONSTRAINT "RoleAction_actionId_fkey";

-- DropForeignKey
ALTER TABLE "RoleAction" DROP CONSTRAINT "RoleAction_roleId_fkey";

-- DropTable
DROP TABLE "RoleAction";

-- CreateTable
CREATE TABLE "_ActionToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ActionToRole_AB_unique" ON "_ActionToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_ActionToRole_B_index" ON "_ActionToRole"("B");

-- AddForeignKey
ALTER TABLE "_ActionToRole" ADD CONSTRAINT "_ActionToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Action"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActionToRole" ADD CONSTRAINT "_ActionToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
