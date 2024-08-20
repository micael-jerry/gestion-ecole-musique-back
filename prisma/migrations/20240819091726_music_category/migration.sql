/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/

-- CreateTable
CREATE TABLE "MusicCategory" (
    "id" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "MusicCategory_pkey" PRIMARY KEY ("id")
);
