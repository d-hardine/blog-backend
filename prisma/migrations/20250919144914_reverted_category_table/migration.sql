/*
  Warnings:

  - You are about to drop the column `postId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_postId_fkey";

-- AlterTable
ALTER TABLE "public"."Category" DROP COLUMN "postId";

-- CreateTable
CREATE TABLE "public"."_CategoryToPost" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToPost_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CategoryToPost_B_index" ON "public"."_CategoryToPost"("B");

-- AddForeignKey
ALTER TABLE "public"."_CategoryToPost" ADD CONSTRAINT "_CategoryToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CategoryToPost" ADD CONSTRAINT "_CategoryToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
