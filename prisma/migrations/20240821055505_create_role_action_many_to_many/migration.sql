/*
  Warnings:

  - You are about to drop the `RoleToAction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoleToAction" DROP CONSTRAINT "RoleToAction_actionId_fkey";

-- DropForeignKey
ALTER TABLE "RoleToAction" DROP CONSTRAINT "RoleToAction_roleId_fkey";

-- DropTable
DROP TABLE "RoleToAction";

-- CreateTable
CREATE TABLE "RoleAction" (
    "roleId" TEXT NOT NULL,
    "actionId" TEXT NOT NULL,

    CONSTRAINT "RoleAction_pkey" PRIMARY KEY ("roleId","actionId")
);

-- AddForeignKey
ALTER TABLE "RoleAction" ADD CONSTRAINT "RoleAction_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleAction" ADD CONSTRAINT "RoleAction_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE CASCADE ON UPDATE CASCADE;
