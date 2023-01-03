-- AlterTable
ALTER TABLE "Weet" ADD COLUMN     "replyId" TEXT;

-- AddForeignKey
ALTER TABLE "Weet" ADD CONSTRAINT "Weet_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Weet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
