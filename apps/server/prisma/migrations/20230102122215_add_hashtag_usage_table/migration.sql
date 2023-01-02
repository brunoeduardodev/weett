-- CreateTable
CREATE TABLE "HashtagUsage" (
    "id" TEXT NOT NULL,
    "usedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HashtagUsage_pkey" PRIMARY KEY ("id")
);
