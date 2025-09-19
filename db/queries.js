const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

async function getArticles() {
    return prisma.post.findMany({
        where: {
            published: true
        },
        include: {
            categories: true,
            comments: true
        }
    })
}

async function getArticle(articleId) {
    return prisma.post.findFirst({
        where: {
            id: articleId
        },
        include: {
            author: true,
            categories: true,
        },
    })
}

async function getComments(articleId) {
    return prisma.comment.findMany({
        where: {
            postId: articleId
        },
        include: {
            author: true
        }
    })
}

async function addNewComment(articleId, userId, newComment) {
    return prisma.comment.create({
        data: {
            postId: articleId,
            body: newComment,
            authorId: userId
        },
    })    
}

async function createNewUser(firstName, lastName, username, email, hashedPassword) {
    return await prisma.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPassword,
        }
    })
}

async function lookupUser(username) {
    return await prisma.user.findUnique({
        where: {
            username: username
        },
    })
}

module.exports = {getArticles, getArticle, getComments, addNewComment, createNewUser, lookupUser}