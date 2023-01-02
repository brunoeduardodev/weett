/*
  Warnings:

  - You are about to drop the `_HashtagToWeet` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hashtagId` to the `HashtagUsage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weetId` to the `HashtagUsage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_HashtagToWeet" DROP CONSTRAINT "_HashtagToWeet_A_fkey";

-- DropForeignKey
ALTER TABLE "_HashtagToWeet" DROP CONSTRAINT "_HashtagToWeet_B_fkey";

-- AlterTable
ALTER TABLE "HashtagUsage" ADD COLUMN     "hashtagId" TEXT NOT NULL,
ADD COLUMN     "weetId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_HashtagToWeet";

-- AddForeignKey
ALTER TABLE "HashtagUsage" ADD CONSTRAINT "HashtagUsage_hashtagId_fkey" FOREIGN KEY ("hashtagId") REFERENCES "Hashtag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HashtagUsage" ADD CONSTRAINT "HashtagUsage_weetId_fkey" FOREIGN KEY ("weetId") REFERENCES "Weet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
