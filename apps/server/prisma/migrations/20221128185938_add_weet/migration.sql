/*
  Warnings:

  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Hashtag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Hashtag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weet" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Weet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HashtagToWeet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Hashtag_name_key" ON "Hashtag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_HashtagToWeet_AB_unique" ON "_HashtagToWeet"("A", "B");

-- CreateIndex
CREATE INDEX "_HashtagToWeet_B_index" ON "_HashtagToWeet"("B");

-- AddForeignKey
ALTER TABLE "Weet" ADD CONSTRAINT "Weet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagToWeet" ADD CONSTRAINT "_HashtagToWeet_A_fkey" FOREIGN KEY ("A") REFERENCES "Hashtag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagToWeet" ADD CONSTRAINT "_HashtagToWeet_B_fkey" FOREIGN KEY ("B") REFERENCES "Weet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
